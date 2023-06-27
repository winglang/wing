import classNames from "classnames";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Edge } from "../shared/Edge";

export interface EdgeMeta {
  id: string;
  source: string;
  target: string;
  inflights: string[];
  position?: { x: number | string; y: number | string };
  placement?: "right" | "bottom";
}

export interface EdgeMetadataProps {
  edge?: EdgeMeta;
  className?: string;
  highlighted?: boolean;
}

export const EdgeMetadata = ({
  edge,
  className,
  highlighted,
}: EdgeMetadataProps) => {
  const [edgeMeta, setEdgeMeta] = useState(edge);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (edge) {
      setEdgeMeta(edge);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [edge]);

  return (
    <motion.div
      className={classNames("absolute z-10", "transition-opacity", className)}
      style={{
        translateX: edgeMeta?.position?.x,
        translateY: edgeMeta?.position?.y,
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: visible ? (highlighted ? 1 : 0.35) : 0,
      }}
      transition={{ ease: "easeOut", duration: 0.15 }}
      exit={{
        opacity: 0,
      }}
    >
      <div
        className={classNames(
          "absolute z-20 w-2.5 h-2.5 bg-white dark:bg-slate-650",
          edgeMeta?.placement === "right" && [
            "rotate-45 -left-[4.2px] border-b border-l",
            (edgeMeta?.inflights.length > 1 && "top-3") || "top-[6.5px]",
          ],
          edgeMeta?.placement === "bottom" &&
            "rotate-45 -top-[4px] left-3 border-t border-l",
          "border-sky-300 dark:border-sky-500",
        )}
      />
      <div
        className={classNames(
          "absolute z-0 w-2.5 h-2.5",
          edgeMeta?.placement === "right" && [
            "rotate-45 -left-[4.2px] border-b border-l",
            (edgeMeta?.inflights.length > 1 && "top-3") || "top-[6.5px]",
          ],
          edgeMeta?.placement === "bottom" &&
            "rotate-45 -top-[4px] left-3 border-t border-l",
          "outline outline-2 outline-sky-200/50 dark:outline-sky-500/50",
          "border-sky-300 dark:border-sky-500",
        )}
      />
      <div
        className={classNames(
          "bg-white dark:bg-slate-650 rounded shadow-xl px-2 py-1 space-y-2 absolute z-10",
          "outline outline-2 outline-sky-200/50 dark:outline-sky-500/50",
          "border border-sky-300 dark:border-sky-500",
          "cursor-default",
        )}
      >
        <div className="leading-tight text-xs truncate transition-all text-slate-900 dark:text-slate-250 max-w-[8rem]">
          {edgeMeta?.inflights.map((inflight, index: number) => (
            <div key={index} className="truncate" title={inflight}>
              {inflight}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
