alter policy "profiles: admin reads all" on public.profiles using (private.has_role('admin'));
alter policy "profiles: admin updates" on public.profiles using (private.has_role('admin')) with check (private.has_role('admin'));
alter policy "posts: staff read all" on public.posts using (private.has_role('admin', 'communications'));
alter policy "posts: staff insert" on public.posts with check (private.has_role('admin', 'communications'));
alter policy "posts: staff update" on public.posts using (private.has_role('admin', 'communications')) with check (private.has_role('admin', 'communications'));
alter policy "posts: staff delete" on public.posts using (private.has_role('admin', 'communications'));
alter policy "partners: staff read all" on public.partners using (private.has_role('admin', 'communications'));
alter policy "partners: staff insert" on public.partners with check (private.has_role('admin', 'communications'));
alter policy "partners: staff update" on public.partners using (private.has_role('admin', 'communications')) with check (private.has_role('admin', 'communications'));
alter policy "partners: staff delete" on public.partners using (private.has_role('admin', 'communications'));
alter policy "jobs: staff read all" on public.jobs using (private.has_role('admin', 'hr'));
alter policy "jobs: staff insert" on public.jobs with check (private.has_role('admin', 'hr'));
alter policy "jobs: staff update" on public.jobs using (private.has_role('admin', 'hr')) with check (private.has_role('admin', 'hr'));
alter policy "jobs: staff delete" on public.jobs using (private.has_role('admin', 'hr'));
alter policy "applications: staff read" on public.applications using (private.has_role('admin', 'hr'));
alter policy "applications: staff update" on public.applications using (private.has_role('admin', 'hr')) with check (private.has_role('admin', 'hr'));
alter policy "applications: staff delete" on public.applications using (private.has_role('admin', 'hr'));
alter policy "audit: admin reads" on public.audit_log using (private.has_role('admin'));
alter policy "media: staff upload" on storage.objects with check (bucket_id = 'media' and private.has_role('admin', 'communications', 'hr'));
alter policy "media: staff update" on storage.objects using (bucket_id = 'media' and private.has_role('admin', 'communications', 'hr'));
alter policy "media: staff delete" on storage.objects using (bucket_id = 'media' and private.has_role('admin', 'communications'));
alter policy "cvs: staff read" on storage.objects using (bucket_id = 'cvs' and private.has_role('admin', 'hr'));
alter policy "cvs: staff delete" on storage.objects using (bucket_id = 'cvs' and private.has_role('admin', 'hr'));

create or replace function public.guard_profile_update()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then
    return new;
  end if;
  if (new.role is distinct from old.role or new.active is distinct from old.active)
     and not private.has_role('admin') then
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

-- The old public helpers are no longer referenced; make them uncallable through the API.
revoke execute on function public.has_role(public.staff_role[]) from anon, authenticated, public;
revoke execute on function public.current_role_name() from anon, authenticated, public;
