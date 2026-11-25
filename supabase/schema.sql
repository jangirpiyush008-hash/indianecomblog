-- ================================================================
-- FABLE MAGAZINE — Supabase schema
-- Version: 1.0 · 2026-11
-- ================================================================
-- All tables use UUID primary keys and standard created_at/updated_at.
-- RLS is enabled on every table. Editor/admin access only via auth.
-- ================================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================
-- AUTH / ROLES
-- ============================================================
create type user_role as enum ('admin', 'editor', 'author', 'contributor', 'subscriber');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role user_role not null default 'subscriber',
  avatar_url text,
  bio text,
  slug text unique,
  twitter text,
  linkedin text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;

-- ============================================================
-- CATEGORIES & TAGS
-- ============================================================
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  accent_color text,
  icon text,
  sort_order int default 0,
  is_active boolean default true,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.categories enable row level security;

create table if not exists public.subcategories (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references public.categories(id) on delete cascade,
  slug text not null,
  name text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz default now(),
  unique(category_id, slug)
);
alter table public.subcategories enable row level security;

create table if not exists public.tags (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz default now()
);
alter table public.tags enable row level security;

-- ============================================================
-- ARTICLES (the core)
-- ============================================================
create type article_status as enum (
  'draft',
  'in_review',
  'approved',
  'scheduled',
  'published',
  'rejected',
  'archived'
);

create table if not exists public.articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  subtitle text,
  excerpt text,
  body_markdown text,
  body_html text,
  status article_status default 'draft',
  category_id uuid not null references public.categories(id),
  subcategory_id uuid references public.subcategories(id),
  author_id uuid references public.profiles(id),
  hero_image text,
  hero_image_alt text,
  hero_image_credit text,
  reading_time_minutes int,
  word_count int,
  is_featured boolean default false,
  is_trending boolean default false,
  is_sponsored boolean default false,
  sponsor_name text,
  -- SEO
  seo_title text,
  seo_description text,
  seo_keywords text[],
  canonical_url text,
  -- AI metadata
  is_ai_generated boolean default false,
  ai_model text,
  ai_prompt text,
  ai_confidence_score numeric(3,2),
  editor_review_notes text,
  quality_check_score numeric(3,2),
  -- Publishing
  published_at timestamptz,
  scheduled_for timestamptz,
  updated_at timestamptz default now(),
  created_at timestamptz default now(),
  -- Source & research
  sources jsonb default '[]',
  research_notes text,
  -- Analytics (denormalized)
  view_count int default 0,
  affiliate_click_count int default 0,
  avg_reading_time_seconds int
);
alter table public.articles enable row level security;
create index if not exists articles_status_idx on public.articles(status);
create index if not exists articles_category_idx on public.articles(category_id);
create index if not exists articles_published_at_idx on public.articles(published_at desc);
create index if not exists articles_slug_idx on public.articles(slug);
create index if not exists articles_title_trgm on public.articles using gin (title gin_trgm_ops);

create table if not exists public.article_tags (
  article_id uuid references public.articles(id) on delete cascade,
  tag_id uuid references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);
alter table public.article_tags enable row level security;

create table if not exists public.article_revisions (
  id uuid primary key default uuid_generate_v4(),
  article_id uuid not null references public.articles(id) on delete cascade,
  editor_id uuid references public.profiles(id),
  snapshot jsonb not null,
  change_notes text,
  created_at timestamptz default now()
);
alter table public.article_revisions enable row level security;

