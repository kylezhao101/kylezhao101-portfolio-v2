'use client'

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MenuIcon, GithubIcon } from 'lucide-react';
import ResumeButton from './ResumeButton';
import { config } from '@/config/config';
import { motion } from 'motion/react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile menu body scroll lock
  useEffect(() => {
    const body = document.body;

    if (isMobileMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }

    return () => {
      body.style.overflow = 'visible';
    };
  }, [isMobileMenuOpen]);

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
      <button
        className="md:hidden flex items-center gap-x-2"
        onClick={toggleMobileMenu}
      >
        <MenuIcon />

        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/kylezhao101.png" />
          <AvatarFallback>KZ</AvatarFallback>
        </Avatar>
      </button>

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

      <ul className="flex space-x-6 items-center">
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

      {/* Mobile menu overlay */}
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-60 z-40
          transition-opacity
          ${isMobileMenuOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
          }
        `}
        onClick={toggleMobileMenu}
      />

      {/* Mobile menu */}
      <div
        className={`
          transform top-0 left-0 min-w-64
          bg-white p-5 fixed h-full overflow-auto
          ease-in-out transition-all duration-300 z-40
          ${isMobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          }
        `}
      >
        <ul className="flex flex-col gap-2">
          <li className="mb-2">
            <Link onClick={toggleMobileMenu} href="/">
              <span className="font-semibold">
                /Kylezhao101
              </span>
            </Link>
          </li>

          <li>
            <Link
              onClick={toggleMobileMenu}
              href="/content/experience/bcchr"
            >
              Experience
            </Link>
          </li>

          <li>
            <Link
              onClick={toggleMobileMenu}
              href="/content/projects/auto-media-publisher"
            >
              Projects
            </Link>
          </li>

          <li>
            <Link
              onClick={toggleMobileMenu}
              href="/content/about-this-site/dynamic-generation"
            >
              About this site
            </Link>
          </li>

          <li>
            <Link
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </Link>
          </li>
        </ul>
      </div>
      {!isHome && <div className="h-14" />}
    </>
  );
}