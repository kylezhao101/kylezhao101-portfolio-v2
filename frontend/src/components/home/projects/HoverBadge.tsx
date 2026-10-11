import type { ReactNode } from "react";
import styles from "./HoverBadge.module.css";

export function HoverBadge({ visible, x, y, children }: {
  visible: boolean;
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed z-50"
      style={{ left: x, top: y, transform: "translate(12px, -50%)" }}>
      <div className={`${styles.badge} ${visible ? styles.visible : ""}`}>
        {children}
      </div>
    </div>
  );
}
