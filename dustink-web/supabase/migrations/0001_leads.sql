-- Contactos que llegan desde la página. La página solo puede insertar;
-- nadie puede leer con la llave pública.
create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (char_length(phone) between 8 and 20),
  comuna text check (char_length(comuna) <= 60),
  problem text check (char_length(problem) <= 30),
  m2 numeric(7, 1) check (m2 > 0 and m2 < 2000),
  windows jsonb not null default '{}'::jsonb,
  attribution jsonb not null default '{}'::jsonb,
  page text check (char_length(page) <= 200),
  -- Seguimiento comercial: se llena a mano o desde un panel.
  status text not null default 'nuevo'
    check (status in ('nuevo', 'cotizado', 'vendido', 'perdido')),
  quoted_at timestamptz,
  sold_at timestamptz,
  sale_amount integer check (sale_amount >= 0),
  notes text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;

create policy "La página puede crear contactos"
  on public.leads
  for insert
  to anon
  with check (
    status = 'nuevo'
    and quoted_at is null
    and sold_at is null
    and sale_amount is null
    and notes is null
    and pg_column_size(windows) < 2000
    and pg_column_size(attribution) < 4000
  );
