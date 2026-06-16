"use client";

import { useEffect, useRef } from "react";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";
import { usePathname, useSearchParams } from "next/navigation";

export default function TopLoadingBarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const ref = useRef<LoadingBarRef>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        ref.current?.continuousStart();

        const timeout = setTimeout(() => {
            ref.current?.complete();
        }, 300);

        return () => clearTimeout(timeout);
    }, [pathname, searchParams]);

    return (
        <>
            <LoadingBar color="#06b6d4" ref={ref} height={2} shadow={false} />
            {children}
        </>
    );
}