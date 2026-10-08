"use client"

import { FlickeringGrid } from "@/components/ui/flickering-grid";

import { cn } from "@/lib/utils";
import FeaturedProjectCard from "@/components/home/projects/FeaturedProjectCard";
import { featuredProjects } from "@/data/featured-projects";
import { ProjectIndex } from "@/components/home/projects/ProjectIndex";
import { ClientStrip } from "@/components/home/illustration/ClientsStrip";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, Instagram } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProfileMetaTable from "@/components/home/hero/ProfileMetaTable";
import { IllustrationBackdrop } from "@/components/home/illustration/IllustrationBackdrop";
import { AboutStarfield } from "@/components/home/about/AboutStarfield";
import { CurrentlyListening } from "@/components/home/about/CurrentlyListening";
import { useCarouselSelection } from "@/hooks/use-carousel-selection";
import { SectionDivider } from "@/components/home/SectionDivider";

const illustrationSources = ["/artworks/art_irl.jpg", "/artworks/pc.webp", "/artworks/mo.webp"];

export default function Home() {
  const { setApi: setArtApi, activeIndex: activeArtIndex } = useCarouselSelection();
  return (
    <main className="">
      <header className="relative overflow-hidden">

        {/* Hero Container */}
        <div className="mx-auto max-w-[1700px] px-3 sm:px-8 py-16 z-40">
          {/* Component */}
          <div className="grid items-center justify-items-start gap-4 sm:gap-8 lg:grid-cols-2 pt-10">
            {/* Hero Content */}
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-2 text-gray-500">
                <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
                01 / I am a
              </p>
              {/* Hero Title */}
              <h1
                data-text="Software engineer who builds things that feel considered."
                className=" mb-4 pb-1 text-3xl md:text-5xl font-semibold"
              >
                Software engineer who builds things that feel considered.
              </h1>
            </div>
            <div className="w-full">
              <p className="mb-6 text-sm text-gray-700 sm:text-base md:mb-10 lg:mb-12">
                I build across systems and interfaces - and care about how both work and feel.
              </p>
              <div>
                <ProfileMetaTable />
              </div>
            </div>
          </div>
        </div>
        <FlickeringGrid
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent)] absolute inset-0 opacity-40 z-0 pointer-events-none",
          )}
          squareSize={20}
          gridGap={5}
          flickerChance={0.25}
          maxOpacity={0.4}
          color="rgb(100, 210, 255)"
        />
      </header>

      <SectionDivider animate />

      <section id="featured" className="mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
        <p className="flex items-center gap-2 text-gray-500 mb-4">
          <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
          02 / Featured Work
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>
      </section>

      <SectionDivider />

      <section id="projects" className="mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
        <p className="flex items-center gap-2 text-gray-500 mb-4">
          <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
          03 / Other
        </p>
        <ProjectIndex />
      </section>

      <SectionDivider />

      <section id="art" className="relative isolate overflow-hidden mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative z-10 flex flex-col self-center">

            <p className="flex items-center gap-2 text-gray-500 mb-4">
              <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
              04 / Art
            </p>
            <h2 className="mb-4 text-xl font-semibold md:text-3xl text-gray-800">Digital illustration</h2>
            <p className="text-sm text-gray-800 sm:text-base">
              I create character illustrations for <a href="https://www.youtube.com/@osugamearchive" target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:text-red-400">official music releases</a> for the rhythm game osu!, community projects, and events, alongside original artwork and merchandise. Feel free to reach out for character art, gaming, and music-related work.</p>
            <p className="text-sm text-gray-500 sm:text-base my-4">
              Past clients
            </p>
            <ClientStrip />

            <Button
              variant="outline"
              asChild
              className="my-4 w-fit gap-3 rounded-md border-gray-300 bg-white/90 px-4 text-gray-700 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 focus-visible:border-cyan-500 focus-visible:bg-cyan-50 focus-visible:ring-cyan-500 motion-reduce:transition-none"
            >
              <a href="https://www.instagram.com/kylerius_/" target="_blank" rel="noopener noreferrer" aria-label="View @kylerius_ on Instagram (opens in a new tab)">
                <Instagram aria-hidden="true" />
                <span>@kylerius_</span>
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="relative">
            <IllustrationBackdrop sources={illustrationSources} activeIndex={activeArtIndex} />
            <Carousel className="w-full" setApi={setArtApi}>
              <CarouselContent>
                <CarouselItem>
                  <img
                    src={illustrationSources[0]}
                    alt="Studio SIAT"
                    loading="lazy"
                    className="w-full aspect-video object-contain rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={illustrationSources[1]}
                    alt="celtix - Primordial Complex"
                    loading="lazy"
                    className="w-full aspect-video object-cover rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={illustrationSources[2]}
                    alt="Studio SIAT"
                    loading="lazy"
                    className="w-full aspect-video object-contain rounded-md"
                  />
                </CarouselItem>
                {/* <CarouselItem>
                  <img
                    src="/artworks/kagutsuchi_owc.webp"
                    alt="A.SAKA - Kagutsuchi"
                    className="w-full aspect-video object-cover rounded-md"
                  />
                </CarouselItem> */}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>
      <SectionDivider />
      <section id="about-me" className="relative isolate">
        <AboutStarfield />
        <div className="mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
        <p className="flex items-center gap-2 text-gray-500 mb-8 md:mb-12">
          <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
          05 / About me
        </p>
          <div className="grid md:grid-cols-2 items-start gap-8">
            <div className="hidden md:block min-w-0">
              <figure className="w-[90%] ml-auto">
              <img
                src="/images/45P-Scape-2026-crop.jpg"
                alt="My 45P planted aquarium in 2026"
                loading="lazy"
                className="w-full aspect-[3/2] object-cover rounded-md"
              />
              <figcaption className="mt-2 text-xs leading-relaxed text-gray-500">45P Aquascape, 2026</figcaption>
              </figure>
              <div className="w-[90%]">
                <CurrentlyListening />
              </div>
            </div>
          <div className="min-w-0">
            <img
              src="/gifs/Strawberry_flap.gif"
              alt="Celeste strawberry"
              className="h-12 w-auto"
            />
            <h2 className="mb-4 text-xl font-semibold md:text-3xl text-gray-800">Hi! I'm Kyle. I'm a software engineer based in Vancouver B.C.</h2>
            <p className="mb-4 text-gray-800 text-sm sm:text-base">
              I enjoy building products end-to-end, from the systems behind them to the
              interfaces people use. Whether that's a cloud platform, a developer tool, or
              a personal side project.
            </p>
            <p className="mb-8 text-gray-800 text-sm sm:text-base">
              Outside of software, you'll usually find me drawing, maintaining my planted aquariums, gaming, and planning my next adventure. I also enjoy running, cycling, and backpacking.
            </p>
            <figure className="hidden md:block w-[90%]">
              <img src="/gifs/jill.gif" alt="Voxel art of Jill from VA-11 Hall-A" width={1200} height={800} loading="lazy" className="w-full h-auto rounded-md" />
              <figcaption className="mt-2 text-xs leading-relaxed text-gray-500">Voxel art I made based on one of my favorite games, VA-11 Hall-A.</figcaption>
            </figure>
            <Carousel className="w-full block md:hidden">
              <CarouselContent>
                <CarouselItem>
                  <figure className="w-[90%] mx-auto">
                    <img src="/gifs/jill.gif" alt="Voxel art of Jill from VA-11 Hall-A" width={1200} height={800} loading="lazy" className="w-full h-auto rounded-md" />
                    <figcaption className="mt-2 text-xs leading-relaxed text-gray-500">Voxel art I made based on one of my favorite games, VA-11 Hall-A.</figcaption>
                  </figure>
                </CarouselItem>
                <CarouselItem>
                  <figure className="w-[90%] mx-auto">
                  <img
                    src="/images/45P-Scape-2026-crop.jpg"
                    alt="My 45P planted aquarium in 2026"
                    loading="lazy"
                    className="w-full aspect-[3/2] object-cover rounded-md"
                  />
                  <figcaption className="mt-2 text-xs leading-relaxed text-gray-500">45P Aquascape, 2026</figcaption>
                  </figure>
                </CarouselItem>
                <CarouselItem>
                  <div className="mx-auto w-[82%] max-w-md">
                    <CurrentlyListening />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          </div>
        </div>
      </section>

    </main >
  );
}
