import Link from "next/link";
import {
    Card,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useEdgeMosaic } from "@/hooks/use-edge-mosaic";
import styles from "./FeaturedProjectCard.module.css";
import { HoverBadge } from "./HoverBadge";


type FeaturedProjectCardProps = {
    project: {
        slug: string;
        title: string;
        description: string;
        image: string;
        timeframe: string;
        role: string;
        technologies: string[];
        internalRoute: string;
    };
};

export default function FeaturedProjectCard({
    project,
}: FeaturedProjectCardProps) {
    const { targetRef, imageRef, canvasRef } = useEdgeMosaic(project.image);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [cursor, setCursor] = useState({
        x: 0,
        y: 0,
        visible: false,
        link: "",
        dotColor: "bg-cyan-500",
    });

    useEffect(() => {
        const image = imageRef.current;
        if (image?.complete && image.naturalWidth > 0) setImageLoaded(true);
    }, [imageRef, project.image]);



    return (
        <section className="relative h-full">
            {/* Floating cursor */}
                    <HoverBadge visible={cursor.visible} x={cursor.x} y={cursor.y}>
                        <div className="flex items-center gap-2 rounded-full bg-white backdrop-blur-sm px-3 py-1 border border-slate-100">
                            <div className={`h-2 w-2 rounded-full ${cursor.dotColor}`} />
                            <span className="text-sm text-stone-600 whitespace-nowrap">
                                {cursor.link}
                            </span>
                        </div>
                    </HoverBadge>
            <Link
                ref={targetRef}
                href={project.internalRoute}
                className="block w-full h-full"
                onMouseEnter={(e) =>
                    setCursor((c) => ({
                        ...c,
                        visible: true,
                        x: e.clientX,
                        y: e.clientY,
                        link: "View case study",
                        dotColor: "bg-cyan-500",
                    }))
                }
                onMouseLeave={() =>
                    setCursor((c) => ({
                        ...c,
                        visible: false,
                    }))
                }
                onMouseMove={(e) =>
                    setCursor((c) => ({
                        ...c,
                        x: e.clientX,
                        y: e.clientY,
                    }))
                }
            >
                <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative overflow-hidden">
                        <div
                            aria-hidden="true"
                            className={`${styles.placeholder} ${imageLoaded ? styles.loaded : ""}`}
                        />
                        <img
                            ref={imageRef}
                            src={project.image}
                            alt={project.title}
                            onLoad={() => setImageLoaded(true)}
                            className={`relative block aspect-video min-h-64 w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                        />
                        <canvas
                            ref={canvasRef}
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 h-full w-full"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent"
                        />
                        <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col gap-3 sm:bottom-4 sm:left-4 sm:right-4">
                            <p className="max-w-full text-sm leading-relaxed text-white sm:max-w-[65%]">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap items-end justify-between gap-2">
                            <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="rounded border border-stone-200 bg-white px-2 py-1 text-xs text-stone-600">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <span className="ml-auto shrink-0 whitespace-nowrap rounded border border-stone-200 bg-white px-2 py-1 text-xs text-stone-600">
                                {project.timeframe}
                            </span>
                            </div>
                        </div>
                    </div>

                </Card>
            </Link>
        </section>
    );
}
