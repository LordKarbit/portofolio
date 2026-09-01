import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { loginAction } from "@/app/admin/actions";
import { ADMIN_EMAIL } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const messages: Record<string, string> = {
  setup: "Hubungkan proyek Supabase terlebih dahulu sebelum masuk.",
  "not-authorized": "Akun Google ini tidak memiliki izin untuk mengelola portofolio.",
  oauth: "Login Google belum berhasil. Silakan coba kembali.",
};

export default async function AdminLoginPage({ searchParams }: PageProps<"/admin/login">) {
  const query = await searchParams;
  const errorKey = typeof query.error === "string" ? query.error : "";

  return (
    <main className="admin-login-page">
      <Link className="admin-back" href="/">← Kembali ke website</Link>
      <section className="admin-login-card">
        <span className="admin-login-icon"><LockKeyhole size={24} /></span>
        <p className="eyebrow">Ruang pengelola</p>
        <h1>Kelola portofolio</h1>
        <p>Kelola profil, studi kasus, perjalanan karier, keahlian, dan media website dari satu tempat.</p>

        {errorKey && <div className="form-message error" role="alert">{messages[errorKey] ?? "Belum berhasil masuk. Silakan coba kembali."}</div>}

        {isSupabaseConfigured ? (
          <form className="admin-form" action={loginAction}>
            <button className="google-login-button" type="submit"><FcGoogle size={21} /> Masuk dengan Google</button>
            <div className="admin-access-note">
              <ShieldCheck size={18} aria-hidden="true" />
              <p>Hanya akun <strong>{ADMIN_EMAIL}</strong> yang diizinkan. Tidak tersedia pendaftaran atau metode login lain.</p>
            </div>
          </form>
        ) : (
          <div className="setup-notice">
            <strong>Mode pratinjau aktif</strong>
            <p>Website publik sudah berfungsi dengan konten bawaan. Ikuti bagian “Hubungkan Supabase” pada README untuk mengaktifkan admin.</p>
          </div>
        )}
      </section>
    </main>
  );
}
