import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi website dan panel admin portfolio Samsul Arifin.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <Link className="legal-back" href="/">
          ← Kembali ke portfolio
        </Link>
        <p className="legal-eyebrow">Dokumen legal</p>
        <h1>Kebijakan Privasi</h1>
        <p className="legal-updated">Terakhir diperbarui: 1 September 2026</p>

        <section>
          <h2>Ringkasan</h2>
          <p>
            Website ini adalah portfolio profesional milik Samsul Arifin. Informasi yang ditampilkan
            digunakan untuk memperkenalkan pengalaman, kemampuan, dan karya profesional kepada
            perekrut, calon klien, serta mitra kerja.
          </p>
        </section>

        <section>
          <h2>Data yang diproses</h2>
          <p>
            Pengunjung tidak diwajibkan membuat akun. Website dapat mencatat data penggunaan teknis
            seperti halaman yang dikunjungi, jenis perangkat, negara atau wilayah secara umum, dan
            interaksi antarmuka melalui layanan analitik. Data tersebut digunakan untuk memahami
            performa website dan memperbaiki pengalaman pengguna.
          </p>
        </section>

        <section>
          <h2>Login panel admin</h2>
          <p>
            Panel admin menggunakan Google OAuth dan hanya menerima satu akun pemilik yang telah
            ditentukan. Saat login, aplikasi menerima identitas dasar dari Google berupa alamat email,
            nama, dan foto profil. Data ini hanya dipakai untuk memverifikasi akses pengelolaan konten;
            aplikasi tidak meminta akses ke Gmail, Google Drive, kontak, atau data Google lainnya.
          </p>
        </section>

        <section>
          <h2>Penyimpanan dan keamanan</h2>
          <p>
            Konten portfolio dan media disimpan melalui Supabase. Akses tulis dilindungi oleh autentikasi,
            pemeriksaan email pemilik, serta kebijakan keamanan pada tingkat database. Tidak ada data
            akun pengunjung yang dijual atau diperdagangkan.
          </p>
        </section>

        <section>
          <h2>Layanan pihak ketiga</h2>
          <p>
            Website dapat menggunakan Vercel untuk hosting, Supabase untuk database dan autentikasi,
            Google untuk login dan analitik, serta Microsoft Clarity untuk analisis pengalaman pengguna.
            Masing-masing layanan memproses data sesuai kebijakan privasi mereka.
          </p>
        </section>

        <section>
          <h2>Kontak</h2>
          <p>
            Untuk pertanyaan terkait privasi atau permintaan mengenai data, hubungi
            {" "}<a href="mailto:syamsul.ar313@gmail.com">syamsul.ar313@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
