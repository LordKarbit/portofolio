"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Link2, Mail, Share2, X } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { type Locale, localeHtmlLang } from "@/lib/localization";
import { shareCopy } from "@/lib/share-copy";

function trackShare(method: string, action: string) {
  window.gtag?.("event", "share", { method, action, content_type: "portfolio", item_id: "samsul-arifin" });
  window.clarity?.("event", `portfolio_share_${method}`);
}

export function ShareButton({ locale, url }: { locale: Locale; url: string }) {
  const copy = shareCopy[locale];
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const [nativeBusy, setNativeBusy] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [nativeError, setNativeError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  function openDialog() {
    setCopyState("idle");
    setNativeError(false);
    setHasNativeShare(typeof navigator.share === "function");
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  async function copyLink() {
    setNativeError(false);
    let copied = false;
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
    } catch {
      // Keep copying usable in browsers that block the Clipboard API.
      linkRef.current?.focus();
      linkRef.current?.select();
      try { copied = document.execCommand("copy"); } catch { /* Manual selection remains available. */ }
    }
    setCopyState(copied ? "copied" : "error");
    if (copied) trackShare("copy_link", "copied");
  }

  async function shareWithDevice() {
    if (nativeBusy) return;
    setCopyState("idle");
    setNativeError(false);
    setNativeBusy(true);
    try {
      // Called directly from the click to preserve the required user activation.
      await navigator.share({ title: copy.shareTitle, text: copy.shareText, url });
      trackShare("native", "opened_picker");
    } catch (error) {
      // Cancelling a share is not an error and does not mean anything was sent.
      if (!(error instanceof Error && error.name === "AbortError")) setNativeError(true);
    } finally {
      setNativeBusy(false);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(copy.shareText);
  const textAndUrl = encodeURIComponent(`${copy.shareText}\n\n${url}`);
  const channels = [
    { name: "WhatsApp", method: "whatsapp", icon: FaWhatsapp, href: `https://wa.me/?text=${textAndUrl}` },
    { name: "LinkedIn", method: "linkedin", icon: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: "Facebook", method: "facebook", icon: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: "X", method: "x", icon: FaXTwitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}` },
    { name: "Telegram", method: "telegram", icon: FaTelegramPlane, href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
    { name: copy.email, method: "email", icon: Mail, href: `mailto:?subject=${encodeURIComponent(copy.shareTitle)}&body=${textAndUrl}` },
  ];

  return (
    <>
      <button ref={triggerRef} type="button" className="button button-compact share-trigger" onClick={openDialog}
        aria-label={copy.title} title={copy.title} aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={id}>
        <Share2 size={18} aria-hidden="true" />
        <span className="header-action-label">{copy.button}</span>
      </button>
      <dialog ref={dialogRef} id={id} className="share-dialog" lang={localeHtmlLang[locale]}
        aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}
        onClose={() => { setIsOpen(false); triggerRef.current?.focus({ preventScroll: true }); }}
        onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}>
        <div className="share-panel">
          <div className="share-heading">
            <span className="share-heading-icon"><Share2 size={22} aria-hidden="true" /></span>
            <button type="button" className="share-close" onClick={closeDialog} aria-label={copy.close} title={copy.close}>
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <h2 id={`${id}-title`}>{copy.title}</h2>
          <p id={`${id}-description`} className="share-description">{copy.description}</p>
          <div className="share-destination-grid">
            {channels.map(({ name, method, icon: Icon, href }) => (
              <a key={method} className={`share-destination share-destination-${method}`} href={href}
                target={method === "email" ? undefined : "_blank"} rel="noopener noreferrer"
                data-share-method={method} aria-label={copy.openIn.replace("{name}", name)}>
                <span className="share-destination-icon"><Icon size={22} aria-hidden="true" /></span>
                <span>{name}</span>
              </a>
            ))}
          </div>
          {hasNativeShare && (
            <button type="button" className="share-native" onClick={shareWithDevice} disabled={nativeBusy}>
              <Share2 size={19} aria-hidden="true" />
              <span><strong>{copy.native}</strong><small>{copy.nativeHelp}</small></span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          )}
          <div className="share-link-section">
            <label htmlFor={`${id}-link`}>{copy.linkLabel}</label>
            <div className="share-link-row">
              <Link2 size={17} aria-hidden="true" />
              <input ref={linkRef} id={`${id}-link`} type="text" value={url} readOnly dir="ltr" spellCheck={false}
                onFocus={(event) => event.currentTarget.select()} />
              <button type="button" onClick={copyLink} className={copyState === "copied" ? "is-copied" : undefined}>
                {copyState === "copied" ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                <span>{copyState === "copied" ? copy.copied : copy.copy}</span>
              </button>
            </div>
            <p className="share-workspace-help">{copy.workspaceHelp}</p>
            <p className={`share-status${copyState === "error" || nativeError ? " is-error" : ""}`} role="status" aria-live="polite" aria-atomic="true">
              {copyState === "error" ? copy.copyError : nativeError ? copy.nativeError : copyState === "copied" ? copy.copySuccess : ""}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
