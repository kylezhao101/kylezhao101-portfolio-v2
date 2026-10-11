import { Fragment } from "react";
import styles from "./HeroTitle.module.css";

const title = "Software engineer who builds things that feel considered.";

export function HeroTitle() {
  return (
    <h1
      aria-label={title}
      data-text={title}
      className="mb-4 pb-1 text-3xl md:text-5xl font-semibold"
    >
      <span aria-hidden="true">
        {title.split(" ").map((word, index) => (
          <Fragment key={`${index}-${word}`}>
            {index > 0 && " "}
            <span className={styles.word} style={{ animationDelay: `${index * 20}ms` }}>
              {word}
            </span>
          </Fragment>
        ))}
      </span>
    </h1>
  );
}
