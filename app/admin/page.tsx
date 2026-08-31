import Link from "next/link";
import { ExternalLink, LogOut, Pencil, Plus } from "lucide-react";
import {
  createExperienceAction,
  createProjectAction,
  createSkillAction,
  deleteExperienceAction,
  deleteSkillAction,
  logoutAction,
  saveProfileAction,
} from "@/app/admin/actions";
import { AdminProjectForm } from "@/components/admin-project-form";
import { requireAdmin } from "@/lib/auth";
import { profile as fallbackProfile, type Experience, type Profile, type Skill } from "@/lib/content";
import { mapProjectRow } from "@/lib/data";

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const query = await searchParams;
  const { supabase } = await requireAdmin();
  const [profileResult, projectResult, experienceResult, skillResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("slug", "samsul-arifin").maybeSingle(),
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
    supabase.from("skills").select("*").order("sort_order", { ascending: true }),
  ]);

  const currentProfile = (profileResult.data ?? fallbackProfile) as Profile;
  const adminProjects = (projectResult.data ?? []).map((row) => mapProjectRow(row));
  const adminExperiences = (experienceResult.data ?? []).map((row) => ({
    id: String(row.id),
    period: String(row.period),
    title: String(row.title),
    company: String(row.company),
    summary: String(row.summary ?? ""),
    achievements: Array.isArray(row.achievements) ? row.achievements : [],
    sortOrder: Number(row.sort_order ?? 0),
    published: Boolean(row.published),
  })) as Experience[];
  const adminSkills = (skillResult.data ?? []).map((row) => ({
    id: String(row.id),
    name: String(row.name),
    category: String(row.category),
    sortOrder: Number(row.sort_order ?? 0),
    published: Boolean(row.published),
  })) as Skill[];

  const saved = typeof query.saved === "string" ? query.saved : "";
  const error = typeof query.error === "string" ? query.error : "";

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div><span className="brand-mark">SA</span><div><strong>Portfolio Admin</strong><small>Samsul Arifin</small></div></div>
        <div className="admin-header-actions">
          <Link href="/" target="_blank">Lihat website <ExternalLink size={15} /></Link>
          <form action={logoutAction}><button type="submit"><LogOut size={15} /> Keluar</button></form>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <p>Konten</p>
          <a href="#profile">Profil</a>
          <a href="#projects">Studi kasus</a>
          <a href="#experience">Karier</a>
          <a href="#skills">Keahlian</a>
        </aside>

        <div className="admin-content">
          <div className="admin-intro">
            <div><p className="eyebrow">Dashboard</p><h1>Perbarui cerita profesional Anda.</h1></div>
            <p>Perubahan yang dipublikasikan akan langsung muncul di website.</p>
          </div>
          {saved && <div className="form-message success" role="status">Perubahan berhasil disimpan.</div>}
          {error && <div className="form-message error" role="alert">{error}</div>}

          <section className="admin-panel" id="profile">
            <div className="admin-panel-heading"><div><p className="eyebrow">Profil utama</p><h2>Informasi pembuka</h2></div></div>
            <form className="admin-form" action={saveProfileAction}>
              <div className="form-grid two-columns">
                <label>Nama<input name="name" required defaultValue={currentProfile.name} /></label>
                <label>Positioning<input name="role" required defaultValue={currentProfile.role} /></label>
              </div>
              <label>Kalimat pembuka<textarea name="intro" rows={3} defaultValue={currentProfile.intro} /></label>
              <label>Tentang saya<textarea name="about" rows={6} defaultValue={currentProfile.about} /></label>
              <div className="form-grid two-columns">
                <label>Lokasi<input name="location" defaultValue={currentProfile.location} /></label>
                <label>Status peluang<input name="availability" defaultValue={currentProfile.availability} /></label>
                <label>Email<input name="email" type="email" defaultValue={currentProfile.email} /></label>
                <label>Telepon<input name="phone" defaultValue={currentProfile.phone} /></label>
              </div>
              <label>LinkedIn<input name="linkedin" type="url" defaultValue={currentProfile.linkedin} /></label>
              <button className="button" type="submit">Simpan profil</button>
            </form>
          </section>

          <section className="admin-panel" id="projects">
            <div className="admin-panel-heading">
              <div><p className="eyebrow">Studi kasus</p><h2>Portofolio proyek</h2></div>
              <span>{adminProjects.length} proyek</span>
            </div>
            <div className="admin-list">
              {adminProjects.map((project) => (
                <Link className="admin-list-item" href={`/admin/projects/${project.id}`} key={project.id}>
                  <div><strong>{project.title}</strong><span>{project.eyebrow}</span></div>
                  <div><small>{project.published ? "Publik" : "Draf"}</small><Pencil size={16} /></div>
                </Link>
              ))}
            </div>
            <details className="admin-create">
              <summary><Plus size={17} /> Tambah proyek baru</summary>
              <AdminProjectForm action={createProjectAction} submitLabel="Buat proyek" />
            </details>
          </section>

          <section className="admin-panel" id="experience">
            <div className="admin-panel-heading"><div><p className="eyebrow">Perjalanan karier</p><h2>Pengalaman profesional</h2></div></div>
            <div className="admin-list">
              {adminExperiences.map((experience) => (
                <div className="admin-list-item" key={experience.id}>
                  <div><strong>{experience.title}</strong><span>{experience.company} · {experience.period}</span></div>
                  <form action={deleteExperienceAction}><input type="hidden" name="id" value={experience.id} /><button className="text-danger" type="submit">Hapus</button></form>
                </div>
              ))}
            </div>
            <details className="admin-create">
              <summary><Plus size={17} /> Tambah pengalaman</summary>
              <form className="admin-form" action={createExperienceAction}>
                <div className="form-grid two-columns">
                  <label>Jabatan<input name="title" required /></label>
                  <label>Perusahaan<input name="company" required /></label>
                  <label>Periode<input name="period" placeholder="Jan 2026 – sekarang" /></label>
                  <label>Urutan<input name="sort_order" type="number" defaultValue="10" /></label>
                </div>
                <label>Ringkasan<textarea name="summary" rows={3} /></label>
                <label>Pencapaian (satu per baris)<textarea name="achievements" rows={5} /></label>
                <button className="button" type="submit">Tambahkan</button>
              </form>
            </details>
          </section>

          <section className="admin-panel" id="skills">
            <div className="admin-panel-heading"><div><p className="eyebrow">Keahlian</p><h2>Peta kemampuan</h2></div></div>
            <div className="admin-skill-list">
              {adminSkills.map((skill) => (
                <div key={skill.id}><span>{skill.name}<small>{skill.category}</small></span><form action={deleteSkillAction}><input type="hidden" name="id" value={skill.id} /><button className="text-danger" type="submit">×</button></form></div>
              ))}
            </div>
            <form className="admin-form inline-form" action={createSkillAction}>
              <label>Nama<input name="name" required /></label>
              <label>Kategori<input name="category" required placeholder="Data / Product / Strategy" /></label>
              <label>Urutan<input name="sort_order" type="number" defaultValue="10" /></label>
              <button className="button" type="submit">Tambah</button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
