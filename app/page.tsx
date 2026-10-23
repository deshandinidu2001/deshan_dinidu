import { Preloader } from "@/components/motion/preloader";
import { Hero } from "@/components/sections/hero";
import { BuiltWith } from "@/components/sections/built-with";
import { ContributionMap } from "@/components/sections/contribution-map";
import { SelectedWork } from "@/components/sections/selected-work";
import { ProcessStrip } from "@/components/sections/process-strip";
import { AILab } from "@/components/sections/ai-lab";
import { Capabilities } from "@/components/sections/capabilities";
import { About } from "@/components/sections/about";
import { Notes } from "@/components/sections/notes";
import { ExperimentTeaser } from "@/components/sections/experiment-teaser";
import { Quote } from "@/components/sections/quote";
import { Contact } from "@/components/sections/contact";
import { getContributions } from "@/lib/contributions";
export const revalidate = 3600;
export default async function Home() {
  const data = await getContributions();
  return (
    <>
      <Preloader />
      <main id="main">
        <Hero />
        <BuiltWith />
        <ContributionMap data={data} />
        <SelectedWork />
        <ProcessStrip />
        <AILab />
        <Capabilities />
        <About />
        <Notes />
        <ExperimentTeaser />
        <Quote />
      </main>
      <Contact />
    </>
  );
}
