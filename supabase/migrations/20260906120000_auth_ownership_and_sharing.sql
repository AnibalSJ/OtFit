-- =============================================================================
-- OtFit — Vincular usuarios con Supabase Auth, dar dueño a prendas y outfits,
--         y habilitar outfits públicos (estilo Pinterest).
--
-- REQUISITO: las tablas de datos deben estar VACÍAS (los catálogos no importan).
--   - user_id pasa de number a uuid: un id numérico viejo no se puede convertir
--     en el uuid de una cuenta de auth, no hay forma de adivinar la equivalencia.
--   - clothing_item / img_clothes / model reciben una columna user_id NOT NULL
--     sin default: con filas existentes, Postgres no sabe qué valor poner.
--
-- El PASO 0 vacía las tablas de datos. Ya se ejecutó el 2026-09-06, cuando la
-- base solo tenía filas de prueba (4 usuarios sin cuenta en auth.users, 1 prenda,
-- 1 outfit). NO volver a correr este archivo sobre datos reales.
-- =============================================================================

begin;

-- -----------------------------------------------------------------------------
-- PASO 0 — Limpiar datos de prueba  ⚠️ BORRA FILAS (ya ejecutado 2026-09-06)
--
-- No toca los catálogos (categ, color, style, material): esos se conservan.
-- -----------------------------------------------------------------------------

truncate
  public.user_color, public.user_style,
  public.clothing_item_categ, public.clothing_item_color,
  public.clothing_item_style, public.clothing_item_material,
  public.model_clothing_item, public.model_style,
  public.clothing_item, public.img_clothes, public.model,
  public."user"
restart identity cascade;

-- -----------------------------------------------------------------------------
-- 1. public."user" pasa a ser el perfil, identificado por el UUID de auth.users
-- -----------------------------------------------------------------------------

-- Soltamos las FK que apuntan a user_id para poder cambiarle el tipo.
alter table public.user_color drop constraint if exists user_color_user_id_fkey;
alter table public.user_style drop constraint if exists user_style_user_id_fkey;

-- Postgres no deja convertir a uuid una columna de identidad, así que primero
-- hay que quitarles esa propiedad. Las tres la tienen.
alter table public."user"       alter column user_id drop identity if exists;
alter table public.user_color   alter column user_id drop identity if exists;
alter table public.user_style   alter column user_id drop identity if exists;

alter table public."user"       alter column user_id drop default;
alter table public.user_color   alter column user_id drop default;
alter table public.user_style   alter column user_id drop default;

-- number -> uuid (el PASO 0 dejó las tablas vacías, el USING nunca se evalúa).
alter table public."user"     alter column user_id type uuid using null::uuid;
alter table public.user_color alter column user_id type uuid using null::uuid;
alter table public.user_style alter column user_id type uuid using null::uuid;

-- El perfil ahora ES el usuario de auth: si se borra la cuenta, se borra el perfil.
alter table public."user"
  add constraint user_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete cascade;

alter table public.user_color
  add constraint user_color_user_id_fkey
  foreign key (user_id) references public."user" (user_id) on delete cascade;

alter table public.user_style
  add constraint user_style_user_id_fkey
  foreign key (user_id) references public."user" (user_id) on delete cascade;

-- En el registro solo tenemos el email: lo demás se completa después.
alter table public."user" alter column user_birthdate drop not null;
alter table public."user" alter column user_country   drop not null;
alter table public."user" alter column user_name      drop not null;
alter table public."user" alter column user_status    set default 1;
alter table public."user" alter column user_up_date   set default now();

