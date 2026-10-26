"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Globe, MousePointer2, X } from "lucide-react";
import type { ProjectStudy } from "@/data/project-studies";

export function ProjectWebsitePreview({
  preview,
  url,
  name,
}: {
  preview: NonNullable<ProjectStudy["websitePreview"]>;
  url: string;
  name: string;
}) {
  const [live, setLive] = useState(false),
    [ready, setReady] = useState(false);
  const close = () => {
    setLive(false);
    setReady(false);
  };
  return (
    <div className="study-website-preview">
      <div className="study-website-toolbar">
        <span className="mono">
          <Globe size={15} aria-hidden="true" />
          {url.replace(/^https?:\/\//, "")}
        </span>
        <a href={url} target="_blank" rel="noreferrer">
          Open website
          <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="study-website-frame" data-live-ready={live && ready}>
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes="(min-width:1800px) 1576px, (min-width:768px) 88vw, 92vw"
          style={{ objectFit: "contain" }}
        />
        {live && (
          <iframe
            src={url}
            title={`${name} project website — interactive preview`}
            loading="eager"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
            allow="fullscreen"
            referrerPolicy="no-referrer"
            onLoad={() => setReady(true)}
          />
        )}
      </div>
      <div className="study-website-footer">
        <p aria-live="polite">
          {live
            ? ready
              ? "The live website is ready to explore. Scroll inside the preview."
              : "Loading the live project website…"
            : "A snapshot of the public project website, with architecture, testing and gallery sections to explore."}
        </p>
        <button type="button" onClick={() => (live ? close() : setLive(true))}>
          {live ? (
            <>
              <X size={16} />
              Close live preview
            </>
          ) : (
            <>
              <MousePointer2 size={16} />
              Explore live preview
            </>
          )}
        </button>
      </div>
    </div>
  );
}