-- ============================================================
-- PRODUCTS (commerce)
-- ============================================================
create type merchant_type as enum (
  'amazon', 'flipkart', 'nykaa', 'myntra', 'ajio',
  'cred', 'tatacliq', 'meesho', 'direct', 'other'
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  brand text,
  description text,
  category text,
  subcategory text,
  image_url text,
  additional_images text[],
  key_features text[],
  specifications jsonb default '{}',
  pros text[],
  cons text[],
  verdict text,
  rating numeric(2,1),
  review_count int,
  -- Pricing
  current_price numeric(10,2),
  original_price numeric(10,2),
  discount_percent int,
  currency text default 'INR',
  -- Merchant
  merchant merchant_type not null default 'amazon',
  merchant_name text,
  merchant_product_id text,
  affiliate_url text,
  direct_url text,
  -- Status
  availability text default 'in_stock',
  last_price_verified_at timestamptz,
  last_availability_verified_at timestamptz,
  -- AI metadata
  is_ai_curated boolean default false,
  editor_approved boolean default false,
  editor_notes text,
  -- Analytics
  click_count int default 0,
  conversion_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.products enable row level security;
create index if not exists products_merchant_idx on public.products(merchant);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_verified_idx on public.products(last_price_verified_at desc);

create table if not exists public.article_products (
  article_id uuid references public.articles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  position int default 0,
  placement text default 'inline',
  recommendation_note text,
  primary key (article_id, product_id)
);
alter table public.article_products enable row level security;

create table if not exists public.product_comparisons (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  product_a_id uuid references public.products(id),
  product_b_id uuid references public.products(id),
  spec_comparison jsonb default '[]',
  winner_id uuid references public.products(id),
  verdict text,
  best_for_a text,
  best_for_b text,
  published boolean default false,
  view_count int default 0,
  created_at timestamptz default now()
);
alter table public.product_comparisons enable row level security;

-- ============================================================
-- TREND RADAR
-- ============================================================
create type trend_direction as enum ('up', 'steady', 'down');
create type trend_source as enum (
  'google_trends', 'google_news', 'reddit', 'youtube',
  'news_rss', 'brand_announcement', 'ecommerce', 'editorial', 'other'
);

create table if not exists public.trends (
  id uuid primary key default uuid_generate_v4(),
  topic text not null,
  normalized_topic text not null,
  category_id uuid references public.categories(id),
  summary text,
  -- Scoring
  interest_score int,
  growth_score int,
  india_relevance_score int,
  search_demand_score int,
  commercial_intent_score int,
  competition_score int,
  affiliate_potential_score int,
  content_opportunity_score int,
  freshness_score int,
  confidence numeric(3,2),
  direction trend_direction default 'steady',
  -- Research
  related_keywords text[],
  sources jsonb default '[]',
  source_urls text[],
  related_article_ids uuid[],
  -- Status
  article_brief_generated boolean default false,
  article_id uuid references public.articles(id),
  dismissed boolean default false,
  dismissed_reason text,
  discovered_at timestamptz default now(),
  last_updated_at timestamptz default now(),
  created_at timestamptz default now()
);
alter table public.trends enable row level security;
create index if not exists trends_discovered_idx on public.trends(discovered_at desc);
create index if not exists trends_score_idx on public.trends(interest_score desc);
create index if not exists trends_category_idx on public.trends(category_id);

create table if not exists public.keyword_opportunities (
  id uuid primary key default uuid_generate_v4(),
  keyword text not null,
  normalized_keyword text not null,
  category_id uuid references public.categories(id),
  intent text,
  monthly_volume_india int,
  keyword_difficulty int,
  cpc_inr numeric(10,2),
  trend_direction trend_direction,
  content_type text,
  suggested_slug text,
  suggested_title text,
  affiliate_potential text,
  sources jsonb default '[]',
  researched_at timestamptz default now(),
  used_in_article_id uuid references public.articles(id),
  dismissed boolean default false,
  created_at timestamptz default now()
);
alter table public.keyword_opportunities enable row level security;
create index if not exists keyword_opp_volume_idx on public.keyword_opportunities(monthly_volume_india desc);

-- ============================================================
-- AFFILIATE TRACKING
-- ============================================================
create table if not exists public.affiliate_networks (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  api_credentials_configured boolean default false,
  default_commission_percent numeric(5,2),
  is_active boolean default true,
  notes text,
  created_at timestamptz default now()
);
alter table public.affiliate_networks enable row level security;

create table if not exists public.affiliate_clicks (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id),
  article_id uuid references public.articles(id),
  merchant merchant_type,
  campaign text,
  ip_hash text,
  user_agent text,
  referrer text,
  country text default 'IN',
  clicked_at timestamptz default now()
);
alter table public.affiliate_clicks enable row level security;
create index if not exists aff_clicks_product_idx on public.affiliate_clicks(product_id);
create index if not exists aff_clicks_article_idx on public.affiliate_clicks(article_id);
create index if not exists aff_clicks_date_idx on public.affiliate_clicks(clicked_at desc);

