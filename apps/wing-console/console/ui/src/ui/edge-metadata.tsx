import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { motion } from "framer-motion";

export interface EdgeMetadataProps {
  inflights: string[];
  className?: string;
  offset?: { x: number | string; y: number | string };
  arrow?: "left" | "top";
}

export const EdgeMetadata = ({
  inflights,
  className,
  offset,
  arrow = "left",
}: EdgeMetadataProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={classNames("absolute z-10", "transition-all", className)}
      style={{
        translateX: offset?.x,
        translateY: offset?.y,
      }}
    >
      <div
        className={classNames(
          "absolute z-20 w-3 h-3 dark:bg-slate-700",
          arrow === "left" && "rotate-45 top-3 -left-1.5 border-b border-l",
          arrow === "top" && "rotate-45 -top-1.5 left-3 border-t border-l",
          "border-sky-300 dark:border-sky-500",
        )}
      />
      <div
        className={classNames(
          "absolute z-0 w-3 h-3 dark:bg-slate-700",
          arrow === "left" && "rotate-45 top-3 -left-1.5 border-b border-l",
          arrow === "top" && "rotate-45 -top-1.5 left-3 border-t border-l",
          "outline outline-2 outline-sky-200/50 dark:outline-sky-500/50",
          "border-sky-300 dark:border-sky-500",
          "rotate-45 top-3 -left-1.5",
        )}
      />
      <div
        className={classNames(
          "bg-white dark:bg-slate-700 rounded shadow-xl px-3 py-1 space-y-2 absolute z-10",
          "outline outline-2 outline-sky-200/50 dark:outline-sky-500/50",
          //"border border-slate-300 dark:border-slate-900",
          "border border-sky-300 dark:border-sky-500",
        )}
      >
        <div className="text-slate-900 dark:text-slate-200 text-xs">
          Inflights
        </div>

        <div className="leading-tight text-xs truncate transition-all text-slate-900 dark:text-slate-250">
          {inflights.map((inflight, index: number) => (
            <li key={index}>{inflight}</li>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
