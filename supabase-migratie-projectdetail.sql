-- ============================================================
-- Migratie: projectdetailpagina
-- Plak dit in de Supabase dashboard SQL editor (Project > SQL Editor > New query)
-- en voer het volledige bestand in één keer uit.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Nieuwe kolommen op projects
-- ------------------------------------------------------------

do $$ begin
  create type project_status as enum ('concept', 'in_uitvoering', 'review', 'afgerond', 'on_hold', 'geannuleerd');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type project_priority as enum ('laag', 'normaal', 'hoog', 'urgent');
exception
  when duplicate_object then null;
end $$;

alter table projects
  add column if not exists status project_status not null default 'concept',
  add column if not exists category text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists start_date date,
  add column if not exists deadline date,
  add column if not exists completed_at timestamptz,
  add column if not exists budget numeric(10,2),
  add column if not exists hours_estimated numeric(6,1),
  add column if not exists hours_spent numeric(6,1) not null default 0,
  add column if not exists progress_percentage int not null default 0,
  add column if not exists client_visible_notes text,
  add column if not exists internal_notes text,
  add column if not exists priority project_priority not null default 'normaal';

alter table projects
  add constraint projects_progress_percentage_range check (progress_percentage between 0 and 100);

-- ------------------------------------------------------------
-- 2. Tabel project_milestones
-- ------------------------------------------------------------

create table if not exists project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  completed_at timestamptz,
  status text not null default 'open', -- open | in_uitvoering | afgerond
  "order" int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_project_milestones_project_id on project_milestones(project_id);

-- ------------------------------------------------------------
-- 3. Tabel project_activity_log
-- ------------------------------------------------------------

create table if not exists project_activity_log (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  action_type text not null, -- status_change | priority_change | milestone_added | milestone_updated | milestone_completed | note_added | project_updated | contact_added
  description text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_project_activity_log_project_id on project_activity_log(project_id, created_at desc);

-- ------------------------------------------------------------
-- 4. Tabel project_notes
-- ------------------------------------------------------------

create table if not exists project_notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  content text not null,
  is_client_visible boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_project_notes_project_id on project_notes(project_id, created_at desc);

-- ------------------------------------------------------------
-- 5. Tabel project_contacts (optioneel)
-- ------------------------------------------------------------

create table if not exists project_contacts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  role text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create index if not exists idx_project_contacts_project_id on project_contacts(project_id);

-- ------------------------------------------------------------
-- 6. RLS policies
-- Let op: deze app doet de meeste autorisatie server-side via de
-- service-role key (zie src/lib/*.functions.ts), maar RLS staat hier
-- ook aan als extra verdedigingslaag voor directe client-side reads.
-- ------------------------------------------------------------

alter table project_milestones enable row level security;
alter table project_activity_log enable row level security;
alter table project_notes enable row level security;
alter table project_contacts enable row level security;

-- Helper: is de ingelogde gebruiker lid van dit project?
create or replace function is_project_member(p_project_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from project_members
    where project_id = p_project_id
      and user_id = auth.uid()
  );
$$;

-- Helper: is de ingelogde gebruiker admin/staff?
create or replace function is_staff_user()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from user_roles
    where user_id = auth.uid()
      and role in ('super_admin', 'co_admin', 'admin', 'support_agent', 'viewer')
  );
$$;

-- project_milestones: klant ziet milestones van eigen project, admin ziet alles
drop policy if exists project_milestones_select on project_milestones;
create policy project_milestones_select on project_milestones
  for select using (is_staff_user() or is_project_member(project_id));

drop policy if exists project_milestones_admin_write on project_milestones;
create policy project_milestones_admin_write on project_milestones
  for all using (is_staff_user()) with check (is_staff_user());

-- project_activity_log: klant ziet activiteit van eigen project, admin ziet alles
drop policy if exists project_activity_log_select on project_activity_log;
create policy project_activity_log_select on project_activity_log
  for select using (is_staff_user() or is_project_member(project_id));

drop policy if exists project_activity_log_admin_write on project_activity_log;
create policy project_activity_log_admin_write on project_activity_log
  for all using (is_staff_user()) with check (is_staff_user());

-- project_notes: klant ziet alleen is_client_visible = true van eigen project, admin ziet alles
drop policy if exists project_notes_select on project_notes;
create policy project_notes_select on project_notes
  for select using (
    is_staff_user()
    or (is_project_member(project_id) and is_client_visible = true)
  );

drop policy if exists project_notes_admin_write on project_notes;
create policy project_notes_admin_write on project_notes
  for all using (is_staff_user()) with check (is_staff_user());

-- project_contacts: klant ziet contacten van eigen project, admin ziet alles
drop policy if exists project_contacts_select on project_contacts;
create policy project_contacts_select on project_contacts
  for select using (is_staff_user() or is_project_member(project_id));

drop policy if exists project_contacts_admin_write on project_contacts;
create policy project_contacts_admin_write on project_contacts
  for all using (is_staff_user()) with check (is_staff_user());

-- ============================================================
-- Einde migratie
-- ============================================================
