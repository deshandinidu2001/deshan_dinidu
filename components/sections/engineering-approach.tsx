"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Layers,
  Workflow,
} from "lucide-react";
import BlurText from "@/components/react-bits/BlurText";

const examples = [
  {
    name: "Connected experiences",
    icon: Layers,
    project: "SpectraLeaf",
    discipline: "Web + mobile",
    title: "One system, wherever you use it.",
    problem:
      "Tea fermentation data needs to be readable from both a web dashboard and a mobile app.",
    approach:
      "I work across the software platform, connecting Next.js and React Native interfaces to a shared Node.js backend and DynamoDB data store.",
    flow: ["Web + mobile", "Express API", "DynamoDB"],
    takeaway: "Design the experience around the same underlying data.",
    note: "A team research prototype at the University of Peradeniya.",
    href: "/work/spectraleaf",
  },
  {
    name: "Practical workflows",
    icon: Workflow,
    project: "RAN Technology",
    discipline: "Full-stack development",
    title: "Make the next step feel obvious.",
    problem:
      "Shopping for a computer and booking a repair involve different steps, but need to feel part of one service.",
    approach:
      "I connect product discovery, carts, orders, and repair bookings through a React interface, an Express API, and Supabase, with administration for the shop behind it.",
    flow: ["Customer action", "Express API", "Shop workflow"],
    takeaway: "Follow a task all the way from the customer to the admin.",
    note: "A computer-products storefront and repair-services platform.",
    href: "/work/ran-technology",
  },
  {
    name: "AI with a purpose",
    icon: Braces,
    project: "Smartloan BLMS",
    discipline: "Applied AI",
    title: "Put predictions in context.",
    problem:
      "An eligibility prediction is useful only when it fits into the wider loan application and review process.",
    approach:
      "I connect a React loan-management interface and Express backend to a separate Python and Flask prediction service, alongside customer records, approvals, and repayments.",
    flow: ["Loan application", "Prediction service", "Officer review"],
    takeaway: "Give a model a clear role inside a working application.",
    note: "A local prototype with experimental model outputs.",
    href: "/work/smartloan",
  },
];

export function EngineeringApproach() {
  const [active, setActive] = useState(0);
  const example = examples[active];

  return (
    <section
      id="approach"
      className="approach-section section-shell"
      aria-labelledby="approach-heading"
    >
      <div className="approach-intro">
        <span className="mono">Engineering in practice</span>
        <h2 id="approach-heading">
          <BlurText text="The thinking behind the build." />
        </h2>
        <p>
          Good software connects the details. Here’s how I bring interfaces,
          backend logic, and data together across my projects.
        </p>
        <p className="script">Follow the problem. Connect the pieces.</p>
        <div
          className="approach-choices"
          role="group"
          aria-label="Explore my engineering approach"
        >
          {examples.map(({ name, icon: Icon }, index) => (
            <button
              type="button"
              key={name}
              aria-pressed={active === index}
              aria-controls="approach-example"
              onClick={() => setActive(index)}
            >
              <Icon size={18} aria-hidden="true" />
              {name}
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <div
        id="approach-example"
        className="approach-example"
        aria-live="polite"
      >
        <div className="approach-example-top mono">
          <span>
            <i aria-hidden="true" />
            {example.project}
          </span>
          <span>{example.discipline}</span>
        </div>
        <div className="approach-example-body">
          <h3>{example.title}</h3>
          <dl className="approach-notes">
            <div>
              <dt className="mono">The challenge</dt>
              <dd>{example.problem}</dd>
            </div>
            <div>
              <dt className="mono">How I connect it</dt>
              <dd>{example.approach}</dd>
            </div>
          </dl>
          <ol
            className="approach-flow"
            aria-label={`${example.project} workflow`}
          >
            {example.flow.map((step, index) => (
              <li key={step}>
                <span>{step}</span>
                {index < example.flow.length - 1 && (
                  <ArrowRight size={15} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
          <p className="approach-takeaway">{example.takeaway}</p>
          <div className="approach-example-footer">
            <Link href={example.href}>
              Explore {example.project}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <p>{example.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
