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