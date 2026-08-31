-- Samsul Arifin portfolio: schema, RLS policies, storage, and seed content.
-- Run this file in the Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text not null default '',
  intro text not null default '',
  about text not null default '',
  location text not null default '',
  email text not null default '',
  phone text not null default '',
  linkedin text not null default '',
  availability text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  eyebrow text not null default '',
  summary text not null default '',
  metric text not null default '',
  image_url text not null default '',
  tags text[] not null default '{}',
  year text not null default '',
  role text not null default '',
  challenge text not null default '',
  approach text not null default '',
  outcome text not null default '',
  features text[] not null default '{}',
  disclosure text,
  featured boolean not null default true,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title text not null,
  company text not null,
  summary text not null default '',
  achievements text[] not null default '{}',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (title, company, period)
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (name, category)
);

alter table public.portfolio_admins enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portfolio_admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

drop policy if exists "Admin can read own role" on public.portfolio_admins;
create policy "Admin can read own role" on public.portfolio_admins
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Public can read profile" on public.profiles;
create policy "Public can read profile" on public.profiles
for select to anon, authenticated using (true);

drop policy if exists "Admin can manage profile" on public.profiles;
create policy "Admin can manage profile" on public.profiles
for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects" on public.projects
for select to anon, authenticated using (published = true);

drop policy if exists "Admin can manage projects" on public.projects;
create policy "Admin can manage projects" on public.projects
for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Public can read published experiences" on public.experiences;
create policy "Public can read published experiences" on public.experiences
for select to anon, authenticated using (published = true);

drop policy if exists "Admin can manage experiences" on public.experiences;
create policy "Admin can manage experiences" on public.experiences
for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Public can read published skills" on public.skills;
create policy "Public can read published skills" on public.skills
for select to anon, authenticated using (published = true);

drop policy if exists "Admin can manage skills" on public.skills;
create policy "Admin can manage skills" on public.skills
for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media" on storage.objects
for select to anon, authenticated using (bucket_id = 'portfolio-media');

drop policy if exists "Admin can add portfolio media" on storage.objects;
create policy "Admin can add portfolio media" on storage.objects
for insert to authenticated with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

drop policy if exists "Admin can update portfolio media" on storage.objects;
create policy "Admin can update portfolio media" on storage.objects
for update to authenticated using (bucket_id = 'portfolio-media' and public.is_portfolio_admin())
with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

