"use client";

import { useEffect, useState } from "react";

export function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => heading !== null);
    if (!headings.length) return;

    let trackingOffset = 0;
    const updateActiveHeading = () => {
      let current = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > trackingOffset + 1) break;
        current = heading;
      }
      setActiveId(current.id);
    };

    let observer: IntersectionObserver | undefined;
    const observeHeadings = () => {
      observer?.disconnect();
      // Match the position where the browser places clicked heading anchors.
      trackingOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      observer = new IntersectionObserver(updateActiveHeading, {
        rootMargin: `-${trackingOffset}px 0px 0px 0px`,
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
