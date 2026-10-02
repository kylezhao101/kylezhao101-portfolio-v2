"use client"

import { Separator } from "@/components/ui/separator";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

import { cn } from "@/lib/utils";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import { featuredProjects } from "@/data/featured-projects";
import { ProjectIndex } from "@/components/ProjectIndex";
import { ClientStrip } from "@/components/ClientsStrip";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, Instagram } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CurrentlyListening } from "@/components/CurrentlyListening";
import ProfileMetaTable from '../components/ProfileMetaTable';
import { IllustrationBackdrop } from "@/components/IllustrationBackdrop";
import { useCarouselSelection } from "@/hooks/use-carousel-selection";

const illustrationSources = ["/artworks/art_irl.jpg", "/artworks/pc.webp", "/artworks/mo.webp"];

function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1700px] px-3 sm:px-8">
      <div className="flex h-3 items-center gap-2">
        <span className="relative h-[9px] w-[9px] shrink-0">
          <span className="absolute left-0 top-1 h-px w-full bg-gray-300" />
          <span className="absolute left-1 top-0 h-full w-px bg-gray-300" />
        </span>
        <Separator className="w-auto flex-1 bg-gray-300" />
        <span className="relative h-[9px] w-[9px] shrink-0">
          <span className="absolute left-0 top-1 h-px w-full bg-gray-300" />
          <span className="absolute left-1 top-0 h-full w-px bg-gray-300" />
        </span>
      </div>
    </div>
  );
}

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

      <SectionDivider />

      <section className="mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
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

      <section className="mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
        <p className="flex items-center gap-2 text-gray-500 mb-4">
          <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
          03 / Other
        </p>
        <ProjectIndex />
      </section>

      <SectionDivider />

      <section className="relative isolate overflow-hidden mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
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
                    className="w-full aspect-video object-contain rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={illustrationSources[1]}
                    alt="celtix - Primordial Complex"
                    className="w-full aspect-video object-cover rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={illustrationSources[2]}
                    alt="Studio SIAT"
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
      <section className="mx-auto max-w-[1700px] px-3 sm:px-8 py-4 md:py-8">
        <p className="flex items-center gap-2 text-gray-500 mb-4">
          <span aria-hidden="true" className="h-[0.5em] w-[0.5em] shrink-0 bg-cyan-500" />
          05 / About me
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="hidden md:block">
            <video
              src="/videos/pygmy-sparkling.mp4"
              autoPlay
              loop
              muted
              className="w-full aspect-video object-cover rounded-md"
            />
            <CurrentlyListening /></div>
          <div>
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
            <p className="mb-10 text-gray-800 text-sm sm:text-base">
              Outside of software, you'll usually find me drawing, maintaining my planted aquariums, gaming, and planning my next adventure. I also enjoy running, cycling, and backpacking.
            </p>
            <img src="/gifs/jill.gif" alt="jill" className="w-full rounded-md max-h-96 hidden md:block object-cover" />
            <Carousel className="w-full block md:hidden">
              <CarouselContent>
                <CarouselItem>
                  <img src="/gifs/jill.gif" alt="jill" className="w-full rounded-md max-h-96 object-cover" />
                </CarouselItem>
                <CarouselItem>
                  <video
                    src="/videos/pygmy-sparkling.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full aspect-video object-cover rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <CurrentlyListening />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

        </div>
      </section>

    </main >
  );
}
