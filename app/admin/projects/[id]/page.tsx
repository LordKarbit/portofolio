import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { deleteProjectAction, updateProjectAction } from "@/app/admin/actions";
import { AdminProjectForm } from "@/components/admin-project-form";
import { requireAdmin } from "@/lib/auth";
import { mapProjectRow } from "@/lib/data";

export default async function EditProjectPage({ params, searchParams }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  const query = await searchParams;
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error || !data) notFound();
  const project = mapProjectRow(data);

  return (
    <main className="admin-page edit-project-page">
      <header className="admin-header">
        <div><span className="brand-mark">SA</span><div><strong>Edit studi kasus</strong><small>{project.title}</small></div></div>
        <Link href="/admin"><ArrowLeft size={16} /> Kembali ke dashboard</Link>
      </header>
      <div className="edit-project-shell">
        {query.saved && <div className="form-message success">Perubahan proyek berhasil disimpan.</div>}
        {query.error && <div className="form-message error">{String(query.error)}</div>}
        <section className="admin-panel">
          <div className="admin-panel-heading"><div><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1></div></div>
          <AdminProjectForm action={updateProjectAction} project={project} submitLabel="Simpan perubahan" />
          <div className="danger-zone">
            <div><strong>Hapus proyek</strong><p>Tindakan ini menghapus studi kasus dari database.</p></div>
            <form action={deleteProjectAction}><input type="hidden" name="id" value={project.id} /><button className="danger-button" type="submit">Hapus proyek</button></form>
          </div>
        </section>
      </div>
    </main>
  );
}
