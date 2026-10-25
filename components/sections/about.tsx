import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { DrawnSketch } from "@/components/ui/drawn-sketch";
export function About() {
  return (
    <section id="about" className="profile-section section-shell">
      <div className="profile-portrait">
        <Image
          src="/images/Profile.jpg"
          alt="Illustrated portrait of Deshan Dinidu"
          width={460}
          height={460}
          sizes="(min-width:1024px) 32vw, (min-width:768px) 42vw, 90vw"
        />
        <p className="script profile-photo-note">
          The person behind the projects.
        </p>
        <div className="profile-rocket-landing" aria-hidden="true">
          <DrawnSketch kind="plane" showTrail={false} />
        </div>
      </div>
      <div className="profile-story">
        <span className="mono profile-intro">A little about me</span>
        <h2>
          Curiosity is where
          <br />I start. Building is
          <br />
          how I learn.
        </h2>
        <p>{profile.about}</p>
        <div className="profile-qualification">
          <GraduationCap size={25} strokeWidth={1.4} aria-hidden="true" />
          <div>
            <span className="mono">
              Undergraduate · {profile.education.stage}
            </span>
            <h3>{profile.education.degree}</h3>
            <p>
              {profile.education.school}
              <br />
              {profile.education.department}
            </p>
          </div>
        </div>
        <div className="profile-focus">
          <span>Web interfaces</span>
          <span>Mobile applications</span>
          <span>Backend systems</span>
          <span>AI exploration</span>
        </div>
        <a
          className="text-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          See what I’m building <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
