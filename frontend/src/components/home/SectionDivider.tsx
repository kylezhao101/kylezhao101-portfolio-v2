import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import styles from "./SectionDivider.module.css";

export function SectionDivider({ animate = false }: { animate?: boolean }) {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1700px] px-3 sm:px-8">
      <div className={cn("flex h-3 items-center gap-2", animate && styles.reveal)}>
        <span className="relative h-[9px] w-[9px] shrink-0">
          <span className="absolute left-0 top-1 h-px w-full bg-gray-300" />
          <span className="absolute left-1 top-0 h-full w-px bg-gray-300" />
        </span>
        <Separator className="w-auto flex-1 bg-gray-300" />
        <span className="relative h-[9px] w-[9px] shrink-0">
          <span className="absolute left-0 top-1 h-px w-full bg-gray-300" />
          <span className="absolute left-1 top-0 h-full w-px bg-gray-300" />
        </span>
      </div>
    </div>
  );
}
