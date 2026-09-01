import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ketentuan Penggunaan",
  description: "Ketentuan penggunaan website dan panel admin portfolio Samsul Arifin.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <Link className="legal-back" href="/">
          ← Kembali ke portfolio
        </Link>
        <p className="legal-eyebrow">Dokumen legal</p>
        <h1>Ketentuan Penggunaan</h1>
        <p className="legal-updated">Terakhir diperbarui: 1 September 2026</p>

        <section>
          <h2>Penggunaan website</h2>
          <p>
            Website ini disediakan sebagai portfolio dan profil profesional Samsul Arifin. Anda dapat
            melihat serta membagikan tautan halaman publik untuk keperluan rekrutmen, kolaborasi, dan
            komunikasi profesional yang wajar.
          </p>
        </section>

        <section>
          <h2>Kepemilikan konten</h2>
          <p>
            Teks, studi kasus, desain, foto, dan materi portfolio merupakan milik Samsul Arifin atau
            digunakan dengan izin yang sesuai. Penggunaan ulang secara komersial, penyalinan massal,
            atau penyajian ulang yang menyesatkan memerlukan persetujuan tertulis.
          </p>
        </section>

        <section>
          <h2>Akses panel admin</h2>
          <p>
            Panel admin bersifat privat dan hanya ditujukan untuk akun Google pemilik yang telah
            diizinkan. Upaya mengakses, menguji, mengganggu, atau mengubah sistem tanpa izin tidak
            diperbolehkan.
          </p>
        </section>

        <section>
          <h2>Ketepatan informasi</h2>
          <p>
            Informasi portfolio dijaga agar tetap akurat dan relevan, tetapi dapat berubah seiring
            perkembangan proyek dan pengalaman profesional. Detail sensitif milik klien dapat diringkas
            atau disamarkan untuk menjaga kerahasiaan.
          </p>
        </section>

        <section>
          <h2>Tautan pihak ketiga</h2>
          <p>
            Website dapat memuat tautan menuju produk, demo, platform sosial, atau layanan pihak ketiga.
            Penggunaan situs tersebut tunduk pada ketentuan dan kebijakan masing-masing penyedia.
          </p>
        </section>

        <section>
          <h2>Kontak</h2>
          <p>
            Pertanyaan mengenai ketentuan ini dapat dikirim ke
            {" "}<a href="mailto:syamsul.ar313@gmail.com">syamsul.ar313@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
