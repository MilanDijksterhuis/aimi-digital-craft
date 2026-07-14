-- Rollen & Permissies module: custom rollen bovenop de bestaande app_role
-- systeemrollen, plus koppeltabel teamlid <-> custom rol. Raakt de bestaande
-- app_role enum, user_roles, has_role() en bestaande RLS-policies NIET aan.

-- ============================================================
-- 1. roles: systeemrollen (spiegel van app_role) + custom rollen
-- ============================================================

CREATE TABLE public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  is_system boolean NOT NULL DEFAULT false,
  base_role text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.roles ADD CONSTRAINT roles_system_base_role_check CHECK ((is_system = true AND base_role IS NULL) OR (is_system = false AND base_role IS NOT NULL));

INSERT INTO public.roles (key, name, description, is_system, base_role) VALUES ('super_admin', 'Super Admin', 'Volledige toegang tot het adminportaal, inclusief rollenbeheer, facturatie en systeeminstellingen.', true, NULL);

INSERT INTO public.roles (key, name, description, is_system, base_role) VALUES ('admin', 'Admin (legacy)', 'Verouderde beheerrol met brede rechten, gelijk aan Super Admin, gehouden voor bestaande koppelingen.', true, NULL);

INSERT INTO public.roles (key, name, description, is_system, base_role) VALUES ('co_admin', 'Co-Admin', 'Ondersteunt de dagelijkse gang van zaken in het adminportaal met beheerrechten op klanten en changes.', true, NULL);

INSERT INTO public.roles (key, name, description, is_system, base_role) VALUES ('support_agent', 'Support Agent', 'Behandelt supportvragen en changeverzoeken van klanten, zonder toegang tot facturatie of teambeheer.', true, NULL);

INSERT INTO public.roles (key, name, description, is_system, base_role) VALUES ('viewer', 'Viewer', 'Alleen-lezen toegang tot het adminportaal voor overzicht en rapportage.', true, NULL);

INSERT INTO public.roles (key, name, description, is_system, base_role) VALUES ('sales', 'Sales', 'Beheert leads en het verkoopproces binnen het adminportaal.', true, NULL);

INSERT INTO public.roles (key, name, description, is_system, base_role) VALUES ('customer', 'Klant', 'Externe klant van AIMI Development met toegang tot het klantenportaal.', true, NULL);

-- ============================================================
-- 2. user_custom_roles: additieve koppeling teamlid <-> custom rol
-- ============================================================

CREATE TABLE public.user_custom_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  assigned_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT user_custom_roles_unique UNIQUE (user_id, role_id)
);

CREATE INDEX user_custom_roles_user_id_idx ON public.user_custom_roles (user_id);

CREATE INDEX user_custom_roles_role_id_idx ON public.user_custom_roles (role_id);

-- ============================================================
-- 3. RLS: alleen super_admin
-- ============================================================

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "super admin manage roles" ON public.roles FOR ALL USING (public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

ALTER TABLE public.user_custom_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "super admin manage user_custom_roles" ON public.user_custom_roles FOR ALL USING (public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'super_admin'));
