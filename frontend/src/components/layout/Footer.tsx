"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { Status, StatusIndicator, StatusLabel } from '../ui/status';

export default function Footer({
    lastUpdated,
}: {
    lastUpdated: string;
}) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);

        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <nav className="w-full min-h-14 pb-16 z-10 container" id="contact">
            <div className='flex flex-col md:max-w-screen-2xl mx-auto'>

                <div className='flex justify-between items-center py-6'>
                    <ul className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
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
                        className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity"
                        onClick={() => {
                            copyToClipboard("kylezhao101@gmail.com");
                        }}>
                        <span>
                            kylezhao101@gmail.com
                        </span>

                        <button
                            aria-label="Copy email"
                            title="Copy email"

                            className="opacity-60 hover:opacity-100 transition-opacity"
                        >
                            {isCopied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </button>
                    </div>

                    <a
                        href="https://www.linkedin.com/in/kyle-zhao-397452216/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-75 hover:opacity-100 transition-opacity"
                    >
                        LinkedIn
                    </a>

                </div>
            </div>
        </nav>
    );
}