create table if not exists public.affiliate_conversions (
  id uuid primary key default uuid_generate_v4(),
  click_id uuid references public.affiliate_clicks(id),
  product_id uuid references public.products(id),
  article_id uuid references public.articles(id),
  order_value_inr numeric(10,2),
  commission_inr numeric(10,2),
  commission_status text default 'pending',
  network_order_id text,
  converted_at timestamptz,
  created_at timestamptz default now()
);
alter table public.affiliate_conversions enable row level security;

-- ============================================================
-- NEWSLETTER
-- ============================================================
create type subscriber_status as enum ('active', 'unsubscribed', 'bounced', 'complained');

create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  status subscriber_status default 'active',
  preferred_categories uuid[],
  source text,
  confirmed_at timestamptz,
  consent_at timestamptz default now(),
  unsubscribed_at timestamptz,
  created_at timestamptz default now()
);
alter table public.newsletter_subscribers enable row level security;

create table if not exists public.newsletter_issues (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  subject text not null,
  preview_text text,
  body_html text,
  body_markdown text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  sent_count int default 0,
  open_count int default 0,
  click_count int default 0,
  created_at timestamptz default now()
);
alter table public.newsletter_issues enable row level security;

-- ============================================================
-- AUTOMATION / JOBS
-- ============================================================
create type job_status as enum ('queued', 'running', 'completed', 'failed');

create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  job_type text not null,
  status job_status default 'queued',
  payload jsonb default '{}',
  result jsonb default '{}',
  error_message text,
  retry_count int default 0,
  scheduled_for timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);
alter table public.jobs enable row level security;
create index if not exists jobs_status_idx on public.jobs(status);
create index if not exists jobs_scheduled_idx on public.jobs(scheduled_for);

create table if not exists public.automation_config (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb,
  description text,
  updated_at timestamptz default now()
);
alter table public.automation_config enable row level security;

-- ============================================================
-- ANALYTICS / EVENTS
-- ============================================================
create table if not exists public.page_views (
  id uuid primary key default uuid_generate_v4(),
  path text not null,
  article_id uuid references public.articles(id),
  session_id text,
  country text default 'IN',
  referrer text,
  user_agent text,
  viewed_at timestamptz default now()
);
alter table public.page_views enable row level security;
create index if not exists page_views_path_idx on public.page_views(path);
create index if not exists page_views_date_idx on public.page_views(viewed_at desc);

create table if not exists public.search_queries (
  id uuid primary key default uuid_generate_v4(),
  query text not null,
  result_count int,
  session_id text,
  clicked_result_id uuid,
  searched_at timestamptz default now()
);
alter table public.search_queries enable row level security;

-- ============================================================
-- IMAGES
-- ============================================================
create table if not exists public.images (
  id uuid primary key default uuid_generate_v4(),
  storage_path text,
  public_url text not null,
  alt_text text,
  caption text,
  credit text,
  width int,
  height int,
  size_bytes int,
  mime_type text,
  tags text[],
  is_ai_generated boolean default false,
  ai_prompt text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);
alter table public.images enable row level security;

-- ============================================================
-- SITE SETTINGS
-- ============================================================
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb,
  description text,
  category text,
  updated_at timestamptz default now()
);
alter table public.site_settings enable row level security;

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ declare
  r record;
