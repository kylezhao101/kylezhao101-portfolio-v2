"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface SidebarLink {
  name: string;
  href: string;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

export default function Sidebar({
  sidebarData,
}: {
  sidebarData: SidebarSection[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "visible";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed top-14 z-20 h-10 w-full border-b bg-white/10 px-5 backdrop-blur lg:hidden"
      >
        <span className="flex text-sm items-center gap-x-4">
          <ChevronRight
            style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
            size={16}
          />
          Case studies
        </span>
      </button>

      <div
        className={`fixed left-0 top-14 z-10 h-[calc(100dvh-3.5rem)] w-full pt-14 transform bg-white transition-transform duration-500 ease-in-out lg:hidden ${isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {sidebarData.map((section) => (
          <div key={section.title} className="ml-5 mb-4">
            <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li className="mb-2 pl-5" key={link.name}>
                  <Link
                    className="text-sm opacity-75 hover:opacity-100"
                    href={link.href}
                    onClick={closeSidebar}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hidden lg:block min-w-fit sticky top-28 h-screen w-60">
        {sidebarData.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li className="mb-2 pl-4" key={link.name}>
                  <Link
                    className="text-sm opacity-75 hover:opacity-100"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
