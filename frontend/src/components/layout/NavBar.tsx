'use client'

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GithubIcon } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { config } from '@/config/config';
import { motion } from 'motion/react';

export default function Navbar() {
  const [showStickyNav, setShowStickyNav] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/';

  // Show sticky navbar after scrolling past the initial navbar
  useEffect(() => {
    if (!isHome) {
      setShowStickyNav(false);
      return;
    }

    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 120);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome]);

  const NavContent = () => (
    <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between px-3 sm:px-8">
      <Link className="flex items-center gap-x-2 md:hidden" href="/" aria-label="Kyle Zhao home">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/kylezhao101.png" />
          <AvatarFallback>KZ</AvatarFallback>
        </Avatar>
        <span className="text-sm font-semibold">Kyle.z</span>
      </Link>

      <ul className="hidden md:flex items-center">
        <li className="mr-6 group">
          <Link className="flex items-center space-x-4" href="/">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/kylezhao101.png" />
              <AvatarFallback>KZ</AvatarFallback>
            </Avatar>

            <span className="text-sm font-semibold group-hover:text-cyan-500 transition-colors duration-200">
              Kyle.z
            </span>
          </Link>
        </li>

        <li>
          <ul className="flex items-center group">
            <li>
              <Link
                href="/content/experience/bcchr"
                className="block pr-6 py-4 text-sm transition-opacity duration-400 group-hover:opacity-30 hover:!opacity-100"
              >
                Experience
              </Link>
            </li>

            <li>
              <Link
                href="/content/projects/auto-media-publisher"
                className="block pr-6 py-4 text-sm transition-opacity duration-400 group-hover:opacity-30 hover:!opacity-100"
              >
                Projects
              </Link>
            </li>

            <li>
              <Link
                href="/content/about-this-site/dynamic-generation"
                className="block pr-6 py-4 text-sm transition-opacity duration-400 group-hover:opacity-30 hover:!opacity-100"
              >
                About this site
              </Link>
            </li>

            <li>
              <a
                href="#contact"
                onClick={() => {
                  window.dispatchEvent(new Event("contact-nudge"));
                }}
                className="block pr-6 py-4 text-sm transition-opacity duration-400 group-hover:opacity-30 hover:!opacity-100"
              >
                Contact
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <ul className="flex items-center gap-3 md:gap-6">
        <li>
          <ResumeButton />
        </li>

        <li>
          <Link
            className="text-sm"
            href="https://github.com/kylezhao101"
          >
            <motion.div
              whileHover={{
                rotate: 12,
                scale: 1.10,
              }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 10,
              }}
            >
              <GithubIcon />
            </motion.div>
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {/* ---------------------------------------------------------
          HOME: Initial navbar
          Transparent, no border, sits directly over the hero/grid.
         --------------------------------------------------------- */}
      {isHome && (
        <nav className="absolute top-0 z-30 h-14 w-full bg-transparent">
          <NavContent />
        </nav>
      )}

      {/* ---------------------------------------------------------
          HOME: Sticky navbar
          Appears once we've scrolled down.
         --------------------------------------------------------- */}
      {isHome && (
        <motion.nav
          initial={false}
          animate={{
            y: showStickyNav ? 0 : -56,
            opacity: showStickyNav ? 1 : 0,
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed top-0 z-30 h-14 w-full
            border-b
            bg-white bg-opacity-10
            backdrop-blur
          "
          style={{
            pointerEvents: showStickyNav ? 'auto' : 'none',
          }}
        >
          <NavContent />
        </motion.nav>
      )}

      {/* ---------------------------------------------------------
          OTHER PAGES: Original fixed navbar
         --------------------------------------------------------- */}
      {!isHome && (
        <nav
          className="
            fixed top-0 z-30 h-14 w-full
            border-b
            bg-white bg-opacity-10
            backdrop-blur
          "
        >
          <NavContent />
        </nav>
      )}

      <nav aria-label="Mobile navigation" className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 rounded-full border border-gray-200 bg-white p-1.5 shadow-lg shadow-black/10 backdrop-blur md:hidden">
        <ul className="flex items-center gap-0.5 whitespace-nowrap">
          <li>
            <Link href="/" aria-current={isHome ? 'page' : undefined} className={`flex h-9 items-center justify-center rounded-full px-3 text-xs font-semibold transition-colors ${isHome ? 'text-gray-900' : 'text-gray-800 hover:text-cyan-700'}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/content/experience/bcchr" aria-current={pathname.startsWith('/content/experience') ? 'page' : undefined} className={`flex h-9 items-center justify-center rounded-full px-2.5 text-xs transition-colors ${pathname.startsWith('/content/experience') ? 'text-gray-900' : 'text-gray-600 hover:text-cyan-700'}`}>
              Experience
            </Link>
          </li>
          <li>
            <Link href="/content/projects/auto-media-publisher" aria-current={pathname.startsWith('/content/projects') ? 'page' : undefined} className={`flex h-9 items-center justify-center rounded-full px-2.5 text-xs transition-colors ${pathname.startsWith('/content/projects') ? 'text-gray-900' : 'text-gray-600 hover:text-cyan-700'}`}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#contact" onClick={() => window.dispatchEvent(new Event('contact-nudge'))} className="flex h-9 items-center justify-center rounded-full bg-gray-100 px-3 text-xs text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 [@media(hover:hover)]:hover:bg-gray-200">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      {!isHome && <div className="hidden h-14 md:block" />}
    </>
  );
}
