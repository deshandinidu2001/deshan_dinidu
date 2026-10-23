import { ArrowUpRight } from "lucide-react";
import { notes } from "@/data/notes";
import { siteCopy } from "@/data/site";
import { TransitionLink } from "@/components/ui/transition-link";
import { Reveal } from "@/components/motion/reveal";
export function Notes() {
  return (
    <section id="notes" className="notes-section section-shell">
      <Reveal>
        <div className="section-kicker mono">
          <span>{siteCopy.notes.label}</span>
          <span>{siteCopy.notes.notebook}</span>
        </div>
        <div className="section-heading-row">
          <h2 className="display-heading" data-reveal>
            {siteCopy.notes.title}
          </h2>
          <p>{siteCopy.notes.description}</p>
        </div>
        <div className="notes-grid">
          {notes.map((note, i) => (
            <TransitionLink
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="note-card"
            >
              <div className="note-illustration" aria-hidden="true">
                {i === 0 ? (
                  <>
                    <span className="note-flow n1" />
                    <span className="note-flow n2" />
                    <span className="note-flow n3" />
                    <span className="note-wire" />
                  </>
                ) : (
                  <>
                    <span className="note-bracket">[</span>
                    <span className="note-token">?</span>
                    <span className="note-bracket">]</span>
                  </>
                )}
              </div>
              <div className="note-top mono">
                <span>{note.category}</span>
                <span>{siteCopy.notes.draft}</span>
              </div>
              <h3>{note.title}</h3>
              <p>{note.summary}</p>
              <span className="note-link mono">
                {siteCopy.notes.read}
                <ArrowUpRight size={18} />
              </span>
            </TransitionLink>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