drop policy if exists "Admin can delete portfolio media" on storage.objects;
create policy "Admin can delete portfolio media" on storage.objects
for delete to authenticated using (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

insert into public.profiles (
  slug, name, role, intro, about, location, email, phone, linkedin, availability
) values (
  'samsul-arifin',
  'Samsul Arifin',
  'Operations Systems & Automation Specialist',
  'Saya memetakan proses lapangan, menetapkan workflow dan kontrol, lalu menggunakan AI untuk mewujudkannya menjadi aplikasi. Saya bertanggung jawab atas kebutuhan operasional, logika proses, validasi data, dan kualitas hasil.',
  'Saya bekerja lebih dari lima tahun di return operations, sales, logistik, inventory, dan reporting. Dalam setiap aplikasi, saya memahami masalah, menyusun requirement dan workflow, menetapkan kontrol, menguji edge case, serta memastikan hasilnya sesuai cara tim bekerja. Saya memakai AI untuk mempercepat eksekusi teknis. Keputusan operasional dan standar mutu sistem tetap saya pegang.',
  'Sidoarjo, Jawa Timur, Indonesia',
  'syamsul.ar313@gmail.com',
  '+62 821-3860-7205',
  'https://www.linkedin.com/in/samsul-arifin-328aa918b/',
  'Terbuka untuk peran Business Process Improvement, Operational Excellence, Business Systems, Operations Transformation, serta proyek otomasi operasional.'
)
on conflict (slug) do update set
  name = excluded.name,
  role = excluded.role,
  intro = excluded.intro,
  about = excluded.about,
  location = excluded.location,
  email = excluded.email,
  phone = excluded.phone,
  linkedin = excluded.linkedin,
  availability = excluded.availability,
  updated_at = now();

insert into public.projects (
  slug, title, eyebrow, summary, metric, image_url, tags, year, role,
  challenge, approach, outcome, features, disclosure, featured, published, sort_order
) values
(
  'geolead', 'GeoLead', 'Produk SaaS & otomasi geospasial',
  'Sistem akuisisi prospek Google Maps berbasis batas wilayah terverifikasi, dari pemilihan area hingga ekspor lead yang siap ditindaklanjuti.',
  '83.518 polygon desa raw terindeks', '/images/projects/geolead.jpg',
  array['Next.js','Python','Supabase','Geospatial'], '2026',
  'Operations discovery, product direction, workflow design, dan AI-assisted solution delivery',
  'Pencarian bisnis di Google Maps tidak mengikuti batas administrasi secara presisi. Tim sales membutuhkan cakupan wilayah yang dapat diverifikasi, proses yang aman, dan hasil yang mudah dipakai kembali.',
  'Saya merancang desktop operator yang menggabungkan pencarian terlihat di browser, pemilihan polygon administrasi, validasi posisi bisnis, antrean misi, serta ekspor Excel. Situs komersialnya menangani lisensi, voucher, checkout, dan distribusi installer.',
  'Terbentuk produk yang dapat dijual secara umum dengan alur end-to-end dari akuisisi, aktivasi lisensi, eksekusi misi, hingga audit hasil. Indeks batas nasional memuat 38 provinsi dan 83.518 polygon desa raw sebagai fondasi penyaringan wilayah.',
  array['Seleksi wilayah bertingkat hingga desa dan polygon gate untuk hasil pencarian','Kontrol aman: jeda CAPTCHA, stop terkontrol, ETA, audit, dan manifest','Ekspor lead ke Excel dengan struktur yang siap ditindaklanjuti','Licensing berbasis Supabase, checkout, voucher, dan installer delivery'],
  null, true, true, 1
),
(
  'kayou-pos', 'Kayou POS', 'Multi-booth retail operations',
  'Satu alur untuk transaksi, absensi, stok, transfer barang, tutup hari, dan laporan pada banyak booth dengan kontrol berbasis peran.',
  '6 alur kerja berbasis peran', '/images/projects/kayou.png',
  array['Next.js','PWA','Offline-first','RBAC'], '2026',
  'Operations architecture, requirements, workflow design, dan AI-assisted solution delivery',
  'Operasi penjualan pada banyak booth membutuhkan kontrol transaksi, kehadiran, perpindahan stok, dan rekonsiliasi kas tanpa menghambat tim yang bekerja dari perangkat berbeda dan koneksi yang tidak selalu stabil.',
  'Saya memetakan alur dari Area Manager hingga penjaga booth, lalu menggabungkan POS, attendance, inbound, transfer, inventory, close-day, dan report ke satu PWA dengan kontrol akses hierarkis serta antrean offline.',
  'Kayou memperoleh satu sumber kerja operasional untuk enam kelompok peran, dengan jejak transaksi dan stok yang lebih konsisten dari level area hingga booth.',
  array['POS responsif dengan antrean offline dan cetak struk','Absensi berbasis lokasi dan foto','Transfer stok berjenjang dari area hingga booth','Tutup hari dengan bukti kas, selisih, laporan, dan ekspor CSV'],
  'Studi kasus menggunakan tampilan lingkungan pengembangan; data akun dan transaksi tidak dipublikasikan.', true, true, 2
),
(
  'klwt-surveyor', 'KLWT Surveyor', 'Field survey & market intelligence',
  'Platform operasional survei merchant dengan penugasan, bukti GPS dan foto, verifikasi berlapis, serta deteksi duplikasi.',
  '5 peran operasional terhubung', '/images/projects/klwt.png',
  array['React','PWA','Maps','Workflow'], '2026',
  'Field-workflow research, product direction, validation design, dan AI-assisted solution delivery',
  'Survei pasar sparepart mobil melibatkan penugasan lapangan, bukti kunjungan, kualitas alamat, verifikasi, dan konsolidasi insight. Spreadsheet terpisah membuat duplikasi dan tindak lanjut sulit dikendalikan.',
  'Saya merancang workflow lima peran: Head, Manager, Surveyor, Verificator, dan Admin. Sistem mencakup assignment, GPS dan foto, validasi kontak, duplicate scoring, revisi, market intelligence, serta notifikasi PWA.',
  'Proses survei menjadi satu rantai data yang dapat ditelusuri dari penugasan hingga lead terverifikasi dan analisis pasar, sekaligus memberi manajemen visibilitas terhadap progres dan kualitas data.',
  array['Penugasan survei dan monitoring progres lapangan','Bukti GPS, foto, waktu, serta pengayaan alamat','Verifikasi bertingkat, duplicate scoring, dan revision loop','Dashboard market intelligence, impor-ekspor, dan push notification'],
  'Angka pada screenshot berasal dari lingkungan demo/simulasi dan tidak diposisikan sebagai hasil bisnis aktual.', true, true, 3
),
(
  'narotama', 'Narotama Workforce', 'Freelance | workforce operations',
  'Aplikasi absensi dan HR untuk tim lapangan: geofence, selfie, antrean offline, shift, lembur, cuti, koreksi, dan audit kebijakan.',
  'GPS + geofence + bukti selfie', '/images/projects/narotama.png',
  array['Next.js','MySQL','Cloud Storage','Security'], '2026',
  'Business-process discovery, product direction, dan AI-assisted application delivery untuk PT Cahaya Putra Narotama',
  'Perusahaan membutuhkan absensi lapangan yang dapat dipercaya sekaligus panel HR untuk mengelola jadwal, kontrak, lembur, cuti, koreksi, periode, dan laporan dari satu sistem.',
  'Saya memetakan kebutuhan karyawan, HR, dan superadmin, lalu mengarahkan pembuatan pengalaman mobile dengan GPS, geofence, selfie, waktu server, binding perangkat, dan antrean offline. Sistem juga mencakup kebijakan, audit, dan kontrol periode.',
  'Satu aplikasi menghubungkan bukti kehadiran karyawan dengan proses administrasi HR, laporan, dan kontrol kebijakan yang dapat diaudit.',
  array['Clock-in/out dengan GPS, geofence, selfie, dan waktu server','Offline queue, device binding, shift, lembur, cuti, dan koreksi','HR dashboard, master data, kontrak, laporan, dan proses bulk','Policy control, period lock, audit trail, MySQL, dan object storage'],
  'Informasi internal perusahaan, data karyawan, dan implementasi sensitif tidak disertakan dalam studi kasus publik.', true, true, 4
)
on conflict (slug) do update set
  title = excluded.title,
  eyebrow = excluded.eyebrow,
  summary = excluded.summary,
  metric = excluded.metric,
  image_url = excluded.image_url,
  tags = excluded.tags,
  year = excluded.year,
  role = excluded.role,
  challenge = excluded.challenge,
  approach = excluded.approach,
  outcome = excluded.outcome,
  features = excluded.features,
  disclosure = excluded.disclosure,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.experiences (period, title, company, summary, achievements, published, sort_order) values
('Jan 2025 – sekarang', 'Senior Operations Specialist', 'Xingyun Group', 'Menghubungkan order fulfillment, logistik, sales operations, inventory, dan pengembangan alat kerja.', array['Mendukung pencapaian 100% SLA order fulfillment pada Q1 2025','Menurunkan rasio biaya logistik dari 5% pada Q4 2024 menjadi 2,8% pada Q1 2025','Membangun sales tools terpadu yang digunakan 70+ pengguna aktif'], true, 1),
('Mei – Des 2024', 'Assistant Regional Sales Manager', 'Polibeli', 'Memantau aktivitas lapangan, KPI, produktivitas sales, GMV, dan kualitas eksekusi regional.', array['Membangun KPI monitoring dan aplikasi pelaporan aktivitas lapangan','Insight yang dihasilkan mendukung pencapaian Best Regional Manager tiga kali'], true, 2),
('Des 2022 – Mei 2023', 'Data Analyst', 'GOTOKO', 'Mengolah data performa penjualan menjadi monitoring dan alat bantu keputusan harian.', array['Meraih peringkat nasional #1 untuk achievement pada Q1 2023','Mengembangkan chatbot dan reporting untuk mempercepat akses informasi tim'], true, 3),
('Des 2021 – Mar 2023', 'Return Staff / Supervisor', 'ULA', 'Menangani return operations, analisis fraud, koordinasi penyelesaian backlog, dan kontrol proses.', array['Mengidentifikasi pola risiko dan fraud pada proses retur','Mengoordinasikan penyelesaian backlog retur senilai Rp1,3 miliar dalam satu minggu'], true, 4)
on conflict (title, company, period) do update set
  summary = excluded.summary,
  achievements = excluded.achievements,
  published = excluded.published,
  sort_order = excluded.sort_order;

insert into public.skills (name, category, published, sort_order) values
('Business process mapping','Operations',true,1),
('SOP & operational controls','Operations',true,2),
('Requirements & UAT','Operations',true,3),
('KPI & performance systems','Data',true,4),
('Excel & Google Sheets','Data',true,5),
('Tableau','Data',true,6),
('Apps Script & AppSheet','Automation',true,7),
('AI-assisted workflow automation','Automation',true,8),
('PWA & offline workflows','Automation',true,9),
('Product scoping & QA','Delivery',true,10),
('Next.js & React','Delivery',true,11),
('Supabase & SQL','Delivery',true,12)
on conflict (name, category) do update set
  published = excluded.published,
  sort_order = excluded.sort_order;

-- If the Auth user already exists, this grants admin access automatically.
-- If it is created later, run this final statement again.
insert into public.portfolio_admins (user_id)
select id from auth.users where lower(email) = lower('syamsul.ar313@gmail.com')
on conflict (user_id) do nothing;
