import classNames from "classnames";
import { ElkExtendedEdge } from "elkjs/lib/elk.bundled.js";
import { motion } from "framer-motion";
import { memo, useMemo, useState } from "react";

export const EdgeItem = memo(
  ({
    edge,
    offset = { x: 0, y: 0 },
    markerStart,
    markerEnd,
    highlighted,
    fade,
    transitionDuration,
    selected,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: {
    edge: ElkExtendedEdge;
    offset?: { x: number; y: number };
    markerStart?: string;
    markerEnd?: string;
    highlighted?: boolean;
    fade?: boolean;
    transitionDuration?: number;
    selected?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: (id: string) => void;
  }) => {
    const d = useMemo(() => {
      return edge.sections
        ?.map((section) => {
          const points =
            [...(section.bendPoints ?? []), section.endPoint]
              ?.map((point) => `L${point.x},${point.y}`)
              .join(" ") ?? "";

          return `M${section.startPoint.x},${section.startPoint.y} ${points}`;
        })
        .join(" ");
    }, [edge.sections]);

    return (
      <g
        className={classNames(
          "stroke-1 fill-none cursor-pointer hover:stroke-[1.5px]",
          highlighted && "stroke-sky-500",
          selected && "stroke-[1.5px] stroke-sky-500",
          !highlighted && !selected && "stroke-slate-400 dark:stroke-slate-800",
          fade && "opacity-40",
          "transition-all",
        )}
      >
        <motion.path
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: fade ? 0.3 : 1,
          }}
          style={{ translateX: offset.x, translateY: offset.y }}
          transition={{ duration: transitionDuration }}
          exit={{
            opacity: 0,
          }}
          markerStart={`url(#${markerStart})`}
          markerEnd={`url(#${markerEnd})`}
          d={d}
        />
        <motion.path
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => onClick?.(edge.id)}
          className="opacity-0 pointer-events-auto"
          style={{ translateX: offset.x, translateY: offset.y }}
          markerStart={`url(#${markerStart})`}
          markerEnd={`url(#${markerEnd})`}
          d={d}
          strokeWidth="8"
        />
      </g>
    );
  },
);
