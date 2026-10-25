import { Hero } from "@/components/hero/Hero";
import { BuiltWith } from "@/components/sections/built-with";
import { ContributionMap } from "@/components/sections/contribution-map";
import { SelectedWork } from "@/components/sections/selected-work";
import { ProcessStrip } from "@/components/sections/process-strip";
import { AILab } from "@/components/sections/ai-lab";
import { Capabilities } from "@/components/sections/capabilities";
import { About } from "@/components/sections/about";
import { CuriosityBreak } from "@/components/sections/curiosity-break";
import { Contact } from "@/components/sections/contact";
import { getContributions } from "@/lib/contributions";
import { HomeIntro } from "@/components/motion/home-intro";
import { SketchThought } from "@/components/sections/sketch-thought";
export const revalidate = 3600;
export default async function Home() {
  const data = await getContributions();
  return (
    <>
      <HomeIntro />
      <main id="main">
        <Hero />
        <BuiltWith />
        <ContributionMap data={data} />
        <SelectedWork />
        <ProcessStrip />
        <AILab />
        <Capabilities />
        <SketchThought>
          <About />
        </SketchThought>
        <CuriosityBreak />
      </main>
      <Contact />
    </>
  );
}
