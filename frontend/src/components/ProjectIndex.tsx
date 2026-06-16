"use client";

import { useState } from "react";
import { otherWork, tagStyles } from "@/data/other-work";

export function ProjectIndex() {
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
            {cursor.visible && (
                <div
                    className="pointer-events-none fixed z-50"
                    style={{
                        left: cursor.x,
                        top: cursor.y,
                        transform: "translate(12px, -50%)",
                    }}
                >
                    <div className="flex items-center gap-2 rounded-full bg-cyan-100 bg-opacity-30 backdrop-blur-sm px-3 py-1 border border-slate-100">
                        <div className={`h-2 w-2 rounded-full ${cursor.dotColor}`} />
                        <span className="text-sm text-stone-600 whitespace-nowrap">
                            {cursor.link}
                        </span>
                    </div>
                </div>
            )}

            <div className="divide-y">
                {otherWork.map((project) => (
                    <a
                        key={project.title}
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid grid-cols-6 py-4"
                        onMouseEnter={() =>
                            setCursor((c) => ({
                                ...c,
                                visible: true,
                                link: project.externalLink,
                                dotColor: tagStyles[project.tags?.[0] as keyof typeof tagStyles]?.dot || "bg-cyan-500",
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
                        <p className="text-sm text-stone-400 hidden md:block">
                            {project.timeframe}
                        </p>

                        <div className="col-span-3">
                            <p className="text-sm font-medium group-hover:text-cyan-500 text-gray-800 group-hover:transition-colors group-hover:duration-200">
                                {project.title}
                            </p>

                            <p className="text-sm text-stone-600">
                                {project.description}
                            </p>
                        </div>

                        <div className="col-span-3 md:col-span-2 flex justify-end items-start gap-2 flex-wrap">
                            {project.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className={`
                                        inline-flex items-center
                                        rounded px-2.5 py-1
                                        text-xs font-medium border
                                        ${tagStyles[tag as keyof typeof tagStyles]?.badge ??
                                        "bg-stone-100 text-stone-600 border-stone-200"
                                        }
                                    `}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}