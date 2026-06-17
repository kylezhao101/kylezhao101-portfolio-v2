import { IconArrowUpRight } from "@tabler/icons-react";

const clients = [
    {
        name: "Celtix",
        sub: "osu!",
        logo: "/art-clients/celtix.webp",
        link: "https://soundcloud.com/rhe4"
    },
    {
        name: "osu! world cup design",
        sub: "osu!",
        logo: "/art-clients/osu.webp",
        link: "https://www.youtube.com/@osugamearchive"
    },
    {
        name: "SFU Studio SIAT",
        sub: "SFU",
        logo: "/art-clients/studiosiat.webp",
        link: "https://www.sfu.ca/siat/studiosiat.html"
    },
    {
        name: "metahumanboi",
        sub: "osu!",
        logo: "/art-clients/mhbz.webp",
        link: "https://soundcloud.com/metahumanboi"
    },
    {
        name: "A.SAKA",
        sub: "osu!",
        logo: "/art-clients/asaka.webp",
        link: "https://soundcloud.com/a-saka1"
    }
]

export function ClientStrip() {
    return (
        <>
            <div>
                <div className="flex flex-wrap gap-2">
                    {clients.map(({ name, logo, link, sub }) => (
                        <a
                            key={name}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                flex-1
                                flex flex-col items-center justify-center gap-2
                                px-2 py-2
                                rounded-md
                                transition-all
                                hover:bg-stone-50
                                cursor-pointer
                                group
                            "
                        >
                            <img
                                src={logo}
                                alt={name}
                                className="
                                max-w-12
                                sm:max-w-20
                                w-auto
                                rounded-md
                                object-contain
                                transition-all
                                hover:scale-105
                                "
                            />

                            <div className="text-center">
                                <p className="text-xs font-medium text-stone-400">
                                    {name}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}