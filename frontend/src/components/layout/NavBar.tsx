'use client'
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from 'react';
import { MenuIcon, GithubIcon } from 'lucide-react';
import { Button } from '../ui/button';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      body.style.overflow = 'visible';
    };
  }, [isMobileMenuOpen]);

  const placeholderLinks = Array.from({ length: 30 }, (_, index) => ({
    href: `#item${index + 1}`,
    label: `Placeholder Item ${index + 1}`
  }));

  return (
    <>
      <nav className="w-full h-14 z-30 fixed border-b px-5 bg-white bg-opacity-10 backdrop-blur">
        <div className='flex h-full justify-between md:max-w-screen-2xl md:mx-auto'>

          <button className="md:hidden flex items-center gap-x-2" onClick={toggleMobileMenu}>
            <MenuIcon></MenuIcon>
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
                <span className="text-sm font-semibold group-hover:text-cyan-500 transition-colors duration-200 ">Kyle.z</span>
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
                    href="/content/about-this-site/dynamic-generation"
                    className="block pr-6 py-4 text-sm transition-opacity duration-400 group-hover:opacity-30 hover:!opacity-100"
                  >
                    About this site
                  </Link>
                </li>

                <li>
                  <Link
                    href="#contact"
                    className="block pr-6 py-4 text-sm transition-opacity duration-400 group-hover:opacity-30 hover:!opacity-100"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className='flex space-x-6 items-center'>
            <li>
              <Button variant="default" size="sm" asChild className='rounded-full px-4 bg-gray-800'>
                <Link href="https://drive.google.com/file/d/1FpxQdZE-Wm5pSH9rOnXge2l8yihFaSTd/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Resume
                </Link>
              </Button>
            </li>
            <li>
              <Link className="text-sm" href="https://github.com/kylezhao101">
                <GithubIcon></GithubIcon>
              </Link>
            </li>
          </ul>
        </div>
      </nav >

      <div className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMobileMenu}></div>

      <div className={`transform top-0 left-0 min-w-64 bg-white p-5 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-40 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className='flex flex-col gap-2'>
          <li className="mb-2">
            <Link onClick={toggleMobileMenu} href="/">
              <span className="font-semibold">/Kylezhao101-api</span>
            </Link>
          </li>
          <li>
            <Link onClick={toggleMobileMenu} href="/content/experience/bcchr">
              Experience
            </Link>
          </li>
          <li>
            <Link onClick={toggleMobileMenu} href="/content/about-this-site/dynamic-generation">
              About this site
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
