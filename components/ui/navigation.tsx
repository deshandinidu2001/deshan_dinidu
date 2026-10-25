"use client";
import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { ArrowUpRight, Github, Menu, Moon, Sun, X } from "lucide-react";
import { navigation, profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { Magnetic } from "./magnetic";
import { toggleThemeFromButton } from "@/lib/theme-transition";
const subscribeTheme = (callback: () => void) => {
  window.addEventListener("theme-change", callback);
  return () => window.removeEventListener("theme-change", callback);
};
function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  return (
    <span
      ref={ref}
      onPointerEnter={() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        if (timer.current) clearInterval(timer.current);
        let iteration = 0;
        const chars = "01/<>_";
        timer.current = setInterval(() => {
          if (ref.current)
            ref.current.textContent = text
              .split("")
              .map((c, i) =>
                i < iteration
                  ? c
                  : chars[Math.floor(Math.random() * chars.length)],
              )
              .join("");
          iteration += 0.6;
          if (iteration >= text.length && timer.current) {
            clearInterval(timer.current);
            if (ref.current) ref.current.textContent = text;
          }
        }, 25);
      }}
      aria-label={text}
    >
      {text}
    </span>
  );
}
export function Navigation() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.dataset.theme || "dark",
    () => "dark",
  );
  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    void toggleThemeFromButton(event.currentTarget);
  };
  return (
    <header className="site-header" data-compact={compact}>
      <div className="header-dock">
        <Link href="/" className="brand" aria-label={`${profile.name} home`}>
          <Image
            className="brand-portrait"
            src="/images/Profile.jpg"
            width={38}
            height={38}
            alt=""
            priority
          />
          <span className="brand-name-short">
            deshan<span className="brand-dot">.</span>
          </span>
          <span className="brand-name-full">
            deshan dinidu<span className="brand-dot">.</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={siteCopy.ui.mainNav}>
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              <Scramble text={item.label} />
            </Link>
          ))}
          <span className="nav-divider" />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub (opens in a new tab)"
          >
            <Github size={15} />
          </a>
          <button
            onClick={toggle}
            className="theme-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
        <Magnetic>
          <Link
            className="nav-cta"
            href="/#contact"
            aria-label={siteCopy.ui.talk}
          >
            <span className="nav-cta-label">{siteCopy.ui.talk}</span>
            <ArrowUpRight size={16} />
          </Link>
        </Magnetic>
        <div className="mobile-controls">
          <button
            onClick={toggle}
            className="theme-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? siteCopy.ui.closeMenu : siteCopy.ui.menu}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={siteCopy.ui.mobileNav}
        >
          {navigation.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span>0{i + 1}</span>
              {item.label}
              <ArrowUpRight />
            </Link>
          ))}
          <a href={profile.github} target="_blank" rel="noreferrer">
            {siteCopy.ui.github}
            <Github size={20} />
          </a>
        </nav>
      )}
    </header>
  );
}
