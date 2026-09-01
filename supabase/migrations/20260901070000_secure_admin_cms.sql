alter table public.projects
  add column if not exists image_alt text not null default '',
  add column if not exists image_position text not null default 'center';

alter table public.experiences
  add column if not exists logo_url text not null default '';

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    lower(coalesce(auth.jwt() ->> 'email', '')) = 'syamsul.ar313@gmail.com'
    and coalesce(auth.jwt() -> 'app_metadata' ->> 'provider', '') = 'google';
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;
