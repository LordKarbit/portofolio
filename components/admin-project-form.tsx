"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Info, UploadCloud } from "lucide-react";
import type { Project } from "@/lib/content";

type Action = (formData: FormData) => void | Promise<void>;

export function AdminProjectForm({ action, project, submitLabel }: { action: Action; project?: Project; submitLabel: string }) {
  const [preview, setPreview] = useState(project?.image ?? "");
  const [dimensions, setDimensions] = useState("");
  const [temporaryUrl, setTemporaryUrl] = useState("");

  useEffect(() => () => {
    if (temporaryUrl) URL.revokeObjectURL(temporaryUrl);
  }, [temporaryUrl]);

  function previewFile(file?: File) {
    if (!file) return;
    if (temporaryUrl) URL.revokeObjectURL(temporaryUrl);
    const url = URL.createObjectURL(file);
    setTemporaryUrl(url);
    setPreview(url);
    const image = new window.Image();
    image.onload = () => setDimensions(`${image.naturalWidth} × ${image.naturalHeight} px`);
    image.src = url;
  }

  return (
    <form className="admin-form" action={action}>
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      <div className="thumbnail-editor">
        <div className="thumbnail-preview" style={preview ? { backgroundImage: `url(${preview})`, backgroundPosition: project?.imagePosition || "center" } : undefined}>
          {!preview && <span><ImageIcon size={28} /> Belum ada thumbnail</span>}
        </div>
        <div className="thumbnail-controls">
          <div><p className="admin-field-title">Thumbnail proyek</p><p>Pratinjau mengikuti rasio kartu pada halaman portfolio.</p></div>
          <label className="upload-dropzone">
            <UploadCloud size={21} />
            <span><strong>Pilih gambar</strong><small>JPG, PNG, atau WebP · maksimum 5 MB</small></span>
            <input name="image_file" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => previewFile(event.target.files?.[0])} />
          </label>
          {dimensions && <span className="image-dimensions">File dipilih: {dimensions}</span>}
          <div className="thumbnail-guide">
            <Info size={17} />
            <div><strong>Panduan ukuran</strong><p>Gunakan rasio <b>16:9</b>. Rekomendasi <b>1600 × 900 px</b>, minimum 1200 × 675 px. Letakkan elemen penting di area tengah dan usahakan file di bawah 300 KB.</p></div>
          </div>
        </div>
      </div>

      <div className="form-grid two-columns">
        <label>Judul proyek<input name="title" required maxLength={120} defaultValue={project?.title} /></label>
        <label>Slug URL<input name="slug" placeholder="otomatis-dari-judul" maxLength={80} defaultValue={project?.slug} /></label>
        <label>Label/kategori<input name="eyebrow" maxLength={160} defaultValue={project?.eyebrow} /></label>
        <label>Bukti utama<input name="metric" maxLength={160} defaultValue={project?.metric} /></label>
        <label>Tahun<input name="year" maxLength={20} defaultValue={project?.year} /></label>
        <label>Urutan<input name="sort_order" type="number" min="0" max="999" defaultValue={project?.sortOrder ?? 10} /></label>
      </div>
      <label>Ringkasan <span className="field-hint">Tampil pada kartu proyek</span><textarea name="summary" rows={3} required maxLength={1200} defaultValue={project?.summary} /></label>
      <label>Peran Anda<textarea name="role" rows={2} maxLength={300} defaultValue={project?.role} /></label>
      <div className="form-grid two-columns">
        <label>Tantangan<textarea name="challenge" rows={6} maxLength={4000} defaultValue={project?.challenge} /></label>
        <label>Pendekatan<textarea name="approach" rows={6} maxLength={4000} defaultValue={project?.approach} /></label>
      </div>
      <label>Hasil<textarea name="outcome" rows={5} maxLength={4000} defaultValue={project?.outcome} /></label>
      <div className="form-grid two-columns">
        <label>Fitur <span className="field-hint">Satu per baris</span><textarea name="features" rows={6} defaultValue={project?.features.join("\n")} /></label>
        <label>Teknologi <span className="field-hint">Pisahkan dengan koma</span><textarea name="tags" rows={6} defaultValue={project?.tags.join(", ")} /></label>
      </div>
      <label>Catatan privasi<textarea name="disclosure" rows={2} maxLength={1000} defaultValue={project?.disclosure} /></label>
      <div className="form-grid two-columns">
        <label>URL/path thumbnail<input name="image_url" value={preview.startsWith("blob:") ? project?.image ?? "" : preview} onChange={(event) => { setPreview(event.target.value); setDimensions(""); }} placeholder="Opsional jika mengunggah file" /></label>
        <label>Alt text thumbnail<input name="image_alt" maxLength={240} defaultValue={project?.imageAlt} placeholder={`Tampilan sistem ${project?.title ?? "proyek"}`} /></label>
        <label>Fokus gambar<select name="image_position" defaultValue={project?.imagePosition || "center"} onChange={(event) => {
          const previewElement = event.currentTarget.form?.querySelector<HTMLElement>(".thumbnail-preview");
          if (previewElement) previewElement.style.backgroundPosition = event.target.value;
        }}><option value="center">Tengah</option><option value="top">Atas</option><option value="bottom">Bawah</option><option value="left">Kiri</option><option value="right">Kanan</option></select></label>
      </div>
      <div className="check-row">
        <label><input name="published" type="checkbox" defaultChecked={project?.published ?? true} /> Publikasikan proyek</label>
        <label><input name="featured" type="checkbox" defaultChecked={project?.featured ?? true} /> Tampilkan sebagai unggulan</label>
      </div>
      <div className="admin-form-footer"><p>Perubahan pada proyek publik langsung diterapkan setelah disimpan.</p><button className="button" type="submit">{submitLabel}</button></div>
    </form>
  );
}
