"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { finishRouteTransition } from "@/lib/route-transition";
export function RouteComplete() {
  const path = usePathname();
  useLayoutEffect(() => {
    finishRouteTransition();
  }, [path]);
  return null;
}
