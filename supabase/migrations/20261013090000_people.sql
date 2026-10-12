-- Public team profiles shown on The Firm (first four, by order) and on the Team page (all published).
-- Managed by Admin and Communications. Not every employee needs a profile.
create table public.people (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 120),
  role_en text not null check (char_length(role_en) between 2 and 120),
  role_fr text check (char_length(role_fr) <= 120),
  bio_en text check (char_length(bio_en) <= 4000),
  bio_fr text check (char_length(bio_fr) <= 4000),
  photo_url text,
  location text check (char_length(location) <= 120),
  linkedin_url text check (linkedin_url ~ '^https://'),
  x_url text check (x_url ~ '^https://'),
  instagram_url text check (instagram_url ~ '^https://'),
  website_url text check (website_url ~ '^https://'),
  public_email text check (public_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  sort_order int not null default 100,
  status public.publish_status not null default 'draft',
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index people_order_idx on public.people (status, sort_order);

create trigger people_stamp before insert or update on public.people for each row execute function public.stamp_author();
create trigger people_audit after insert or update or delete on public.people for each row execute function public.write_audit();

alter table public.people enable row level security;
create policy "people: public reads published" on public.people for select to anon, authenticated using (status = 'published');
create policy "people: staff read all" on public.people for select to authenticated using (private.has_role('admin', 'communications'));
create policy "people: staff insert" on public.people for insert to authenticated with check (private.has_role('admin', 'communications'));
create policy "people: staff update" on public.people for update to authenticated using (private.has_role('admin', 'communications')) with check (private.has_role('admin', 'communications'));
create policy "people: staff delete" on public.people for delete to authenticated using (private.has_role('admin', 'communications'));

insert into public.people (slug, name, role_en, role_fr, photo_url, location, sort_order, status)
values ('chakravarthi-kundavarapu', 'Chakravarthi Kundavarapu', 'Founder', 'Fondateur',
        '/founder/chakravarthi-kundavarapu.jpg', 'Reims, France', 0, 'published');
