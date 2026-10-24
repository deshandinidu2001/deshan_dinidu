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
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
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
    <footer
      ref={ref}
      id="contact"
      className="contact-section contact-redesigned section-shell"
    >
      <div className="footer-invitation footer-invitation-new">
        <div>
          <span className="mono">The next good conversation</span>
          <h2>
            What are you
            <br />
            working on?
          </h2>
          <p className="script footer-note">
            A rough idea is a perfectly good start.
          </p>
        </div>
        <div className="footer-project">
          <p>
            Bring a question, a half-formed idea, or a system that needs a
            better connection.
          </p>
          <button
            className="footer-project-trigger"
            onClick={() => {
              setCopied(false);
              setFeedback("");
              dialog.current?.showModal();
            }}
          >
            <ArrowUpRight size={34} strokeWidth={1.2} />
            <span>
              Write a<br />
              project brief
            </span>
          </button>
          {profile.email && (
            <a className="text-link" href={"mailto:" + profile.email}>
              <Mail size={16} />
              Email me
            </a>
          )}
        </div>
      </div>
      <div className="footer-directory">
        <a className="footer-signature" href="#hero">
          deshan<span>.</span>
        </a>
        <nav aria-label="Footer navigation">
          {[
            { label: "Work", href: "#work" },
            { label: "AI Lab", href: "#ai-lab" },
            { label: "About", href: "#about" },
            { label: "Toolkit", href: "#built-with" },
          ].map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={15} />
            GitHub <ArrowUpRight size={13} />
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={13} />
            </a>
          )}
        </nav>
        <a className="footer-top" href="#hero">
          Back to top <ArrowUp size={16} />
        </a>
      </div>
      <div className="footer-colophon mono">
        <span>
          © {siteCopy.contact.year} {profile.name}
        </span>
        <span>Made with curiosity in {profile.location}.</span>
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
