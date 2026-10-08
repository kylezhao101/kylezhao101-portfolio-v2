import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import styles from "./CalloutCard.module.css";

export default function CalloutCard({ children }: { children: ReactNode }) {
  return <Card className={styles.callout}>{children}</Card>;
}
