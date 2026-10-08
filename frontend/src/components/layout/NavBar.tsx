'use client'

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GithubIcon, MenuIcon, XIcon } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export default function Navbar() {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isBrowseMenuOpen, setIsBrowseMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const pathname = usePathname();
  const isHome = pathname === '/';

  const browseSections = [
    {
      title: 'experience',
      links: [
        { label: 'BC Children’s Hospital Research Institute', href: '/content/experience/bcchr' },
        { label: 'Moment Energy', href: '/content/experience/moment-energy' },
      ],
    },
    {
      title: 'projects',
      links: [
        { label: 'Auto Media Publisher', href: '/content/projects/auto-media-publisher' },
      ],
    },
    {
      title: 'about this site',
      links: [
        { label: 'Dynamic generation', href: '/content/about-this-site/dynamic-generation' },
      ],
    },
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isBrowseMenuOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isBrowseMenuOpen]);

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

  const navContent = (
    <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between px-3 sm:px-8">
      <div className="flex items-center gap-3 md:gap-6 md:hidden">
        <button
          type="button"
          aria-label={isBrowseMenuOpen ? 'Close browse menu' : 'Open browse menu'}
          aria-expanded={isBrowseMenuOpen}
          aria-controls="mobile-browse-menu"
          onClick={() => setIsBrowseMenuOpen((open) => !open)}
          className="relative flex h-9 w-5 items-center justify-start rounded-md bg-transparent text-gray-800 [-webkit-tap-highlight-color:transparent] before:absolute before:-inset-x-3 before:-inset-y-1 before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <MenuIcon aria-hidden="true" className="-translate-x-0.5" size={20} />
        </button>
        <Link className="flex items-center gap-x-2" href="/" aria-label="Kyle Zhao home">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/kylezhao101.png" />
            <AvatarFallback>KZ</AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold">Kyle.z</span>
        </Link>
      </div>

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
          {navContent}
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
          {navContent}
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
          {navContent}
        </nav>
      )}

      <AnimatePresence>
        {isBrowseMenuOpen && (
          <motion.button
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            type="button"
            aria-label="Close browse menu"
            onClick={() => setIsBrowseMenuOpen(false)}
            className="fixed inset-x-0 bottom-0 top-14 z-[45] bg-black/30 md:hidden"
          />
        )}
        {isBrowseMenuOpen && (
          <motion.aside
            key="case-study-drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            id="mobile-browse-menu"
            aria-label="Browse portfolio content"
            className="fixed bottom-0 left-0 top-14 z-50 w-[min(20rem,calc(100vw-2rem))] overflow-y-auto border-r border-gray-200 bg-white px-5 pb-6 pt-4 shadow-xl md:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
                kylezhao101.com
              </h2>
              <button
                type="button"
                aria-label="Close browse menu"
                onClick={() => setIsBrowseMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <XIcon aria-hidden="true" size={18} />
              </button>
            </div>
            <nav>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Case studies</h3>
              {browseSections.map((section) => (
                <section key={section.title} className="mb-4">
                  <h4 className="mb-1 text-xs font-semibold text-gray-500">
                    {section.title}
                  </h4>
                  <ul>
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsBrowseMenuOpen(false)}
                          aria-current={pathname === link.href ? 'page' : undefined}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors ${pathname === link.href ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              <section className="border-t border-gray-200 pt-3">
                <h3 className="mb-2 text-sm font-semibold text-gray-900">Homepage</h3>
                <ul>
                  <li>
                    <Link href="/#about-me" onClick={() => setIsBrowseMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      About me
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contact" onClick={() => {
                      setIsBrowseMenuOpen(false);
                      window.dispatchEvent(new Event('contact-nudge'));
                    }} className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      Contact
                    </Link>
                  </li>
                </ul>
              </section>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {!isHome && <div className="hidden h-14 md:block" />}
    </>
  );
}
