"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { beginRouteTransition } from "@/lib/route-transition";
export function TransitionLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          typeof href !== "string" ||
          href.includes("#") ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          !document.startViewTransition
        )
          return;
        e.preventDefault();
        beginRouteTransition(() => {
          router.push(href);
        });
      }}
    />
  );
}
