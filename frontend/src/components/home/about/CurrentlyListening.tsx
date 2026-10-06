type Track = {
    title: string;
    artist: string;
    cover: string;
};

const tracks: Track[] = [
    {
        title: "I Love my Computer",
        artist: "Ninajirachi",
        cover: "/about/ilmc.png",
    },
    {
        title: "儀 -lirile-",
        artist: "黒皇帝, Eili",
        cover: "/about/hardcore-utopia.jpg",
    },
    {
        title: "Clarity",
        artist: "Zedd",
        cover: "/about/clarity.png",
    },
    // {
    //     title: "Fancy That",
    //     artist: "Pink Panthress",
    //     cover: "/about/fancy-that.png",
    // },
    {
        title: "Worlds",
        artist: "Porter Robinson",
        cover: "/about/worlds.jpg",
    },
];

function TrackCard({ track }: { track: Track }) {
    return (
        <div className="group flex min-w-0 flex-col items-start gap-2 border-b py-2 [&:nth-last-child(-n+2)]:border-b-0 xl:flex-row xl:items-center xl:gap-4">
            <div className="relative h-14 w-20 shrink-0">
                {/* CD / vinyl behind cover */}
                <div className="absolute left-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-stone-300 bg-[radial-gradient(circle,white_0_10%,#d4d4d4_11%_18%,#111_19%_100%)] transition-transform duration-300 group-hover:translate-x-3" />

                {/* Album cover */}
                <img
                    src={track.cover}
                    alt={`${track.title} album art`}
                    className="absolute left-0 top-0 h-14 w-14 rounded-sm object-cover shadow-sm"
                />
            </div>

            <div className="min-w-0 max-w-full">
                <p className="truncate text-sm font-medium text-gray-800">{track.title}</p>
                <p className="truncate text-xs text-gray-500">{track.artist}</p>
            </div>
        </div>
    );
}

export function CurrentlyListening() {
    return (
        <div className="mt-4">
            <p className="py-2 text-sm font-medium text-gray-700">On Repeat...</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {tracks.map((track) => (
                    <TrackCard key={track.title} track={track} />
                ))}
            </div>
        </div>
    );
}
