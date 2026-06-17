"use client"

import { Separator } from "@/components/ui/separator";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

import { cn } from "@/lib/utils";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import { featuredProjects } from "@/data/featured-projects";
import { ProjectIndex } from "@/components/ProjectIndex";
import { ClientStrip } from "@/components/ClientsStrip";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CurrentlyListening } from "@/components/CurrentlyListening";
import ProfileMetaTable from '../components/ProfileMetaTable';

export default function Home() {
  return (
    <main className="">
      <header className="relative overflow-hidden">

        {/* Hero Container */}
        <div className="mx-auto max-w-screen-2xl px-2 sm:px-8 py-16 z-40">
          {/* Component */}
          <div className="grid items-center justify-items-start gap-4 sm:gap-8 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="flex flex-col gap-4">
              <p className="text-gray-500">
                01 / I am a
              </p>
              {/* Hero Title */}
              <h1 className="mb-4 text-3xl font-semibold md:text-5xl text-gray-800 ">
                Software engineer
                who builds things
                that feel considered.
              </h1>
            </div>
            <div>
              <p className="mb-6 text-sm text-gray-700 sm:text-base md:mb-10 lg:mb-12">
                I build products from systems architecture to the interfaces - and I care about how both feel.
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

      <Separator />
      <section className="mx-auto max-w-screen-2xl px-2 sm:px-8 py-4 md:py-8">
        <p className="text-gray-500 mb-4">
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

      <Separator />
      <section className="mx-auto max-w-screen-2xl px-2 sm:px-8 py-4 md:py-8">
        <p className="text-gray-500 mb-4">
          03 / Other
        </p>
        <ProjectIndex />
      </section>


      <Separator />
      <section className="mx-auto max-w-screen-2xl px-2 sm:px-8 py-4 md:py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col self-center ">

            <p className="text-gray-500 mb-4">
              04 / Illustration
            </p>
            <h2 className="mb-4 text-xl font-semibold md:text-3xl text-gray-800">Digital illustration & character art</h2>
            <p className="text-sm text-gray-800 sm:text-base">
              Active in projects for osu! music releases and tabling events with my original merch.
              If you're interested in character art, games, or music-adjacent work feel free to reach out!</p>
            <p className="text-sm text-gray-500 sm:text-base my-4">
              Past clients
            </p>
            <ClientStrip />

            <Button variant="outline" size="sm" asChild className="my-4 w-min">
              <a href="https://www.instagram.com/kylerius_/" target="_blank" rel="noopener noreferrer">
                instagram/kylerius
                <ArrowUpRightIcon />
              </a>
            </Button>
          </div>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <img
                    src="/artworks/pc.webp"
                    alt="celtix - Primordial Complex"
                    className="w-full aspect-video object-cover rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="/artworks/mo.webp"
                    alt="Studio SIAT"
                    className="w-full aspect-video object-contain rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="/artworks/kagutsuchi_owc.webp"
                    alt="A.SAKA - Kagutsuchi"
                    className="w-full aspect-video object-cover rounded-md"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>
      <Separator />
      <section className="mx-auto max-w-screen-2xl px-2 sm:px-8 py-4 md:py-8">
        <p className="text-gray-500 mb-4">
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
            <p className="mb-4 text-gray-800">
              I enjoy building products that sit at the intersection of systems, design, and
              user experience - whether that's a cloud platform, a developer tool, or a
              personal side project.
            </p>
            <p className="mb-10 text-gray-800">
              Outside of software, you'll usually find me drawing, maintaining my planted aquariums, gaming, and planning my next adventure. I also enjoy running, cycling, and backpacking.
            </p>
            <img src="/gifs/jill.gif" alt="jill" className="w-full rounded-md max-h-96 hidden md:block" />
            <Carousel className="w-full block md:hidden">
              <CarouselContent>
                <CarouselItem>
                  <img src="/gifs/jill.gif" alt="jill" className="w-full rounded-md max-h-96" />
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