begin
  for r in
    select c.table_name from information_schema.columns c
    where c.table_schema='public' and c.column_name='updated_at'
      and c.table_name not in ('schema_migrations')
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', r.table_name);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function set_updated_at()', r.table_name);
  end loop;
end $$;

-- ============================================================
-- RLS POLICIES
-- ============================================================
-- Admins / editors can do everything via service role (used in server actions).
-- Public read on published content.
-- Subscribers manage their own data.

-- Helper: check role
create or replace function auth_role() returns text as $$
  select role::text from public.profiles where id = auth.uid();
$$ language sql stable;

create or replace function is_admin() returns boolean as $$
  select coalesce((select role from public.profiles where id = auth.uid()) in ('admin','editor'), false);
$$ language sql stable;

-- Profiles: self-read, admin all
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select using (auth.uid() = id or is_admin());

drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write on public.profiles
  for all using (is_admin()) with check (is_admin());

-- Public read of published articles
drop policy if exists articles_public_read on public.articles;
create policy articles_public_read on public.articles
  for select using (status = 'published' or is_admin());

drop policy if exists articles_editor_write on public.articles;
create policy articles_editor_write on public.articles
  for all using (is_admin()) with check (is_admin());

-- Categories & tags: public read
drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories for select using (true);
drop policy if exists categories_admin_write on public.categories;
create policy categories_admin_write on public.categories for all using (is_admin()) with check (is_admin());

drop policy if exists tags_public_read on public.tags;
create policy tags_public_read on public.tags for select using (true);
drop policy if exists tags_admin_write on public.tags;
create policy tags_admin_write on public.tags for all using (is_admin()) with check (is_admin());

-- Products: public read
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select using (true);
drop policy if exists products_admin_write on public.products;
create policy products_admin_write on public.products for all using (is_admin()) with check (is_admin());

-- Newsletter: self-manage
drop policy if exists subscribers_self on public.newsletter_subscribers;
create policy subscribers_self on public.newsletter_subscribers
  for select using (
    (select email from auth.users where id = auth.uid()) = email or is_admin()
  );

drop policy if exists subscribers_public_insert on public.newsletter_subscribers;
create policy subscribers_public_insert on public.newsletter_subscribers
  for insert with check (true);

-- Trends / keywords: editor only
drop policy if exists trends_admin on public.trends;
create policy trends_admin on public.trends for all using (is_admin()) with check (is_admin());

drop policy if exists keywords_admin on public.keyword_opportunities;
create policy keywords_admin on public.keyword_opportunities for all using (is_admin()) with check (is_admin());

-- Jobs: admin only
drop policy if exists jobs_admin on public.jobs;
create policy jobs_admin on public.jobs for all using (is_admin()) with check (is_admin());

-- ============================================================
-- SEED CATEGORIES
-- ============================================================
insert into public.categories (slug, name, tagline, accent_color, icon, sort_order) values
  ('trending', 'Trending', 'What India is talking about', '#D4502C', 'flame', 1),
  ('technology', 'Technology', 'Phones, laptops, gadgets & what''s next', '#2563EB', 'cpu', 2),
  ('ai-tools', 'AI Tools', 'The tools reshaping how India works', '#9333EA', 'sparkles', 3),
  ('shopping', 'Shopping', 'Products worth your rupees', '#059669', 'shopping-bag', 4),
  ('money', 'Money', 'Personal finance, decoded', '#DC2626', 'trending-up', 5),
  ('lifestyle', 'Lifestyle', 'Fashion, beauty, home & how we live', '#DB2777', 'shirt', 6),
  ('entertainment', 'Entertainment', 'OTT, cinema, music, stars', '#EA580C', 'clapperboard', 7),
  ('travel', 'Travel', 'Where India is going', '#0891B2', 'plane', 8)
on conflict (slug) do nothing;
