import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { TransitionLink } from "@/components/ui/transition-link";
import { ParticlePlayground } from "@/components/experiments/particle-playground";
import { PixelTitle } from "@/components/experiments/pixel-title";
import { siteCopy } from "@/data/site";
export const metadata: Metadata = {
  title: "Signal / Play",
  description:
    "An interactive particle field. Move, connect, and play with the signal.",
};
export default function Experiments() {
  return (
    <main id="main" className="experiment-page section-shell">
      <TransitionLink href="/" className="text-link">
        <ArrowLeft size={15} />
        {siteCopy.experiments.back}
      </TransitionLink>
      <div className="experiment-header">
        <PixelTitle />
        <p>{siteCopy.experiments.intro}</p>
      </div>
      <ParticlePlayground />
    </main>
  );
}
