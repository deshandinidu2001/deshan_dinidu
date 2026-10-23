"use client";
import { useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Mail,
  X,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { SignalMark } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const reduced = useScrollMotion();
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to(".footer-name-fill", {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: ".footer-name",
          start: "top 95%",
          end: "bottom 75%",
          scrub: 1,
        },
      });
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  const getBrief = () => {
    if (!form.current?.reportValidity()) return null;
    const data = new FormData(form.current);
    return `Project brief for ${profile.name}\n\nFrom: ${data.get("name")}\nProject: ${data.get("project")}\n\n${data.get("message")}`;
  };
  const copy = async () => {
    const text = getBrief();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFeedback(siteCopy.contact.copied);
    } catch {
      setFeedback(siteCopy.contact.copyUnavailable);
    }
  };
  const download = () => {
    const text = getBrief();
    if (!text) return;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "project-brief.txt";
    anchor.click();
    URL.revokeObjectURL(url);
    setFeedback(siteCopy.contact.downloaded);
  };
  return (
    <footer ref={ref} id="contact" className="contact-section section-shell">
      <div className="section-kicker mono">
        <span>{siteCopy.contact.label}</span>
        <span>{profile.location}</span>
      </div>
      <div className="contact-card">
        <div className="contact-orbits" aria-hidden="true">
          <i />
          <i />
          <i />
          <SignalMark />
        </div>
        <div className="contact-content">
          <h2>
            {siteCopy.contact.title}
            <ArrowUpRight strokeWidth={1} />
          </h2>
          <p>{siteCopy.contact.description}</p>
          <div className="contact-actions">
            <Magnetic>
              <button
                className="button button-primary"
                onClick={() => {
                  setCopied(false);
                  setFeedback("");
                  dialog.current?.showModal();
                }}
              >
                {siteCopy.contact.cta}
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
            {profile.email ? (
              <a
                className="button button-outline"
                href={`mailto:${profile.email}`}
              >
                <Mail size={16} />
                {siteCopy.contact.email}
              </a>
            ) : (
              <button
                className="button button-outline contact-disabled"
                disabled
                title={siteCopy.contact.addressPending}
              >
                <Mail size={16} />
                {siteCopy.contact.email}
                <small>{siteCopy.ui.soon}</small>
              </button>
            )}
          </div>
          {!profile.email && (
            <p className="contact-placeholder">
              {siteCopy.contact.unavailable}
            </p>
          )}
        </div>
      </div>
      <div className="footer-links">
        <a
          className="text-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={15} />
          {siteCopy.ui.github}
          <ArrowUpRight size={14} />
        </a>
        {profile.linkedin ? (
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            {siteCopy.contact.linkedin}
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="footer-placeholder">
            {siteCopy.contact.linkedin} <small>{siteCopy.ui.soon}</small>
          </span>
        )}
        <a className="back-top mono" href="#hero">
          {siteCopy.contact.top}
          <ArrowUp size={16} />
        </a>
      </div>
      <div className="footer-name">
        <span className="sr-only">{profile.name}</span>
        <span aria-hidden="true">{profile.name}</span>
        <span className="footer-name-fill" aria-hidden="true">
          {profile.name}
        </span>
      </div>
      <div className="footer-bottom mono">
        <span>
          © {siteCopy.contact.year} {profile.name}
        </span>
        <span className="footer-thanks">
          {siteCopy.contact.thanks}
          <i className="signal-dot" />
        </span>
        <span>{siteCopy.concept}</span>
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="brief-title"
        className="brief-dialog"
        data-lenis-prevent
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label={siteCopy.contact.close}
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <span className="mono small-label">{siteCopy.contact.briefLabel}</span>
        <h2 id="brief-title">{siteCopy.contact.briefTitle}</h2>
        <p>{siteCopy.contact.briefIntro}</p>
        <form
          ref={form}
          onSubmit={(e) => {
            e.preventDefault();
            void copy();
          }}
          onChange={() => setCopied(false)}
        >
          <label>
            {siteCopy.contact.name}
            <input name="name" autoComplete="name" required maxLength={100} />
          </label>
          <label>
            {siteCopy.contact.project}
            <input name="project" required maxLength={200} />
          </label>
          <label>
            {siteCopy.contact.message}
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={5000}
              rows={4}
            />
          </label>
          <div className="brief-actions">
            <button type="submit" className="button button-primary">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? siteCopy.contact.copied : siteCopy.contact.copy}
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={download}
            >
              <Download size={16} />
              {siteCopy.contact.download}
            </button>
            {profile.email && (
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  const text = getBrief();
                  if (text)
                    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(siteCopy.contact.subject)}&body=${encodeURIComponent(text)}`;
                }}
              >
                {siteCopy.contact.send}
                <ArrowUpRight size={16} />
              </button>
            )}
          </div>
          <p className="brief-feedback" role="status">
            {feedback}
          </p>
          <p className="brief-privacy mono">{siteCopy.contact.privacy}</p>
        </form>
      </dialog>
    </footer>
  );
}
