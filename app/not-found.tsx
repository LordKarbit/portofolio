import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <p className="eyebrow">404</p>
      <h1>Halaman ini tidak ditemukan.</h1>
      <p>Mungkin tautannya berubah atau studi kasus belum dipublikasikan.</p>
      <Link className="button" href="/">Kembali ke beranda</Link>
    </main>
  );
}
