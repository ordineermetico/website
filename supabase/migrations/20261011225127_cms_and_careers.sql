-- Ordine Ermetico website: content management and careers.
-- Roles: admin (everything), communications (news + partner houses), hr (jobs + applications).
-- The public website reads only published rows. Applications are written by the website server.

create extension if not exists pgcrypto;

-- ── Roles and staff profiles ─────────────────────────────────────────────
create type public.staff_role as enum ('admin', 'communications', 'hr');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.staff_role,              -- null = no access until an admin assigns a role
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Current user's role, or null. SECURITY DEFINER so policies can read it without recursion.
create or replace function public.current_role_name()
returns public.staff_role
language sql stable security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and active
$$;

create or replace function public.has_role(variadic roles public.staff_role[])
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(public.current_role_name() = any (roles), false)
$$;

-- A profile row for every new auth user (no role by default).
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    nullif(new.raw_app_meta_data ->> 'staff_role', '')::public.staff_role
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Shared helpers ──────────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create type public.publish_status as enum ('draft', 'published', 'archived');

-- ── News, press releases, announcements, milestones ─────────────────────
create type public.post_kind as enum ('news', 'press_release', 'announcement', 'milestone', 'insight');

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  kind public.post_kind not null default 'news',
  status public.publish_status not null default 'draft',
  title_en text not null check (char_length(title_en) between 3 and 200),
  title_fr text,
  excerpt_en text check (char_length(excerpt_en) <= 400),
  excerpt_fr text check (char_length(excerpt_fr) <= 400),
  body_en text not null default '',
  body_fr text,
  cover_image text,
  published_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index posts_published_idx on public.posts (status, published_at desc);

-- ── Partner houses ──────────────────────────────────────────────────────
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 120),
  line_en text not null check (char_length(line_en) <= 240),
  line_fr text check (char_length(line_fr) <= 240),
  logo_url text not null,                    -- logo for ivory/light backgrounds
  logo_alt_en text not null,
  logo_alt_fr text,
  logo_height_rem numeric(3,1) not null default 5.5 check (logo_height_rem between 2 and 9),
  website_url text,
  sort_order int not null default 100,
  status public.publish_status not null default 'draft',
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Careers ─────────────────────────────────────────────────────────────
create type public.job_status as enum ('draft', 'open', 'closed');

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  status public.job_status not null default 'draft',
  title_en text not null check (char_length(title_en) between 3 and 160),
  title_fr text,
  location text not null default 'Reims, France',
  employment_type text not null default 'Full-time',
  department text,
  summary_en text check (char_length(summary_en) <= 400),
  summary_fr text check (char_length(summary_fr) <= 400),
  body_en text not null default '',
  body_fr text,
  published_at timestamptz,
  closes_at date,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create type public.application_status as enum ('new', 'reviewing', 'interview', 'offer', 'hired', 'rejected', 'withdrawn');

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs (id) on delete set null,
  job_title text not null,                 -- kept even if the job is later deleted
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  phone text check (char_length(phone) <= 40),
  location text check (char_length(location) <= 120),
  linkedin_url text check (char_length(linkedin_url) <= 300),
  message text check (char_length(message) <= 5000),
  cv_path text not null,                   -- object path in the private "cvs" bucket
  language text not null default 'en',
  consent boolean not null check (consent),
  status public.application_status not null default 'new',
  notes text,                              -- internal, HR/admin only
  delete_after date not null default (now() + interval '2 years')::date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index applications_job_idx on public.applications (job_id, created_at desc);

-- ── Audit log ───────────────────────────────────────────────────────────
create table public.audit_log (
  id bigint generated always as identity primary key,
  actor uuid,
  actor_email text,
  action text not null,                    -- INSERT / UPDATE / DELETE
  table_name text not null,
  record_id text,
  summary text,
  at timestamptz not null default now()
);

create or replace function public.write_audit()
returns trigger
language plpgsql security definer set search_path = public
as $$
declare
  j jsonb;
begin
  if tg_op = 'DELETE' then j := to_jsonb(old); else j := to_jsonb(new); end if;
  insert into public.audit_log (actor, actor_email, action, table_name, record_id, summary)
  values (
    auth.uid(),
    (select email from public.profiles where id = auth.uid()),
    tg_op,
    tg_table_name,
    j ->> 'id',
    coalesce(j ->> 'title_en', j ->> 'name', j ->> 'job_title', j ->> 'email')
  );
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

-- Stamp authorship and updated_at on content tables.
create or replace function public.stamp_author()
returns trigger language plpgsql set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    new.created_by := coalesce(new.created_by, auth.uid());
  end if;
  new.updated_by := auth.uid();
  new.updated_at := now();
  return new;
end;
$$;

create trigger posts_stamp before insert or update on public.posts for each row execute function public.stamp_author();
create trigger partners_stamp before insert or update on public.partners for each row execute function public.stamp_author();
create trigger jobs_stamp before insert or update on public.jobs for each row execute function public.stamp_author();
create trigger applications_touch before update on public.applications for each row execute function public.touch_updated_at();
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();

create trigger posts_audit after insert or update or delete on public.posts for each row execute function public.write_audit();
create trigger partners_audit after insert or update or delete on public.partners for each row execute function public.write_audit();
create trigger jobs_audit after insert or update or delete on public.jobs for each row execute function public.write_audit();
create trigger applications_audit after update or delete on public.applications for each row execute function public.write_audit();
create trigger profiles_audit after update on public.profiles for each row execute function public.write_audit();

