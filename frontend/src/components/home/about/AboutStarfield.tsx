"use client";

import { useAboutStars } from "@/hooks/use-about-stars";
import styles from "./AboutStarfield.module.css";

export function AboutStarfield() {
  const { stars, relocate } = useAboutStars();
  return (
    <div aria-hidden="true" className={styles.field}>
      <div className={styles.fade}>
        {stars.map((star) => (
          <span
            key={star.id}
            className={styles.position}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <span
              className={styles.star}
              style={{ animationDuration: `${star.duration}s`, animationDelay: `${star.delay}s` }}
              onAnimationIteration={(event) => {
                // Both arms animate; relocate only once, during their invisible phase.
                if (event.nativeEvent.pseudoElement === "::before") relocate(star.id);
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
