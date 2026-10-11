-- Plain draft saves no longer submit an item for sign-off; only "Submit for sign-off" or "Publish" do.
-- Editing an approved item (as a non-admin) sends it back for sign-off and takes it offline.
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

  if tg_op = 'INSERT' then
    new.signoff_by := null;
    new.signoff_at := null;
    new.signoff_note := null;
    if new.signoff_status = 'approved' then new.signoff_status := 'none'; end if;
  else
    new.signoff_by := old.signoff_by;
    new.signoff_at := old.signoff_at;
    new.signoff_note := old.signoff_note;
    if new.signoff_status = 'approved' and old.signoff_status is distinct from 'approved' then
      new.signoff_status := old.signoff_status;
    end if;
    if old.signoff_status = 'approved' and content_changed then
      new.signoff_status := 'pending';
      new.status := 'draft';
    end if;
  end if;

  if new.status = 'published' and new.signoff_status is distinct from 'approved' then
    new.status := 'draft';
    new.signoff_status := 'pending';
  end if;
  return new;
end;
$$;
