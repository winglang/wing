import classNames from "classnames";
import { ElkExtendedEdge } from "elkjs/lib/elk.bundled.js";
import { motion } from "framer-motion";

export const EdgeItem = ({
  edge,
  offset = { x: 0, y: 0 },
  markerStart,
  markerEnd,
  highlighted,
  fade,
  transitionDuration,
}: {
  edge: ElkExtendedEdge;
  offset?: { x: number; y: number };
  markerStart?: string;
  markerEnd?: string;
  highlighted?: boolean;
  fade?: boolean;
  transitionDuration?: number;
}) => {
  const d = edge.sections
    ?.map((section) => {
      const points =
        [...(section.bendPoints ?? []), section.endPoint]
          ?.map((point) => `L${point.x},${point.y}`)
          .join(" ") ?? "";
      return `M${section.startPoint.x},${section.startPoint.y} ${points}`;
    })
    .join(" ");

  const [source] = edge.sources;
  const [target] = edge.targets;
  const goesOutside =
    source?.split("/").slice(0, -1).join("/") !==
    target?.split("/").slice(0, -1).join("/");
  return (
    <g
      className={classNames(
        "stroke-1 fill-none",
        highlighted
          ? "stroke-[1.5px] stroke-sky-500 z-10"
          : "stroke-slate-400 dark:stroke-slate-800",
        fade && "opacity-40",
        "transition-all",
      )}
    >
      <motion.path
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        style={{ translateX: offset.x, translateY: offset.y }}
        transition={{ duration: transitionDuration }}
        exit={{
          opacity: 0,
        }}
        markerStart={`url(#${markerStart})`}
        markerEnd={`url(#${markerEnd})`}
        d={d}
        strokeDasharray={goesOutside ? "3" : undefined}
      />
    </g>
  );
};
