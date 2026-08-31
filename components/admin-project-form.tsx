import type { Project } from "@/lib/content";

type Action = (formData: FormData) => void | Promise<void>;

export function AdminProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: Action;
  project?: Project;
  submitLabel: string;
}) {
  return (
    <form className="admin-form" action={action}>
      {project?.id && <input type="hidden" name="id" value={project.id} />}
      <div className="form-grid two-columns">
        <label>Judul proyek<input name="title" required defaultValue={project?.title} /></label>
        <label>Slug URL<input name="slug" placeholder="otomatis-dari-judul" defaultValue={project?.slug} /></label>
        <label>Label/kategori<input name="eyebrow" defaultValue={project?.eyebrow} /></label>
        <label>Bukti utama<input name="metric" defaultValue={project?.metric} /></label>
        <label>Tahun<input name="year" defaultValue={project?.year} /></label>
        <label>Urutan<input name="sort_order" type="number" min="0" max="999" defaultValue={project?.sortOrder ?? 10} /></label>
      </div>
      <label>Ringkasan<textarea name="summary" rows={3} required defaultValue={project?.summary} /></label>
      <label>Peran Anda<textarea name="role" rows={2} defaultValue={project?.role} /></label>
      <div className="form-grid two-columns">
        <label>Tantangan<textarea name="challenge" rows={6} defaultValue={project?.challenge} /></label>
        <label>Pendekatan<textarea name="approach" rows={6} defaultValue={project?.approach} /></label>
      </div>
      <label>Hasil<textarea name="outcome" rows={5} defaultValue={project?.outcome} /></label>
      <div className="form-grid two-columns">
        <label>Fitur — satu per baris<textarea name="features" rows={6} defaultValue={project?.features.join("\n")} /></label>
        <label>Teknologi — pisahkan dengan koma<textarea name="tags" rows={6} defaultValue={project?.tags.join(", ")} /></label>
      </div>
      <label>Catatan privasi<textarea name="disclosure" rows={2} defaultValue={project?.disclosure} /></label>
      <div className="form-grid two-columns">
        <label>URL/path gambar<input name="image_url" defaultValue={project?.image ?? ""} placeholder="Opsional bila mengunggah file" /></label>
        <label>Unggah gambar<input name="image_file" type="file" accept="image/png,image/jpeg,image/webp" /></label>
      </div>
      <div className="check-row">
        <label><input name="published" type="checkbox" defaultChecked={project?.published ?? true} /> Tampilkan ke publik</label>
        <label><input name="featured" type="checkbox" defaultChecked={project?.featured ?? true} /> Tandai unggulan</label>
      </div>
      <button className="button" type="submit">{submitLabel}</button>
    </form>
  );
}
