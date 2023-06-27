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
  fade?: boolean;
}

export const EdgeMetadata = (props: EdgeMetadataProps) => {
  const [edge, setEdge] = useState(props.edge);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props.edge) {
      setEdge(props.edge);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [props.edge]);

  return (
    <motion.div
      className={classNames(
        "absolute z-10",
        "transition-opacity",
        props.className,
      )}
      style={{
        translateX: edge?.position?.x,
        translateY: edge?.position?.y,
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: visible ? (props.fade ? 0.35 : 1) : 0,
      }}
      transition={{ ease: "easeOut", duration: 0.15 }}
      exit={{
        opacity: 0,
      }}
    >
      <div
        className={classNames(
          "absolute z-20 w-3 h-3 dark:bg-slate-700",
          edge?.placement === "right" &&
            "rotate-45 top-3 -left-1.5 border-b border-l",
          edge?.placement === "bottom" &&
            "rotate-45 -top-1.5 left-3 border-t border-l",
          "border-sky-300 dark:border-sky-500",
        )}
      />
      <div
        className={classNames(
          "absolute z-0 w-3 h-3 dark:bg-slate-700",
          edge?.placement === "right" &&
            "rotate-45 top-3 -left-1.5 border-b border-l",
          edge?.placement === "bottom" &&
            "rotate-45 -top-1.5 left-3 border-t border-l",
          "outline outline-2 outline-sky-200/50 dark:outline-sky-500/50",
          "border-sky-300 dark:border-sky-500",
          "rotate-45 top-3 -left-1.5",
        )}
      />
      <div
        className={classNames(
          "bg-white dark:bg-slate-700 rounded shadow-xl px-3 py-1 space-y-2 absolute z-10",
          "outline outline-2 outline-sky-200/50 dark:outline-sky-500/50",
          "border border-sky-300 dark:border-sky-500",
        )}
      >
        <div className="text-slate-900 dark:text-slate-200 text-xs">
          Inflights
        </div>

        <div className="leading-tight text-xs truncate transition-all text-slate-900 dark:text-slate-250">
          {edge?.inflights.map((inflight, index: number) => (
            <li key={index}>{inflight}</li>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
