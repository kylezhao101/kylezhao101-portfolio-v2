"use client";

import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { useActiveHeading } from "@/hooks/use-active-heading";

interface Heading {
  text: string;
  depth: number;
  id: string;
}

export default function OnThisPage({ headings }: { headings: Heading[] }) {
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);
  const activeId = useActiveHeading(ids);

  if (!headings.length) return null;

  return (
    <aside className="pl-10 hidden xl:block min-w-64 sticky top-28 h-screen">
      <nav aria-label="On this page">
        <h2 className="mb-3 text-sm font-semibold">On this page</h2>
        <Separator className="mb-3" />
        <ul>
          {headings.map(({ text, depth, id }) => {
            const active = activeId === id;
            return (
              <li key={id} className="mb-2 text-sm" style={{ marginLeft: (depth - 1) * 16 }}>
                <a
                  href={`#${id}`}
                  aria-current={active ? "location" : undefined}
                  className={`relative block ${active ? "text-black" : "text-gray-500 hover:text-black"}`}
                >
                  <span aria-hidden="true" className={`absolute -left-3.5 top-0 ${active ? "visible" : "invisible"}`}>&gt;</span>
                  <span>{text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
