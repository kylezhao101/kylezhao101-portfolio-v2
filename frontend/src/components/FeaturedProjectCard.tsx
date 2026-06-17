import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";


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
    const [cursor, setCursor] = useState({
        x: 0,
        y: 0,
        visible: false,
        link: "",
        dotColor: "bg-cyan-500",
    });



    return (
        <section className="relative">
            {/* Floating cursor */}
            {
                cursor.visible && (
                    <div
                        className="pointer-events-none fixed z-50"
                        style={{
                            left: cursor.x,
                            top: cursor.y,
                            transform: "translate(12px, -50%)",
                        }}
                    >
                        <div className="flex items-center gap-2 rounded-full bg-white backdrop-blur-sm px-3 py-1 border border-slate-100">
                            <div className={`h-2 w-2 rounded-full ${cursor.dotColor}`} />
                            <span className="text-sm text-stone-600 whitespace-nowrap">
                                {cursor.link}
                            </span>
                        </div>
                    </div>
                )
            }
            <Link
                href={project.internalRoute}
                className="block w-full"
                onMouseEnter={() =>
                    setCursor((c) => ({
                        ...c,
                        visible: true,
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
                <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="aspect-video w-full object-cover"
                    />

                    <CardHeader>
                        <CardTitle className="text-gray-800">{project.title}</CardTitle>

                        <CardDescription>
                            {project.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex items-start gap-6 justify-between pt-0 flex-col lg:flex-row">
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded border border-stone-200 px-2 py-1 font-mono text-xs text-stone-500"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <span className="font-mono text-xs text-stone-400">
                            {project.timeframe}
                        </span>
                    </CardContent>
                </Card>
            </Link>
        </section>
    );
}