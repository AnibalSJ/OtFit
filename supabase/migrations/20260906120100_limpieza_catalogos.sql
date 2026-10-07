-- =============================================================================
-- Limpieza de los catálogos (categ, color, style, material).
-- Son datos curados a mano, así que solo se corrigen erratas evidentes.
-- =============================================================================

begin;

-- Espacios y saltos de línea sobrantes. Afecta 4 valores:
--   categ 16    "Hoodie\n"
--   material 7  "Licra\n"
--   style 2     "Starboy "
--   style 11    "Minimalista\n"
--
-- Ojo: btrim(x) sin segundo argumento solo quita ESPACIOS. Para saltos de línea
-- y tabs hay que pasar el conjunto de caracteres explícitamente.
update public.categ    set name_categ    = btrim(name_categ,    E' \t\r\n')
  where name_categ    <> btrim(name_categ,    E' \t\r\n');
update public.color    set color_name    = btrim(color_name,    E' \t\r\n')
  where color_name    <> btrim(color_name,    E' \t\r\n');
update public.style    set style_name    = btrim(style_name,    E' \t\r\n')
  where style_name    <> btrim(style_name,    E' \t\r\n');
update public.material set material_name = btrim(material_name, E' \t\r\n')
  where material_name <> btrim(material_name, E' \t\r\n');

-- Errata: "Axul oscuro" -> "Azul oscuro" (el color 7 ya es "Azul claro").
update public.color set color_name = 'Azul oscuro' where color_name = 'Axul oscuro';

commit;
