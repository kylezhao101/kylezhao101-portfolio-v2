"use client";

import { useDitherTexture } from "@/hooks/use-dither-texture";
import styles from "./IllustrationBackdrop.module.css";

function Texture({ source, active }: { source: string; active: boolean }) {
  const ref = useDitherTexture(source);
  return <canvas ref={ref} className={`${styles.layer} ${active ? styles.active : ""}`} />;
}

export function IllustrationBackdrop({ sources, activeIndex }: { sources: readonly string[]; activeIndex: number }) {
  return (
    <div aria-hidden="true" className={styles.backdrop}>
      <div className={styles.fade}>
        {sources.map((source, index) => <Texture key={source} source={source} active={index === activeIndex} />)}
      </div>
    </div>
  );
}
