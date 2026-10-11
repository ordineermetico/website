-- Role helpers live in a schema the API does not expose.
create schema if not exists private;
grant usage on schema private to authenticated;

create or replace function private.current_role_name()
returns public.staff_role
language sql stable security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and active
$$;

create or replace function private.has_role(variadic roles public.staff_role[])
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(private.current_role_name() = any (roles), false)
$$;

revoke all on function private.current_role_name() from public, anon;
revoke all on function private.has_role(public.staff_role[]) from public, anon;
grant execute on function private.current_role_name() to authenticated;
grant execute on function private.has_role(public.staff_role[]) to authenticated;
