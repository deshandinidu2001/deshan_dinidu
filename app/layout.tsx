import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Cursor } from "@/components/motion/cursor";
import { Navigation } from "@/components/ui/navigation";
import { SignalRail } from "@/components/motion/signal-rail";
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site";
import { RouteComplete } from "@/components/motion/route-complete";
const displayFont = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space",
  weight: "300 700",
  display: "swap",
});
const monoFont = localFont({
  src: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
  variable: "--font-plex",
  weight: "400",
  display: "swap",
});
const scriptFont = localFont({
  src: "../node_modules/@fontsource/caveat/files/caveat-latin-400-normal.woff2",
  variable: "--font-script",
  weight: "400",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: { default: siteCopy.title, template: "%s — Deshan Dinidu" },
  description: siteCopy.description,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: profile.name,
    title: siteCopy.title,
    description: siteCopy.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteCopy.title,
    description: siteCopy.description,
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "dark light",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Full Stack Developer and AI Developer",
    sameAs: [profile.github, ...(profile.linkedin ? [profile.linkedin] : [])],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? { url: process.env.NEXT_PUBLIC_SITE_URL }
      : {}),
  };
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${displayFont.variable} ${monoFont.variable} ${scriptFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('signal-theme')||'dark'}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {siteCopy.ui.skip}
        </a>
        <MotionProvider>
          <Navigation />
          {children}
          <SignalRail />
          <Cursor />
          <RouteComplete />
        </MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
