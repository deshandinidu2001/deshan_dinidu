import { siteCopy } from "@/data/site";
import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found section-shell">
      <span className="mono">ERROR / 404</span>
      <h1>{siteCopy.ui.notFound}</h1>
      <Link href="/" className="button button-primary">
        {siteCopy.ui.home}
      </Link>
    </main>
  );
}
