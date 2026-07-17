"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "motion/react";

import { Button } from "@/components/ui/button";
import { config } from "@/config/config";

const MotionLink = motion.create(Link);

export default function ResumeButton() {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const isHoveredRef = useRef(false);

    const shapeControls = useAnimationControls();
    const backgroundControls = useAnimationControls();

    const handleHoverStart = async () => {
        const link = linkRef.current;
        const text = textRef.current;

        if (!link || !text) return;

        isHoveredRef.current = true;

        shapeControls.stop();
        backgroundControls.stop();

        const linkRect = link.getBoundingClientRect();
        const textRect = text.getBoundingClientRect();

        const textLeft = textRect.left - linkRect.left;
        const textRight = textRect.right - linkRect.left;

        const startX = textRight - 2;
        const scanEndX = textLeft - 2;
        const squareX = textLeft - 18;

        shapeControls.set({
            x: startX,
            width: 2,
            height: 20,
            opacity: 1,
            rotate: 0,
        });

        backgroundControls.set({
            left: 0,
        });

        const backgroundAnimation = backgroundControls.start({
            left: [0, 0, -22, -18],
            transition: {
                duration: 0.42,
                times: [0, 0.45, 0.72, 1],
                ease: [
                    "linear",
                    [0.22, 1, 0.36, 1],
                    [0.16, 1, 0.3, 1],
                ],
            },
        });

        await shapeControls.start({
            x: [startX, scanEndX, squareX],
            width: [2, 2, 10],
            height: [20, 20, 10],
            transition: {
                duration: 0.42,
                times: [0, 0.62, 1],
                ease: [
                    [0.42, 0, 1, 0.6],
                    [0.22, 1, 0.36, 1],
                ],
            },
        });

        if (!isHoveredRef.current) return;

        shapeControls.start({
            rotate: 360,
            transition: {
                duration: 0.91,
                ease: "linear",
                repeat: Infinity,
            },
        });

        await backgroundAnimation;
    };

    const handleHoverEnd = async () => {
        const link = linkRef.current;
        const text = textRef.current;

        isHoveredRef.current = false;

        shapeControls.stop();
        backgroundControls.stop();

        if (!link || !text) return;

        const linkRect = link.getBoundingClientRect();
        const textRect = text.getBoundingClientRect();

        const textLeft = textRect.left - linkRect.left;
        const scanEndX = textLeft - 2;

        await Promise.all([
            shapeControls.start({
                x: scanEndX,
                width: 2,
                height: 20,
                rotate: 0,
                transition: {
                    duration: 0.14,
                    ease: [0.4, 0, 0.2, 1],
                },
            }),

            backgroundControls.start({
                left: 0,
                transition: {
                    duration: 0.18,
                    ease: [0.4, 0, 0.2, 1],
                },
            }),
        ]);

        shapeControls.start({
            opacity: 0,
            transition: {
                duration: 0.08,
                ease: "easeOut",
            },
        });
    };

    return (
        <Button
            variant="default"
            size="sm"
            asChild
            className="overflow-visible rounded-full bg-transparent p-0 text-sm shadow-none hover:bg-transparent"
        >
            <MotionLink
                ref={linkRef}
                href={config.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                className="relative flex items-center justify-center px-4"
            >
                <motion.span
                    aria-hidden="true"
                    initial={{ left: 0 }}
                    animate={backgroundControls}
                    className="pointer-events-none absolute inset-y-0 right-0 z-0 rounded-full bg-gray-900"
                />

                <motion.span
                    aria-hidden="true"
                    initial={{
                        x: 0,
                        width: 2,
                        height: 20,
                        opacity: 0,
                        rotate: 0,
                    }}
                    animate={shapeControls}
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 my-auto bg-cyan-200"
                />

                <span ref={textRef} className="relative z-10">
                    Resume
                </span>
            </MotionLink>
        </Button>
    );
}