"use client";
import { ArrowUpRight } from "lucide-react";
import { DrawnSketch } from "@/components/ui/drawn-sketch";
import BlurText from "@/components/react-bits/BlurText";
export function CapabilitiesPrelude() {
  return (
    <div className="capabilities-prelude">
      <div className="capabilities-prelude-copy">
        <span className="mono">What I do</span>
        <h2>
          <BlurText text="From the first sketch" />
          <span className="muted">
            <BlurText text="to a working system." />
          </span>
        </h2>
        <p>
          Tell me what needs to work. I’ll help connect the interface, the code,
          and the systems behind it.
        </p>
        <p className="script">A rough sketch is a good place to begin.</p>
        <a href="#contact">
          Have something in mind?
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="capabilities-doodle capabilities-doodle-left">
        <DrawnSketch kind="idea" />
        <span className="mono">A question worth asking</span>
      </div>
      <div className="capabilities-doodle capabilities-doodle-right">
        <DrawnSketch kind="system" />
        <span className="script">Let’s make it work.</span>
      </div>
      <span className="capabilities-scroll-note mono">
        The connections I can help with ↓
      </span>
    </div>
  );
}
