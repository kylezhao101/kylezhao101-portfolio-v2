"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Status, StatusIndicator, StatusLabel } from '../ui/status';

export default function Footer({
    lastUpdated,
}: {
    lastUpdated: string;
}) {
    const [isCopied, setIsCopied] = useState(false);
    const [shouldNudge, setShouldNudge] = useState(false);

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);

        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 5000);
    };

    useEffect(() => {
        const nudge = () => {
            setShouldNudge(false);

            requestAnimationFrame(() => {
                setShouldNudge(true);
            });

            setTimeout(() => setShouldNudge(false), 5000);
        };

        window.addEventListener("contact-nudge", nudge);
        return () => window.removeEventListener("contact-nudge", nudge);
    }, []);

    return (
        <nav
            id="contact"
            className="max-w-screen-2xl mx-auto px-3 sm:px-8 min-h-14 pb-16 z-10 target:[&_.contact-email]:animate-bounce"
        >
            <div className='flex flex-col md:max-w-screen-2xl mx-auto'>
                <div className='flex justify-between items-center py-6'>
                    <ul className="flex flex-col sm:flex-row sm:items-center gap-6 sm:space-x-6">
                        <Status status="open-to-work" variant="outline" >
                            <StatusIndicator />
                            <StatusLabel />
                        </Status>
                        {lastUpdated && (
                            <li className='opacity-60'>
                                <p className="text-sm">Last updated {lastUpdated}</p>
                            </li>)
                        }
                    </ul>
                </div>

                <div className="flex flex-col gap-6 text-sm">

                    <div
                        className={`flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity cursor-pointer`}
                        onClick={() => copyToClipboard("kylezhao101@gmail.com")}
                        aria-label="Copy email"
                        title="Copy email"
                    >
                        <span className="text-sm sm:text-base">
                            kylezhao101@gmail.com
                        </span>

                        <button
                            aria-label="Copy email"
                            title="Copy email"
                            className="opacity-75 hover:opacity-100 transition-opacity"
                        >
                            {isCopied ? (
                                <div className="flex flex-row items-center gap-1 text-sm sm:text-base">
                                    <IconCheck size={14} />
                                    <p>
                                        Copied!
                                    </p>
                                </div>
                            ) : (

                                <IconCopy
                                    size={14}
                                    className={shouldNudge ? "animate-copy-wiggle" : ""}
                                />
                            )}
                        </button>
                    </div>

                    <a
                        href="https://www.linkedin.com/in/kyle-zhao-397452216/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-75 hover:opacity-100 transition-opacity text-sm sm:text-base"
                    >
                        LinkedIn
                    </a>

                </div>
            </div>
        </nav>
    );
}