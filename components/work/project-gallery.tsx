"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import type { ProjectScreenshot } from "@/data/project-studies";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ProjectGallery({
  images,
  projectName,
  cover = false,
}: {
  images: ProjectScreenshot[];
  projectName: string;
  cover?: boolean;
}) {
  const desktops = images
    .map((image, index) => ({ image, index }))
    .filter(({ image }) => image.format !== "mobile");
  const mobiles = images
    .map((image, index) => ({ image, index }))
    .filter(({ image }) => image.format === "mobile");
  const [selected, setSelected] = useState(
    cover ? 0 : (desktops[1]?.index ?? 0),
  );
  const [expanded, setExpanded] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null),
    reduced = useReducedMotion();
  const image = images[selected],
    fullImage = expanded === null ? null : images[expanded];
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (expanded === null) {
      if (element.open) element.close();
      return;
    }
    if (!element.open) element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);
  const changeFull = (direction: number) =>
    setExpanded((index) =>
      index === null
        ? null
        : (index + direction + images.length) % images.length,
    );
  const figure = (shot: ProjectScreenshot, index: number, mobile = false) => (
    <figure className={mobile ? "study-mobile-figure" : "study-desktop-figure"}>
      <button
        className={mobile ? "study-mobile-screen" : "study-screen"}
        type="button"
        onClick={() => setExpanded(index)}
        aria-label={`Enlarge ${projectName}: ${shot.label}`}
      >
        {mobile ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(min-width:1024px) 340px, 42vw"
          />
        ) : (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width:1800px) 1576px, (min-width:768px) 88vw, 92vw"
            preload={cover}
            style={{ objectFit: "contain" }}
          />
        )}
        <span className="study-enlarge" aria-hidden="true">
          <Maximize2 size={17} />
        </span>
      </button>
      <figcaption>
        <span className="mono">{shot.label}</span>
        <p>{shot.caption}</p>
      </figcaption>
    </figure>
  );
  return (
    <div className={cover ? "study-cover" : "study-gallery"}>
      {!cover && (
        <div
          className="study-image-choices"
          role="group"
          aria-label={`Choose ${projectName} screenshot`}
        >
          {desktops.map(({ image: shot, index }) => (
            <button
              key={shot.src}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {shot.label}
            </button>
          ))}
        </div>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: reduced ? 0 : 0.16 }}
        >
          {figure(image, selected)}
        </motion.div>
      </AnimatePresence>
      {!cover && mobiles.length > 0 && (
        <div className="study-mobile-gallery">
          <div className="study-mobile-intro">
            <h3>The same system, in your hand.</h3>
            <p className="script">Light or dark. Still connected.</p>
          </div>
          <div className="study-mobile-pair">
            {mobiles.map(({ image: shot, index }) => (
              <div key={shot.src}>{figure(shot, index, true)}</div>
            ))}
          </div>
        </div>
      )}
      <dialog
        className="study-lightbox"
        ref={dialog}
        aria-label={`${projectName} screenshot viewer`}
        onClose={() => setExpanded(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setExpanded(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            const buttons = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                "button:not(:disabled)",
              ),
            );
            const first = buttons[0],
              last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            changeFull(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            changeFull(-1);
          }
        }}
      >
        {fullImage && (
          <div className="study-lightbox-inner">
            <div className="study-lightbox-heading">
              <span>
                {projectName}
                <span className="mono">{fullImage.label}</span>
              </span>
              <button
                type="button"
                onClick={() => setExpanded(null)}
                aria-label="Close screenshot viewer"
                autoFocus
              >
                <X size={22} />
              </button>
            </div>
            <div className="study-lightbox-image">
              <Image
                src={fullImage.src}
                alt={fullImage.alt}
                fill
                sizes="96vw"
                loading="eager"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="study-lightbox-footer">
              <p>{fullImage.caption}</p>
              <div>
                <button
                  type="button"
                  onClick={() => changeFull(-1)}
                  aria-label="Previous screenshot"
                >
                  <ArrowLeft size={20} />
                </button>
                <span className="mono">
                  {expanded! + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={() => changeFull(1)}
                  aria-label="Next screenshot"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
