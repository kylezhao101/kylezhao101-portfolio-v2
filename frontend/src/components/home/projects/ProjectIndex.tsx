"use client";

import { useState, type MouseEvent } from "react";
import { otherWork, tagStyles } from "@/data/other-work";
import styles from "./ProjectIndex.module.css";

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
                {otherWork.map((project) => {
                    const href = project.internalLink ?? project.externalLink;
                    const Row = href ? "a" : "div";
                    const isExternal = !project.internalLink && !!project.externalLink;
                    const cursorLabel = project.internalLink
                        ? "View case study"
                        : project.externalLink ?? "";

                    return (
                        <Row
                            key={project.title}
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className={`${href ? `${styles.row} group` : ""} grid grid-cols-6 py-4 gap-2 sm:gap-0`}
                            onMouseEnter={href ? () =>
                                setCursor((c) => ({
                                    ...c,
                                    visible: true,
                                    link: cursorLabel,
                                    dotColor: tagStyles[project.tags?.[0] as keyof typeof tagStyles]?.dot || "bg-cyan-500",
                                }))
                            : undefined}
                            onMouseLeave={href ? () =>
                                setCursor((c) => ({
                                    ...c,
                                    visible: false,
                                }))
                            : undefined}
                            onMouseMove={href ? (e: MouseEvent<HTMLElement>) =>
                                setCursor((c) => ({
                                    ...c,
                                    x: e.clientX,
                                    y: e.clientY,
                                }))
                            : undefined}
                        >
                            <p className="text-sm text-stone-500 hidden md:block">
                                {project.timeframe}
                            </p>

                            <div className="col-span-6 sm:col-span-3">
                                <p className="relative text-sm font-medium group-hover:text-cyan-500 text-gray-800 group-hover:transition-colors group-hover:duration-200">
                                    {href && <span
                                        aria-hidden="true"
                                        className={`${styles.marker} pointer-events-none absolute right-full mr-1 font-mono text-cyan-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none`}
                                    >
                                        &gt;
                                    </span>}
                                    {project.title}
                                </p>

                                <p className="text-sm text-stone-600">
                                    {project.description}
                                </p>
                            </div>

                            <div className="col-span-6 sm:col-span-3 md:col-span-2 flex justify-end items-start gap-2 flex-wrap">
                                {project.internalLink && (
                                    <span className="
                                        inline-flex items-center gap-1
                                        rounded px-2 py-1
                                        text-xs font-medium
                                        border border-cyan-300
                                        bg-stone-50 text-stone-600
                                        group-hover:text-cyan-700
                                        shadow-[0_0_10px_rgba(34,211,238,0.15)]
                                        ">
                                        &lt;
                                        Case Study &gt;
                                    </span>
                                )}
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
                        </Row>
                    )
                })}
            </div>
        </section>
    );
}
