import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, ExternalLink, FolderKanban, LayoutDashboard, LogOut, Pencil, Plus, Sparkles, UserRound } from "lucide-react";
import {
  createExperienceAction,
  createProjectAction,
  createSkillAction,
  deleteExperienceAction,
  deleteSkillAction,
  logoutAction,
  saveProfileAction,
  updateExperienceAction,
  updateSkillAction,
} from "@/app/admin/actions";
import { AdminProjectForm } from "@/components/admin-project-form";
import { requireAdmin } from "@/lib/auth";
import { profile as fallbackProfile, type Experience, type Profile, type Skill } from "@/lib/content";
import { mapProjectRow } from "@/lib/data";

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const query = await searchParams;
  const { supabase, user } = await requireAdmin();
  const [profileResult, projectResult, experienceResult, skillResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("slug", "samsul-arifin").maybeSingle(),
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
    supabase.from("skills").select("*").order("sort_order", { ascending: true }),
  ]);

  const currentProfile = (profileResult.data ?? fallbackProfile) as Profile;
  const adminProjects = (projectResult.data ?? []).map((row) => mapProjectRow(row));
  const adminExperiences = (experienceResult.data ?? []).map((row) => ({
    id: String(row.id), period: String(row.period), title: String(row.title), company: String(row.company),
    summary: String(row.summary ?? ""), achievements: Array.isArray(row.achievements) ? row.achievements : [],
    logo: String(row.logo_url ?? "") || undefined, sortOrder: Number(row.sort_order ?? 0), published: Boolean(row.published),
  })) as Experience[];
  const adminSkills = (skillResult.data ?? []).map((row) => ({
    id: String(row.id), name: String(row.name), category: String(row.category),
    sortOrder: Number(row.sort_order ?? 0), published: Boolean(row.published),
  })) as Skill[];
  const publishedProjects = adminProjects.filter((project) => project.published).length;
  const saved = typeof query.saved === "string" ? query.saved : "";
  const error = typeof query.error === "string" ? query.error : "";

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div><span className="brand-mark">SA</span><div><strong>Portfolio Admin</strong><small>{user.email}</small></div></div>
        <div className="admin-header-actions">
          <Link href="/" target="_blank">Lihat website <ExternalLink size={15} /></Link>
          <form action={logoutAction}><button type="submit"><LogOut size={15} /> Keluar</button></form>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <p>Kelola konten</p>
          <a href="#overview"><LayoutDashboard size={16} /> Ringkasan</a>
          <a href="#profile"><UserRound size={16} /> Profil</a>
          <a href="#projects"><FolderKanban size={16} /> Proyek</a>
          <a href="#experience"><BriefcaseBusiness size={16} /> Pengalaman</a>
          <a href="#skills"><Sparkles size={16} /> Keahlian</a>
        </aside>

        <div className="admin-content">
          <section className="admin-intro" id="overview">
            <div><p className="eyebrow">Dashboard</p><h1>Kendalikan seluruh portfolio.</h1></div>
            <p>Setiap perubahan tersimpan di Supabase dan konten berstatus publik langsung tampil di website.</p>
          </section>
          {saved && <div className="form-message success" role="status">Perubahan berhasil disimpan dan website telah diperbarui.</div>}
          {error && <div className="form-message error" role="alert">{error}</div>}

          <div className="admin-stat-grid" aria-label="Ringkasan konten">
            <div><FolderKanban size={20} /><span><strong>{adminProjects.length}</strong><small>Total proyek</small></span></div>
            <div><ExternalLink size={20} /><span><strong>{publishedProjects}</strong><small>Proyek publik</small></span></div>
            <div><BriefcaseBusiness size={20} /><span><strong>{adminExperiences.length}</strong><small>Pengalaman</small></span></div>
            <div><Sparkles size={20} /><span><strong>{adminSkills.length}</strong><small>Keahlian</small></span></div>
          </div>

          <section className="admin-panel" id="profile">
            <div className="admin-panel-heading"><div><p className="eyebrow">Profil utama</p><h2>Informasi publik</h2></div><span>Hero, tentang, dan kontak</span></div>
            <form className="admin-form" action={saveProfileAction}>
              <div className="form-grid two-columns">
                <label>Nama<input name="name" required maxLength={120} defaultValue={currentProfile.name} /></label>
                <label>Positioning<input name="role" required maxLength={180} defaultValue={currentProfile.role} /></label>
              </div>
              <label>Kalimat pembuka <span className="field-hint">Tampil pada hero</span><textarea name="intro" rows={4} maxLength={1200} defaultValue={currentProfile.intro} /></label>
              <label>Tentang saya<textarea name="about" rows={7} maxLength={4000} defaultValue={currentProfile.about} /></label>
              <div className="form-grid two-columns">
                <label>Lokasi<input name="location" maxLength={200} defaultValue={currentProfile.location} /></label>
                <label>Status peluang<input name="availability" maxLength={500} defaultValue={currentProfile.availability} /></label>
                <label>Email publik<input name="email" type="email" defaultValue={currentProfile.email} /></label>
                <label>WhatsApp/telepon<input name="phone" defaultValue={currentProfile.phone} /></label>
              </div>
              <label>LinkedIn<input name="linkedin" type="url" defaultValue={currentProfile.linkedin} /></label>
              <div className="admin-form-footer"><p>Pastikan informasi kontak tetap aktif agar recruiter dapat menghubungi Anda.</p><button className="button" type="submit">Simpan profil</button></div>
            </form>
          </section>

          <section className="admin-panel" id="projects">
            <div className="admin-panel-heading"><div><p className="eyebrow">Studi kasus</p><h2>Portfolio proyek</h2></div><span>{publishedProjects} publik · {adminProjects.length - publishedProjects} draf</span></div>
            <div className="admin-project-list">
              {adminProjects.map((project) => (
                <Link href={`/admin/projects/${project.id}`} key={project.id}>
                  <div className="admin-project-thumb"><Image src={project.image} alt="" fill sizes="112px" style={{ objectPosition: project.imagePosition || "center" }} /></div>
                  <div><strong>{project.title}</strong><span>{project.eyebrow || "Tanpa kategori"}</span><small>{project.published ? "Publik" : "Draf"}</small></div>
                  <Pencil size={16} />
                </Link>
              ))}
              {!adminProjects.length && <div className="admin-empty">Belum ada proyek. Tambahkan studi kasus pertama Anda di bawah.</div>}
            </div>
            <details className="admin-create">
              <summary><Plus size={17} /> Tambah proyek baru</summary>
              <AdminProjectForm action={createProjectAction} submitLabel="Buat proyek" />
            </details>
          </section>

          <section className="admin-panel" id="experience">
            <div className="admin-panel-heading"><div><p className="eyebrow">Perjalanan karier</p><h2>Pengalaman profesional</h2></div><span>{adminExperiences.length} entri</span></div>
            <div className="admin-accordion-list">
              {adminExperiences.map((experience) => (
                <details key={experience.id}>
                  <summary><div>{experience.logo && <span className="admin-company-logo"><Image src={experience.logo} alt="" fill sizes="44px" /></span>}<span><strong>{experience.title}</strong><small>{experience.company} · {experience.period}</small></span></div><span className={experience.published ? "status-live" : "status-draft"}>{experience.published ? "Publik" : "Draf"}</span></summary>
                  <form className="admin-form compact-admin-form" action={updateExperienceAction}>
                    <input type="hidden" name="id" value={experience.id} />
                    <div className="form-grid two-columns">
                      <label>Jabatan<input name="title" required defaultValue={experience.title} /></label>
                      <label>Perusahaan<input name="company" required defaultValue={experience.company} /></label>
                      <label>Periode<input name="period" defaultValue={experience.period} /></label>
                      <label>Urutan<input name="sort_order" type="number" min="0" max="999" defaultValue={experience.sortOrder} /></label>
                    </div>
                    <label>URL/path logo perusahaan<input name="logo_url" defaultValue={experience.logo} placeholder="/images/companies/nama-logo.png" /></label>
                    <label>Ringkasan<textarea name="summary" rows={3} defaultValue={experience.summary} /></label>
                    <label>Pencapaian <span className="field-hint">Satu per baris</span><textarea name="achievements" rows={5} defaultValue={experience.achievements.join("\n")} /></label>
                    <div className="admin-form-footer"><label className="inline-check"><input name="published" type="checkbox" defaultChecked={experience.published} /> Publikasikan</label><button className="button" type="submit">Simpan pengalaman</button></div>
                  </form>
                  <form className="inline-delete-form" action={deleteExperienceAction}><input type="hidden" name="id" value={experience.id} /><button className="text-danger" type="submit">Hapus pengalaman</button></form>
                </details>
              ))}
            </div>
            <details className="admin-create">
              <summary><Plus size={17} /> Tambah pengalaman</summary>
              <form className="admin-form" action={createExperienceAction}>
                <div className="form-grid two-columns"><label>Jabatan<input name="title" required /></label><label>Perusahaan<input name="company" required /></label><label>Periode<input name="period" placeholder="Jan 2026 – sekarang" /></label><label>Urutan<input name="sort_order" type="number" min="0" max="999" defaultValue="10" /></label></div>
                <label>URL/path logo perusahaan<input name="logo_url" placeholder="/images/companies/nama-logo.png" /></label>
                <label>Ringkasan<textarea name="summary" rows={3} /></label><label>Pencapaian <span className="field-hint">Satu per baris</span><textarea name="achievements" rows={5} /></label>
                <div className="admin-form-footer"><label className="inline-check"><input name="published" type="checkbox" defaultChecked /> Publikasikan</label><button className="button" type="submit">Tambahkan</button></div>
              </form>
            </details>
          </section>

          <section className="admin-panel" id="skills">
            <div className="admin-panel-heading"><div><p className="eyebrow">Keahlian</p><h2>Peta kemampuan</h2></div><span>{adminSkills.length} keahlian</span></div>
            <div className="admin-skill-editor">
              {adminSkills.map((skill) => (
                <form action={updateSkillAction} key={skill.id}><input type="hidden" name="id" value={skill.id} /><input name="name" required defaultValue={skill.name} aria-label="Nama keahlian" /><input name="category" required defaultValue={skill.category} aria-label="Kategori" /><input name="sort_order" type="number" min="0" max="999" defaultValue={skill.sortOrder} aria-label="Urutan" /><label className="skill-publish"><input name="published" type="checkbox" defaultChecked={skill.published} /> Publik</label><button type="submit">Simpan</button><button className="text-danger" formAction={deleteSkillAction}>Hapus</button></form>
              ))}
            </div>
            <form className="admin-form inline-form" action={createSkillAction}><label>Nama<input name="name" required /></label><label>Kategori<input name="category" required placeholder="Operations / Data / Delivery" /></label><label>Urutan<input name="sort_order" type="number" min="0" max="999" defaultValue="10" /></label><label className="inline-check"><input name="published" type="checkbox" defaultChecked /> Publik</label><button className="button" type="submit">Tambah</button></form>
          </section>
        </div>
      </div>
    </main>
  );
}
