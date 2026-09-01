"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import type { Locale } from "@/lib/localization";

const viewerCopy: Record<Locale, { open: string; close: string; openTab: string; download: string; hint: string }> = {
  id: {
    open: "Buka dokumen PDF",
    close: "Tutup PDF",
    openTab: "Buka di tab baru",
    download: "Unduh PDF",
    hint: "Cubit layar untuk memperbesar, atau gunakan kontrol zoom pada PDF.",
  },
  en: {
    open: "Open PDF document",
    close: "Close PDF",
    openTab: "Open in a new tab",
    download: "Download PDF",
    hint: "Pinch to zoom, or use the PDF viewer's zoom controls.",
  },
  zh: {
    open: "打开 PDF 文档",
    close: "关闭 PDF",
    openTab: "在新标签页中打开",
    download: "下载 PDF",
    hint: "双指缩放，或使用 PDF 阅读器中的缩放控件。",
  },
};

type PdfModalCardProps = {
  children: ReactNode;
  locale: Locale;
  pdf: string;
  title: string;
};

export function PdfModalCard({ children, locale, pdf, title }: PdfModalCardProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copy = viewerCopy[locale];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-label={`${copy.open}: ${title}`}
        className="legacy-card pdf-modal-trigger reveal"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className="pdf-card-badge" aria-hidden="true">
          <FileText size={15} /> PDF
        </span>
        {children}
      </button>

      {open &&
        createPortal(
          <div
            aria-label={`${title} PDF`}
            aria-modal="true"
            className="pdf-modal-backdrop"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setOpen(false);
            }}
            role="dialog"
          >
            <div className="pdf-modal-panel">
              <header className="pdf-modal-toolbar">
                <div>
                  <span><FileText size={17} aria-hidden="true" /> PDF</span>
                  <strong>{title}</strong>
                </div>
                <p>{copy.hint}</p>
                <nav aria-label={`${title} PDF controls`}>
                  <a href={pdf} target="_blank" rel="noreferrer" title={copy.openTab}>
                    <ExternalLink size={18} aria-hidden="true" />
                    <span>{copy.openTab}</span>
                  </a>
                  <a href={pdf} download title={copy.download}>
                    <Download size={18} aria-hidden="true" />
                    <span>{copy.download}</span>
                  </a>
                  <button ref={closeButtonRef} onClick={() => setOpen(false)} type="button" title={copy.close}>
                    <X size={21} aria-hidden="true" />
                    <span className="sr-only">{copy.close}</span>
                  </button>
                </nav>
              </header>
              <div className="pdf-modal-viewer">
                <iframe
                  allowFullScreen
                  src={`${pdf}#toolbar=1&navpanes=0&view=FitH`}
                  title={`${title} PDF`}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
