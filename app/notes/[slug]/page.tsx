import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { notes } from "@/data/notes";
import { siteCopy } from "@/data/site";
import { TransitionLink } from "@/components/ui/transition-link";
export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return {
    title: note?.title || "Note",
    description: note?.summary,
    robots: { index: false, follow: true },
  };
}
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();
  return (
    <main id="main" className="note-page section-shell">
      <TransitionLink href="/#notes" className="text-link">
        <ArrowLeft size={16} />
        Field notes
      </TransitionLink>
      <article>
        <div className="mono small-label">
          {note.category} / {siteCopy.notes.draft}
        </div>
        <h1>{note.title}</h1>
        <p className="note-deck">{note.summary}</p>
        <div className="prose">
          <MDXRemote source={note.body} />
        </div>
      </article>
    </main>
  );
}
