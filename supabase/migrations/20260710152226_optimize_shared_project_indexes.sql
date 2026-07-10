-- Optimize read paths shared by the donation portal and Audit Engine.
-- Safe data impact: indexes only. No rows or tables are removed.

-- Donation portal CMS fetch:
-- useCmsPage() loads carousel items by section_id + environment and orders by item_order.
create index if not exists cms_carousel_items_section_env_order_idx
  on public.cms_carousel_items (section_id, environment, item_order);

-- Audit Engine dashboards/list views:
-- observed queries order these tables by created_at desc with limit/offset.
create index if not exists audit_engine_audits_created_at_idx
  on public.audit_engine_audits (created_at desc);

create index if not exists audit_engine_leads_created_at_idx
  on public.audit_engine_leads (created_at desc);

-- kv_store_a0af4170 already has a primary key on key.
-- Keep kv_store_a0af4170_key_idx9 because pg_stat_user_indexes shows it is used
-- for prefix lookups. Drop identical unused text_pattern_ops duplicates.
drop index if exists public.kv_store_a0af4170_key_idx;
drop index if exists public.kv_store_a0af4170_key_idx1;
drop index if exists public.kv_store_a0af4170_key_idx2;
drop index if exists public.kv_store_a0af4170_key_idx3;
drop index if exists public.kv_store_a0af4170_key_idx4;
drop index if exists public.kv_store_a0af4170_key_idx5;
drop index if exists public.kv_store_a0af4170_key_idx6;
drop index if exists public.kv_store_a0af4170_key_idx7;
drop index if exists public.kv_store_a0af4170_key_idx8;
drop index if exists public.kv_store_a0af4170_key_idx10;
drop index if exists public.kv_store_a0af4170_key_idx11;
drop index if exists public.kv_store_a0af4170_key_idx12;
drop index if exists public.kv_store_a0af4170_key_idx13;
drop index if exists public.kv_store_a0af4170_key_idx14;
drop index if exists public.kv_store_a0af4170_key_idx15;
drop index if exists public.kv_store_a0af4170_key_idx16;
drop index if exists public.kv_store_a0af4170_key_idx17;
drop index if exists public.kv_store_a0af4170_key_idx18;
drop index if exists public.kv_store_a0af4170_key_idx19;
drop index if exists public.kv_store_a0af4170_key_idx20;
drop index if exists public.kv_store_a0af4170_key_idx21;
drop index if exists public.kv_store_a0af4170_key_idx22;
drop index if exists public.kv_store_a0af4170_key_idx23;