-- -----------------------------------------------------------------------------
-- 2. Crear el perfil automáticamente al registrarse
-- -----------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $fn$
begin
  insert into public."user" (user_id, user_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'user_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$fn$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 2.b Quitar IDENTITY de las columnas que son foreign key
--
-- Estaban marcadas como autogeneradas, lo cual no tiene sentido en una FK:
-- si insertas una fila sin dar el id, Postgres inventa un número que no
-- corresponde a ninguna fila de la tabla padre y el insert revienta.
-- El id de una FK siempre lo pone quien inserta.
-- -----------------------------------------------------------------------------

alter table public.clothing_item_categ    alter column clothing_item_id drop identity if exists;
alter table public.clothing_item_color    alter column color_id         drop identity if exists;
alter table public.clothing_item_material alter column material_id      drop identity if exists;
alter table public.clothing_item_style    alter column style_id         drop identity if exists;
alter table public.model_clothing_item    alter column model_id         drop identity if exists;
alter table public.model_style            alter column model_id         drop identity if exists;

-- -----------------------------------------------------------------------------
-- 3. Dueño para prendas, imágenes y outfits + publicación
-- -----------------------------------------------------------------------------

alter table public.clothing_item
  add column if not exists user_id uuid not null
  references public."user" (user_id) on delete cascade;

alter table public.img_clothes
  add column if not exists user_id uuid not null
  references public."user" (user_id) on delete cascade;

alter table public.model
  add column if not exists user_id uuid not null
    references public."user" (user_id) on delete cascade,
  add column if not exists model_name text,
  add column if not exists is_public boolean not null default false,
  add column if not exists published_at timestamptz;

-- Índices en las columnas que usan las políticas RLS
-- (sin esto, cada consulta con RLS termina escaneando la tabla completa).
create index if not exists clothing_item_user_id_idx on public.clothing_item (user_id);
create index if not exists img_clothes_user_id_idx   on public.img_clothes (user_id);
create index if not exists model_user_id_idx         on public.model (user_id);
create index if not exists model_is_public_idx       on public.model (is_public) where is_public;

-- -----------------------------------------------------------------------------
-- 4. Helpers en un esquema privado
--    SECURITY DEFINER evita que RLS se evalúe en cascada dentro de las políticas
--    (más rápido, y sin resultados filtrados a medias).
-- -----------------------------------------------------------------------------

create schema if not exists private;

create or replace function private.owns_clothing_item(p_id bigint)
returns boolean language sql security definer stable set search_path = '' as $fn$
  select exists (
    select 1 from public.clothing_item ci
    where ci.clothing_item_id = p_id and ci.user_id = (select auth.uid())
  );
$fn$;

create or replace function private.owns_model(p_id bigint)
returns boolean language sql security definer stable set search_path = '' as $fn$
  select exists (
    select 1 from public.model m
    where m.model_id = p_id and m.user_id = (select auth.uid())
  );
$fn$;

create or replace function private.model_is_public(p_id bigint)
returns boolean language sql security definer stable set search_path = '' as $fn$
  select exists (select 1 from public.model m where m.model_id = p_id and m.is_public);
$fn$;

create or replace function private.item_in_public_model(p_id bigint)
returns boolean language sql security definer stable set search_path = '' as $fn$
  select exists (
    select 1
    from public.model_clothing_item mci
    join public.model m on m.model_id = mci.model_id
    where mci.clothing_item_id = p_id and m.is_public
  );
$fn$;

grant usage on schema private to authenticated, anon;
grant execute on all functions in schema private to authenticated, anon;

-- -----------------------------------------------------------------------------
-- 5. Políticas RLS
-- -----------------------------------------------------------------------------

-- 5.1 Catálogos: lectura para todos, escritura para nadie
--     (se administran desde el dashboard).
drop policy if exists categ_read on public.categ;
create policy categ_read    on public.categ    for select to authenticated, anon using (true);
drop policy if exists color_read on public.color;
create policy color_read    on public.color    for select to authenticated, anon using (true);
drop policy if exists style_read on public.style;
create policy style_read    on public.style    for select to authenticated, anon using (true);
drop policy if exists material_read on public.material;
create policy material_read on public.material for select to authenticated, anon using (true);

-- 5.2 Perfil: cada quien ve y edita el suyo.
drop policy if exists user_select_own on public."user";
create policy user_select_own on public."user" for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists user_update_own on public."user";
create policy user_update_own on public."user" for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- 5.3 Preferencias del usuario.
drop policy if exists user_color_own on public.user_color;
create policy user_color_own on public.user_color for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists user_style_own on public.user_style;
create policy user_style_own on public.user_style for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- 5.4 Prendas: dueño total; además visibles si aparecen en un outfit público.
drop policy if exists clothing_item_own on public.clothing_item;
create policy clothing_item_own on public.clothing_item for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists clothing_item_public on public.clothing_item;
create policy clothing_item_public on public.clothing_item for select to authenticated, anon
  using (private.item_in_public_model(clothing_item_id));

drop policy if exists img_clothes_own on public.img_clothes;
create policy img_clothes_own on public.img_clothes for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- 5.5 Outfits: privados por defecto, públicos si el dueño los publica.
drop policy if exists model_own on public.model;
create policy model_own on public.model for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists model_public on public.model;
create policy model_public on public.model for select to authenticated, anon
  using (is_public);

-- 5.6 Tablas puente: heredan el permiso de su "padre".
drop policy if exists ci_categ_own on public.clothing_item_categ;
create policy ci_categ_own on public.clothing_item_categ for all to authenticated
  using (private.owns_clothing_item(clothing_item_id))
  with check (private.owns_clothing_item(clothing_item_id));
drop policy if exists ci_categ_public on public.clothing_item_categ;
create policy ci_categ_public on public.clothing_item_categ for select to authenticated, anon
  using (private.item_in_public_model(clothing_item_id));

drop policy if exists ci_color_own on public.clothing_item_color;
create policy ci_color_own on public.clothing_item_color for all to authenticated
  using (private.owns_clothing_item(clothing_item_id))
  with check (private.owns_clothing_item(clothing_item_id));
drop policy if exists ci_color_public on public.clothing_item_color;
create policy ci_color_public on public.clothing_item_color for select to authenticated, anon
  using (private.item_in_public_model(clothing_item_id));

drop policy if exists ci_style_own on public.clothing_item_style;
create policy ci_style_own on public.clothing_item_style for all to authenticated
  using (private.owns_clothing_item(clothing_item_id))
  with check (private.owns_clothing_item(clothing_item_id));
drop policy if exists ci_style_public on public.clothing_item_style;
create policy ci_style_public on public.clothing_item_style for select to authenticated, anon
  using (private.item_in_public_model(clothing_item_id));

drop policy if exists ci_material_own on public.clothing_item_material;
create policy ci_material_own on public.clothing_item_material for all to authenticated
  using (private.owns_clothing_item(clothing_item_id))
  with check (private.owns_clothing_item(clothing_item_id));
drop policy if exists ci_material_public on public.clothing_item_material;
create policy ci_material_public on public.clothing_item_material for select to authenticated, anon
  using (private.item_in_public_model(clothing_item_id));

drop policy if exists model_ci_own on public.model_clothing_item;
create policy model_ci_own on public.model_clothing_item for all to authenticated
  using (private.owns_model(model_id)) with check (private.owns_model(model_id));
drop policy if exists model_ci_public on public.model_clothing_item;
create policy model_ci_public on public.model_clothing_item for select to authenticated, anon
  using (private.model_is_public(model_id));

drop policy if exists model_style_own on public.model_style;
create policy model_style_own on public.model_style for all to authenticated
  using (private.owns_model(model_id)) with check (private.owns_model(model_id));
drop policy if exists model_style_public on public.model_style;
create policy model_style_public on public.model_style for select to authenticated, anon
  using (private.model_is_public(model_id));

commit;
