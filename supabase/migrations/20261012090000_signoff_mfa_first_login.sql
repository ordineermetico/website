-- 1. First sign-in: accounts created with a temporary password must choose their own.
alter table public.profiles add column if not exists must_change_password boolean not null default false;

-- 2. Admin powers require two-step sign-in (AAL2). A signed-in admin without it has no admin rights
--    in the database until they complete two-step verification.
create or replace function private.has_role(variadic roles public.staff_role[])
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(
    case
      when private.current_role_name() = 'admin' and coalesce(auth.jwt() ->> 'aal', 'aal1') <> 'aal2' then false
      else private.current_role_name() = any (roles)
    end,
    false)
$$;

-- 3. Optional Admin sign-off for sensitive news items.
alter type public.post_kind add value if not exists 'partnership';

alter table public.posts
  add column if not exists requires_signoff boolean not null default false,
  add column if not exists signoff_status text not null default 'none'
    check (signoff_status in ('none', 'pending', 'approved', 'changes_requested')),
  add column if not exists signoff_by uuid references public.profiles (id) on delete set null,
  add column if not exists signoff_at timestamptz,
  add column if not exists signoff_note text check (char_length(signoff_note) <= 2000);

-- Rules, enforced in the database whatever the client:
--  · partnership announcements always need sign-off;
--  · only an admin can approve; an admin publishing a sign-off item approves it;
--  · when anyone else tries to publish a sign-off item that is not approved, it stays a draft and goes to "pending";
--  · when anyone else edits an approved item's content, it goes back to "pending" (and offline).
create or replace function public.enforce_post_signoff()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  is_admin boolean := auth.uid() is null or private.has_role('admin');
  content_changed boolean := false;
begin
  if new.kind = 'partnership' then
    new.requires_signoff := true;
  end if;

  if not new.requires_signoff then
    new.signoff_status := 'none';
    return new;
  end if;

  if tg_op = 'UPDATE' then
    content_changed := (new.title_en, new.title_fr, new.excerpt_en, new.excerpt_fr, new.body_en, new.body_fr, new.cover_image, new.published_at, new.kind)
      is distinct from (old.title_en, old.title_fr, old.excerpt_en, old.excerpt_fr, old.body_en, old.body_fr, old.cover_image, old.published_at, old.kind);
  end if;

  if is_admin then
    if new.status = 'published' and new.signoff_status is distinct from 'approved' then
      new.signoff_status := 'approved';
    end if;
    if new.signoff_status = 'approved' and (tg_op = 'INSERT' or old.signoff_status is distinct from 'approved') then
      new.signoff_by := auth.uid();
      new.signoff_at := now();
    end if;
    return new;
  end if;

  -- Not an admin: cannot approve, and cannot change who signed off.
  if tg_op = 'INSERT' then
    new.signoff_by := null;
    new.signoff_at := null;
    new.signoff_note := null;
    if new.signoff_status = 'approved' then new.signoff_status := 'pending'; end if;
  else
    new.signoff_by := old.signoff_by;
    new.signoff_at := old.signoff_at;
    new.signoff_note := old.signoff_note;
    if new.signoff_status = 'approved' and old.signoff_status is distinct from 'approved' then
      new.signoff_status := old.signoff_status;
    end if;
    if old.signoff_status = 'approved' and content_changed then
      new.signoff_status := 'pending';
    end if;
  end if;

  if new.status = 'published' and new.signoff_status is distinct from 'approved' then
    new.status := 'draft';
    new.signoff_status := 'pending';
  end if;
  if new.signoff_status = 'none' then
    new.signoff_status := 'pending';
  end if;
  return new;
end;
$$;
revoke all on function public.enforce_post_signoff() from public, anon, authenticated;

create trigger posts_signoff before insert or update on public.posts
  for each row execute function public.enforce_post_signoff();

-- The public never sees a sign-off item that is not approved.
alter policy "posts: public reads published" on public.posts
  using (
    status = 'published' and published_at is not null and published_at <= now()
    and (not requires_signoff or signoff_status = 'approved')
  );

-- Once an item needs sign-off, only an admin can remove that requirement.
create or replace function public.keep_signoff_requirement()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not private.has_role('admin') and old.requires_signoff and not new.requires_signoff then
    new.requires_signoff := true;
  end if;
  return new;
end;
$$;
revoke all on function public.keep_signoff_requirement() from public, anon, authenticated;
-- Runs before posts_signoff (triggers fire in name order).
create trigger posts_keep_signoff before update on public.posts
  for each row execute function public.keep_signoff_requirement();
