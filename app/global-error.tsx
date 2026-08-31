"use client";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="id">
      <body>
        <main className="status-page">
          <p className="eyebrow">Terjadi gangguan</p>
          <h1>Halaman belum berhasil dimuat.</h1>
          <p>Silakan coba kembali. Konten Anda tetap aman.</p>
          <button className="button" onClick={retry}>Coba lagi</button>
        </main>
      </body>
    </html>
  );
}
