-- Conteo REAL de filas (no estimado). Correr en el SQL Editor antes de migrar.
select 'user'                   as tabla, count(*) from public."user"
union all select 'clothing_item',          count(*) from public.clothing_item
union all select 'img_clothes',            count(*) from public.img_clothes
union all select 'model',                  count(*) from public.model
union all select 'user_color',             count(*) from public.user_color
union all select 'user_style',             count(*) from public.user_style
union all select 'clothing_item_categ',    count(*) from public.clothing_item_categ
union all select 'clothing_item_color',    count(*) from public.clothing_item_color
union all select 'clothing_item_style',    count(*) from public.clothing_item_style
union all select 'clothing_item_material', count(*) from public.clothing_item_material
union all select 'model_clothing_item',    count(*) from public.model_clothing_item
union all select 'model_style',            count(*) from public.model_style
union all select 'categ',                  count(*) from public.categ
union all select 'color',                  count(*) from public.color
union all select 'style',                  count(*) from public.style
union all select 'material',               count(*) from public.material
order by 2 desc, 1;

-- Y para ver qué hay exactamente en user:
select * from public."user";
