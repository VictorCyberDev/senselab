-- Optional authenticated persistence layer. The public baseline remains functional offline without Supabase.
create extension if not exists pgcrypto;
create type public.app_role as enum ('learner','teacher','admin');
create table public.profiles(id uuid primary key references auth.users(id) on delete cascade,role public.app_role not null default 'learner',display_name text check(char_length(display_name)<=80),created_at timestamptz not null default now());
create table public.investigations(id uuid primary key default gen_random_uuid(),owner_id uuid not null references public.profiles(id) on delete cascade,experiment_id text not null check(experiment_id in('heat','circuit','motion','population')),payload jsonb not null check(jsonb_typeof(payload)='object'),created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.classrooms(id uuid primary key default gen_random_uuid(),teacher_id uuid not null references public.profiles(id) on delete cascade,name text not null check(char_length(name) between 1 and 80),created_at timestamptz not null default now());
create table public.enrollments(classroom_id uuid references public.classrooms(id) on delete cascade,learner_id uuid references public.profiles(id) on delete cascade,created_at timestamptz not null default now(),primary key(classroom_id,learner_id));
alter table public.profiles enable row level security;alter table public.investigations enable row level security;alter table public.classrooms enable row level security;alter table public.enrollments enable row level security;
create policy "profiles self read" on public.profiles for select using(auth.uid()=id);
create policy "profiles self update" on public.profiles for update using(auth.uid()=id) with check(auth.uid()=id and role=(select role from public.profiles where id=auth.uid()));
create policy "investigations owner all" on public.investigations for all using(auth.uid()=owner_id) with check(auth.uid()=owner_id);
create policy "teachers own classrooms" on public.classrooms for all using(auth.uid()=teacher_id) with check(auth.uid()=teacher_id and exists(select 1 from public.profiles p where p.id=auth.uid() and p.role in('teacher','admin')));
create policy "members see enrollment" on public.enrollments for select using(auth.uid()=learner_id or exists(select 1 from public.classrooms c where c.id=classroom_id and c.teacher_id=auth.uid()));
revoke all on public.profiles,public.investigations,public.classrooms,public.enrollments from anon;
grant select,update on public.profiles to authenticated;grant select,insert,update,delete on public.investigations,public.classrooms,public.enrollments to authenticated;
