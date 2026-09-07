import localFont from "next/font/local";
import { Geist, Geist_Mono } from 'next/font/google'

export const rx100 = localFont({
    src: "./RX100-Regular.woff2",
    weight: "400",
    style: "normal",
    display: "swap",
});

export const geist = Geist({
    subsets: ['latin'],
    weight: '400',
    style: 'normal',
    display: 'swap',
});

export const ppMori = localFont({
    src: [
        {
            path: "./PPMori-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./PPMori-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./PPMori-Black.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    display: "swap",
});