import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const messages: Record<string, string> = {
  setup: "Hubungkan proyek Supabase terlebih dahulu sebelum masuk.",
  credentials: "Email atau kata sandi belum cocok.",
  "not-authorized": "Akun ini belum terdaftar sebagai admin portofolio.",
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
        <p>Masuk untuk memperbarui profil, studi kasus, perjalanan karier, dan daftar keahlian.</p>

        {errorKey && <div className="form-message error" role="alert">{messages[errorKey] ?? "Belum berhasil masuk. Silakan coba kembali."}</div>}

        {isSupabaseConfigured ? (
          <form className="admin-form" action={loginAction}>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Kata sandi<input name="password" type="password" autoComplete="current-password" required /></label>
            <button className="button" type="submit">Masuk ke admin</button>
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
