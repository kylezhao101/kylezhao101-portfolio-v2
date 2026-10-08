"use client";

import { useEffect, useState } from "react";

export function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => heading !== null);
    if (!headings.length) return;

    const updateActiveHeading = () => {
      const midpoint = window.innerHeight / 2;
      let current = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > midpoint + 1) break;
        current = heading;
      }
      setActiveId(current.id);
    };

    let observer: IntersectionObserver | undefined;
    const observeHeadings = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(updateActiveHeading, {
        rootMargin: `-${window.innerHeight / 2}px 0px 0px 0px`,
        threshold: [0, 1],
      });
      headings.forEach((heading) => observer!.observe(heading));
      updateActiveHeading();
    };
    observeHeadings();
    window.addEventListener("resize", observeHeadings);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeHeadings);
    };
  }, [ids]);

  return activeId;
}
