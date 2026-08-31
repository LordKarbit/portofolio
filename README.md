# Portfolio Samsul Arifin

Website profil dan portofolio berbasis Next.js untuk memosisikan Samsul sebagai **Operations Systems & Automation Specialist** dengan kekuatan pada business process improvement, operational control, data, dan AI-assisted solution delivery. Website publik tetap dapat berjalan tanpa database menggunakan konten bawaan. Setelah Supabase dihubungkan, konten dapat dikelola dari `/admin`.

## Yang sudah tersedia

- Beranda recruiter-first dengan bukti dampak, keahlian, pengalaman, dan CTA kontak.
- Empat studi kasus: GeoLead, Kayou POS, KLWT Surveyor, dan Narotama Workforce.
- Halaman detail dinamis di `/projects/[slug]`.
- Admin untuk memperbarui profil, membuat/mengedit/menghapus proyek, menambah pengalaman, menambah keahlian, dan mengunggah gambar.
- Supabase Auth, Row Level Security, dan bucket media publik tanpa service-role key.
- Metadata SEO, Open Graph image, sitemap, robots, 404, dan error fallback.
- Siap dibangun dan dijalankan sebagai aplikasi Next.js penuh di Vercel.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Tanpa variabel Supabase, website masuk ke **mode pratinjau** dan menggunakan konten di `lib/content.ts`.

## Hubungkan Supabase

1. Buat proyek baru di Supabase.
2. Pada **Authentication → Users**, buat user admin dengan email `syamsul.ar313@gmail.com` dan kata sandi yang kuat. Nonaktifkan public sign-up jika admin hanya untuk Anda.
3. Buka **SQL Editor**, lalu jalankan seluruh isi `supabase/schema.sql`. Skrip ini membuat tabel, RLS, storage bucket, seed content, dan mendaftarkan user tersebut sebagai admin.
4. Salin `.env.example` menjadi `.env.local`, lalu isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=https://www.samsularifin.cc
```

5. Mulai ulang server lokal dan masuk melalui `http://localhost:3000/admin/login`.

Jika user Auth dibuat setelah SQL dijalankan, jalankan kembali perintah terakhir pada `supabase/schema.sql` untuk memberikan hak admin.

## Deploy ke Vercel

1. Simpan folder ini ke repository Git.
2. Import repository tersebut pada Vercel dengan framework preset **Next.js**.
3. Tambahkan tiga environment variables dari `.env.example`. Gunakan `https://www.samsularifin.cc` untuk `NEXT_PUBLIC_SITE_URL`.
4. Jalankan deploy. Build command menggunakan `npm run build`.
5. Di Supabase, tambahkan domain produksi pada konfigurasi URL Auth bila kelak menggunakan tautan email atau provider OAuth.

Tidak ada `SUPABASE_SERVICE_ROLE_KEY` di aplikasi ini. Hak tulis admin ditangani oleh session user dan RLS.

## Mengelola konten

- **Profil**: headline, bio, lokasi, email, telepon, LinkedIn, dan status peluang.
- **Studi kasus**: judul, slug, ringkasan, metric, narasi challenge/approach/outcome, fitur, teknologi, status publik, urutan, dan gambar.
- **Karier**: tambah riwayat dan pencapaian.
- **Keahlian**: tambah item dan kategori.

Gambar yang diunggah dibatasi pada JPEG, PNG, atau WebP dengan ukuran maksimum 5 MB.

## Privasi

Situs ini hanya menyalin foto profil, CV, dan visual karya yang relevan. KTP, KK, NPWP, ijazah, data karyawan, kredensial, database aplikasi, serta dokumen milik orang lain tidak disalin ke folder website dan tidak boleh dimasukkan ke deployment.

## Pemeriksaan sebelum rilis

```bash
npm run lint
npm run build
npm run start
```

Setelah domain produksi tersedia, periksa kembali semua tautan, login admin, unggahan gambar, metadata sosial, serta tampilan mobile.
