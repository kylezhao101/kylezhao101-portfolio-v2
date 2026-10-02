import { aboutStars } from "@/lib/about-stars";
import styles from "./AboutStarfield.module.css";

export function AboutStarfield() {
  return (
    <div aria-hidden="true" className={styles.field}>
      <div className={styles.fade}>
        {aboutStars.map((star) => (
          <span
            key={star.id}
            className={styles.position}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <span
              className={styles.star}
              style={{ animationDuration: `${star.duration}s`, animationDelay: `${star.delay}s` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