-- A staff member cannot change their own role or deactivate themselves; only admins manage roles.
create or replace function public.guard_profile_update()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  -- Server-side maintenance (no signed-in user) is allowed.
  if auth.uid() is null then
    return new;
  end if;
  if (new.role is distinct from old.role or new.active is distinct from old.active)
     and not public.has_role('admin') then
    raise exception 'Only an admin can change roles or access.';
  end if;
  if new.email is distinct from old.email then
    raise exception 'The email on file follows the login account and cannot be edited here.';
  end if;
  if new.id = auth.uid() and (new.role is distinct from old.role or new.active is distinct from old.active) then
    raise exception 'You cannot change your own role or access.';
  end if;
  return new;
end;
$$;
create trigger profiles_guard before update on public.profiles for each row execute function public.guard_profile_update();

-- ── Row-level security ──────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.partners enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.audit_log enable row level security;

-- profiles
create policy "profiles: read own" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "profiles: admin reads all" on public.profiles for select to authenticated using (public.has_role('admin'));
create policy "profiles: update own name" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "profiles: admin updates" on public.profiles for update to authenticated using (public.has_role('admin')) with check (public.has_role('admin'));

-- posts: public reads published; admin + communications manage
create policy "posts: public reads published" on public.posts for select to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());
create policy "posts: staff read all" on public.posts for select to authenticated using (public.has_role('admin', 'communications'));
create policy "posts: staff insert" on public.posts for insert to authenticated with check (public.has_role('admin', 'communications'));
create policy "posts: staff update" on public.posts for update to authenticated using (public.has_role('admin', 'communications')) with check (public.has_role('admin', 'communications'));
create policy "posts: staff delete" on public.posts for delete to authenticated using (public.has_role('admin', 'communications'));

-- partners: public reads published; admin + communications manage
create policy "partners: public reads published" on public.partners for select to anon, authenticated using (status = 'published');
create policy "partners: staff read all" on public.partners for select to authenticated using (public.has_role('admin', 'communications'));
create policy "partners: staff insert" on public.partners for insert to authenticated with check (public.has_role('admin', 'communications'));
create policy "partners: staff update" on public.partners for update to authenticated using (public.has_role('admin', 'communications')) with check (public.has_role('admin', 'communications'));
create policy "partners: staff delete" on public.partners for delete to authenticated using (public.has_role('admin', 'communications'));

-- jobs: public reads open; admin + hr manage
create policy "jobs: public reads open" on public.jobs for select to anon, authenticated using (status = 'open');
create policy "jobs: staff read all" on public.jobs for select to authenticated using (public.has_role('admin', 'hr'));
create policy "jobs: staff insert" on public.jobs for insert to authenticated with check (public.has_role('admin', 'hr'));
create policy "jobs: staff update" on public.jobs for update to authenticated using (public.has_role('admin', 'hr')) with check (public.has_role('admin', 'hr'));
create policy "jobs: staff delete" on public.jobs for delete to authenticated using (public.has_role('admin', 'hr'));

-- applications: no public access at all (the website server inserts with the secret key); admin + hr manage
create policy "applications: staff read" on public.applications for select to authenticated using (public.has_role('admin', 'hr'));
create policy "applications: staff update" on public.applications for update to authenticated using (public.has_role('admin', 'hr')) with check (public.has_role('admin', 'hr'));
create policy "applications: staff delete" on public.applications for delete to authenticated using (public.has_role('admin', 'hr'));

-- audit log: admin reads; nobody writes directly
create policy "audit: admin reads" on public.audit_log for select to authenticated using (public.has_role('admin'));

-- ── Storage ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']),
  ('cvs', 'cvs', false, 5242880, array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do nothing;

create policy "media: staff upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and public.has_role('admin', 'communications', 'hr'));
create policy "media: staff update" on storage.objects for update to authenticated
  using (bucket_id = 'media' and public.has_role('admin', 'communications', 'hr'));
create policy "media: staff delete" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and public.has_role('admin', 'communications'));

create policy "cvs: staff read" on storage.objects for select to authenticated
  using (bucket_id = 'cvs' and public.has_role('admin', 'hr'));
create policy "cvs: staff delete" on storage.objects for delete to authenticated
  using (bucket_id = 'cvs' and public.has_role('admin', 'hr'));

-- ── Grants ──────────────────────────────────────────────────────────────
revoke all on function public.current_role_name() from public;
revoke all on function public.has_role(public.staff_role[]) from public;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.write_audit() from public, anon, authenticated;
revoke all on function public.guard_profile_update() from public, anon, authenticated;
grant execute on function public.current_role_name() to authenticated, anon;
grant execute on function public.has_role(public.staff_role[]) to authenticated, anon;

-- ── Seed: the two confirmed partner houses ──────────────────────────────
insert into public.partners (slug, name, line_en, line_fr, logo_url, logo_alt_en, logo_alt_fr, logo_height_rem, sort_order, status)
values
  ('duval-leroy', 'Champagne Duval-Leroy',
   'Independent, family-owned Champagne house, founded in 1859 in Vertus, in the Côte des Blancs.',
   'Maison de Champagne indépendante et familiale, fondée en 1859 à Vertus, dans la Côte des Blancs.',
   '/partners/duval-leroy-logo-transparent.png', 'Champagne Duval-Leroy logo', 'Logo du Champagne Duval-Leroy', 6.5, 10, 'published'),
  ('abele-1757', 'Champagne Abelé 1757',
   'One of the oldest Champagne houses, founded in Reims in 1757.',
   'L’une des plus anciennes maisons de Champagne, fondée à Reims en 1757.',
   '/partners/abele-1757-logo-for-light-backgrounds.svg', 'Champagne Abelé 1757 logo', 'Logo du Champagne Abelé 1757', 5.2, 20, 'published');
