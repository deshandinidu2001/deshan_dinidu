import { Hero } from "@/components/hero/Hero";
import { BuiltWith } from "@/components/sections/built-with";
import { SelectedWork } from "@/components/sections/selected-work";
import { ProcessStrip } from "@/components/sections/process-strip";
import { EngineeringApproach } from "@/components/sections/engineering-approach";
import { Capabilities } from "@/components/sections/capabilities";
import { About } from "@/components/sections/about";
import { CuriosityBreak } from "@/components/sections/curiosity-break";
import { Contact } from "@/components/sections/contact";
import { HomeIntro } from "@/components/motion/home-intro";
import { SketchThought } from "@/components/sections/sketch-thought";
export default function Home() {
  return (
    <>
      <HomeIntro />
      <main id="main">
        <Hero />
        <BuiltWith />
        <SelectedWork />
        <ProcessStrip />
        <EngineeringApproach />
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
