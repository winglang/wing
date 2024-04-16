import { CubeIcon, BoltIcon } from "@heroicons/react/24/solid";
import { ResourceIcon } from "@wingconsole/design-system";
import type { ConstructTreeNode } from "@winglang/sdk/lib/core/index.js";
import clsx from "classnames";
import type { ElkPoint, LayoutOptions } from "elkjs";
import type { FunctionComponent, PropsWithChildren } from "react";
import { memo, useCallback, useEffect, useId, useMemo } from "react";

import { useMapV2 } from "../services/use-map-v2.js";
import { assert } from "../ui/elk-flow/assert.js";
import { Graph } from "../ui/elk-flow/graph.js";
import { NodeChildren } from "../ui/elk-flow/node-children.js";
import { Node } from "../ui/elk-flow/node.js";
import { Port } from "../ui/elk-flow/port.js";
import type { EdgeComponent } from "../ui/elk-flow/types.js";
import { ConnectionData } from "@winglang/sdk/lib/simulator/index.js";

interface InflightPortProps {
  occupied?: boolean;
  highlight?: boolean;
}

const InflightPort: FunctionComponent<InflightPortProps> = (props) => (
  <>
    <div
      className={clsx(
        "size-3 rounded-full bg-white border border-gray-300",
        // "opacity-0",
        // props.occupied && "opacity-100",
        "group-hover/construct:opacity-100 group-hover/construct:border-sky-300",
        "outline outline-0 group-hover/construct:outline-2 outline-sky-200",
        props.highlight && "outline-2 border-sky-300",
        "transition-all",
        "invisible",
      )}
    >
      <div className="w-full h-full relative group/inflight-port">
        <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
          <div
            className={clsx(
              !props.occupied && "size-0",
              props.occupied && "size-1.5",
              // "group-hover/inflight-port:size-1.5",
              // "rounded-full bg-sky-400 transition-all",
              "rounded-full transition-all",
              "bg-gray-400",
              "group-hover/construct:bg-sky-400",
              props.highlight && "bg-sky-400",
            )}
          ></div>
        </div>
      </div>
    </div>
  </>
);

// const SPACING_BASE_VALUE = 64;
// const SPACING_BASE_VALUE = 48;
const SPACING_BASE_VALUE = 30;
// const PORT_ANCHOR = SPACING_BASE_VALUE / 5;
const PORT_ANCHOR = 0;
// const EDGE_ROUNDED_RADIUS = 14;
const EDGE_ROUNDED_RADIUS = 10;
// For more configuration options, refer to: https://eclipse.dev/elk/reference/options.html
const baseLayoutOptions: LayoutOptions = {
  "elk.hierarchyHandling": "INCLUDE_CHILDREN",
  "elk.direction": "RIGHT",
  "elk.alignment": "CENTER",
  "elk.algorithm": "org.eclipse.elk.layered",
  "elk.layered.spacing.baseValue": `${SPACING_BASE_VALUE}`,
};

interface ContainerNodeProps {
  id: string;
  name: string;
}

const ContainerNode: FunctionComponent<PropsWithChildren<ContainerNodeProps>> =
  memo((props) => {
    return (
      <Node
        elk={{
          id: props.id,
          layoutOptions: {
            // "elk.algorithm": "org.eclipse.elk.layered",
            // "elk.hierarchyHandling": "INCLUDE_CHILDREN",
            // "elk.layered.spacing.baseValue": `${SPACING_BASE_VALUE}`,
            // "elk.direction": "RIGHT",
            ...baseLayoutOptions,
          },
        }}
        className={clsx("inline-block", "group", "pointer-events-none")}
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-x-0 top-0">
            <div className="relative">
              <div className="absolute bottom-0">
                <div
                  className={clsx(
                    "text-sm leading-relaxed tracking-wide whitespace-nowrap group-hover:text-sky-600",
                    "invisible",
                  )}
                >
                  {props.name}
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs whitespace-nowrap h-0 invisible">
            {props.name}
          </div>

          <div
            className={clsx(
              "w-full h-full rounded-lg",
              // "shadow",
              "transition-all",
              "flex flex-col",
              "overflow-hidden",
              "border border-gray-200 border-dashed",
              "hover:border-sky-300",
              "outline outline-0 outline-sky-200 hover:outline-2",
            )}
          >
            <div className={clsx("grow shadow-inner", "p-8")}>
              <NodeChildren>
                <div className="absolute">{props.children}</div>
              </NodeChildren>
            </div>
          </div>
        </div>
      </Node>
    );
  });

interface ConstructNodeProps {
  id: string;
  name: string;
  fqn: string;
  inflights: {
    id: string;
    name: string;
    sourceOccupied?: boolean;
    targetOccupied?: boolean;
  }[];
  highlight?: boolean;
}

const ConstructNode: FunctionComponent<PropsWithChildren<ConstructNodeProps>> =
  memo((props) => {
    const hasChildren = Array.isArray(props.children)
      ? props.children.length > 0
      : false;

    const renderedNode = (
      <Node
        elk={{
          id: props.id,
          layoutOptions: {
            "elk.direction": "DOWN",
            "elk.layered.spacing.baseValue": "1",
            // "elk.edgeRouting": "UNDEFINED",
            // "elk.edgeRouting": "ORTHOGONAL",
            // "elk.edgeRouting": "POLYLINE",
            // "elk.edgeRouting": "SPLINES",
          },
        }}
        className="inline-block group/construct"
      >
        <div
          className={clsx(
            "w-full h-full rounded-lg  bg-white",
            // "outline outline-1 outline-gray-300",
            "border border-gray-300",
            "group-hover/construct:border-sky-300",
            "outline outline-0 outline-sky-200",
            "group-hover/construct:outline-2",
            props.highlight && "outline-2 border-sky-300",
            "shadow",
            "transition-all",
          )}
        >
          <div
            // className="px-4 py-2.5 flex items-center gap-2"
            // className="px-4 py-1 flex items-center gap-2"
            className="px-2.5 py-1 flex items-center gap-2"
          >
            {/* <CubeIcon className="-ml-1.5 size-6 text-emerald-400" /> */}
            {/* <div className="-ml-1 rounded px-1.5 py-1 bg-emerald-400">
      <CubeIcon className="size-6 text-white" />
    </div> */}
            {/* <div className="rounded p-1.5 bg-gray-400">
              <CubeIcon className="size-5 text-white" />
            </div> */}
            {/* {props.fqn === "@winglang/sdk.cloud.Bucket" && (
              <div className="-ml-1 rounded p-1.5 bg-emerald-400">
                <ArchiveBoxIcon className="size-5 text-white" />
              </div>
            )} */}
            {/* <ResourceIcon className="size-6 -ml-2" resourceType={props.fqn} /> */}
            {/* <div className="-ml-1 border border-gray-300 rounded-lg px-1.5 py-1 shadow">
      <CubeIcon className="size-6 text-emerald-400" />
    </div> */}
            <span
              // className="text-sm font-semibold leading-relaxed tracking-wide whitespace-nowrap"
              className="text-sm font-medium leading-relaxed tracking-wide whitespace-nowrap text-gray-500"
            >
              {props.name}
              {/* ({props.fqn}) */}
            </span>
          </div>

          <NodeChildren className="text-xs">
            {props.inflights.map((inflight) => (
              <Node
                key={inflight.id}
                elk={{
                  id: inflight.id,
                  layoutOptions: {
                    "elk.portConstraints": "FIXED_SIDE",
                  },
                }}
                className="pointer-events-none"
              >
                {/* <div className="border-t border-gray-300">
          <div className="px-3 py-1.5 text-gray-600 font-mono text-xs tracking-tighter whitespace-nowrap">
            <span className="text-sky-600 italic">inflight</span>{" "}
            {inflight.name}(<span className="text-gray-400">…</span>
            ): <span className="italic text-gray-400">unknown</span>
          </div>
        </div> */}
                <div className="border-t border-gray-300">
                  <div
                    // className="px-4 py-1.5 text-gray-700 font-mono text-xs tracking-tighter whitespace-nowrap"
                    className="px-2.5 py-1.5 text-gray-700 font-mono text-xs tracking-tighter whitespace-nowrap"
                  >
                    <span className="text-sky-600 italic">inflight</span>{" "}
                    {inflight.name}
                  </div>
                </div>
                {/* <div className="border-t border-gray-300">
          <div className="px-4 py-1.5 text-gray-700 font-mono text-xs tracking-tighter whitespace-nowrap">
            {inflight.name}
          </div>
        </div> */}

                <Port
                  elk={{
                    id: `${inflight.id}#target`,
                    layoutOptions: {
                      "elk.port.side": "WEST",
                      // "elk.port.borderOffset": "100",
                      "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
                    },
                  }}
                >
                  <InflightPort
                    occupied={inflight.targetOccupied}
                    highlight={props.highlight}
                  />
                </Port>
                <Port
                  elk={{
                    id: `${inflight.id}#source`,
                    layoutOptions: {
                      "elk.port.side": "EAST",
                      // "elk.port.borderOffset": "100",
                      "elk.port.anchor": `[${PORT_ANCHOR},0]`,
                    },
                  }}
                >
                  <InflightPort
                    occupied={inflight.sourceOccupied}
                    highlight={props.highlight}
                  />
                </Port>
              </Node>
            ))}
          </NodeChildren>
        </div>
      </Node>
    );

    if (hasChildren) {
      return (
        <ContainerNode
          id={`${props.id}#container`}
          name={props.name}
          // name={""}
        >
          {renderedNode}

          {props.children}
        </ContainerNode>
      );
    }

    return renderedNode;
  });

interface FunctionNodeProps {
  id: string;
  sourceOccupied?: boolean;
  targetOccupied?: boolean;
}

const FunctionNode: FunctionComponent<FunctionNodeProps> = (props) => {
  return (
    <Node
      elk={{
        id: props.id,
        layoutOptions: {
          "elk.portConstraints": "FIXED_SIDE",
        },
      }}
      className="inline-flex group/construct"
      title={props.id}
    >
      <div className="group relative">
        <div
          className={clsx(
            "p-1 rounded-full bg-white shadow",
            "transition-all",
            "border border-gray-300",
            "group-hover:border-sky-300",
            "outline outline-0 outline-sky-200",
            "group-hover:outline-2",
          )}
        >
          <BoltIcon className="size-5 text-sky-500" />
        </div>

        <Port
          elk={{
            id: `${props.id}#invoke#target`,
            layoutOptions: {
              "elk.port.side": "WEST",
              "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort occupied={props.targetOccupied} />
        </Port>

        <Port
          elk={{
            id: `${props.id}#invoke#source`,
            layoutOptions: {
              "elk.port.side": "EAST",
              "elk.port.anchor": `[${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort occupied={props.sourceOccupied} />
        </Port>

        <div className="absolute bottom-0 inset-x-0 invisible group-hover:visible">
          <div className="relative">
            <div className="absolute top-0 inset-x-0">
              <div className="flex justify-around">
                {/* <div className="size-3 rounded-full bg-red-500"></div> */}
                <div className="absolute text-center">
                  <div className="text-xs text-gray-500 backdrop-blur">
                    {props.id.split("/").slice(-1).join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Node>
  );
};

interface APINodeProps {
  id: string;
}

const APINode: FunctionComponent<APINodeProps> = (props) => {
  return (
    <Node
      elk={{
        id: props.id,
        layoutOptions: {
          "elk.portConstraints": "FIXED_SIDE",
        },
      }}
      className="inline-flex"
    >
      <div className="group">
        <div
          className={clsx(
            "p-3 rounded-full bg-white shadow",
            "transition-all",
            "border border-gray-300",
            // "group-hover:border-sky-300",
            "outline outline-0 outline-sky-200",
            "group-hover:outline-2",
          )}
        >
          <BoltIcon className="size-6 text-yellow-500" />
        </div>

        <Port
          elk={{
            id: `${props.id}#target`,
            layoutOptions: {
              "elk.port.side": "WEST",
              "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort />
        </Port>

        <Port
          elk={{
            id: `${props.id}#source`,
            layoutOptions: {
              "elk.port.side": "EAST",
              "elk.port.anchor": `[${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort />
        </Port>
      </div>
    </Node>
  );
};

/**
 * Returns the middle point between two points with a given radius.
 */
const midPoint = (pt1: ElkPoint, pt2: ElkPoint, radius: number) => {
  const distance = Math.sqrt((pt2.x - pt1.x) ** 2 + (pt2.y - pt1.y) ** 2);
  const radiusCapped = Math.min(radius, distance / 2);
  const diffX = (pt2.x - pt1.x) / distance;
  const diffY = (pt2.y - pt1.y) / distance;
  return { x: pt2.x - radiusCapped * diffX, y: pt2.y - radiusCapped * diffY };
};

const RoundedEdge: EdgeComponent = memo(
  ({ edge, offsetX = 0, offsetY = 0, graphWidth, graphHeight }) => {
    const points = useMemo(
      () =>
        edge.sections?.flatMap((section) => [
          section.startPoint,
          ...(section.bendPoints ?? []),
          section.endPoint,
        ]) ?? [],
      [edge.sections],
    );

    const additionalPoints = useMemo(() => {
      const additionalPoints: ElkPoint[] = [];
      {
        const startPoint = points[0];
        assert(startPoint);
        additionalPoints.push(startPoint);
      }
      for (let index = 0; index < points.length - 2; index++) {
        const [start, middle, end] = points.slice(index, index + 3);
        assert(start && middle && end);
        additionalPoints.push(
          midPoint(start, middle, EDGE_ROUNDED_RADIUS),
          middle,
          midPoint(end, middle, EDGE_ROUNDED_RADIUS),
        );
      }
      {
        const lastPoint = points.at(-1);
        assert(lastPoint);
        additionalPoints.push(lastPoint);
      }
      return additionalPoints;
    }, [points]);

    const d = useMemo(() => {
      if (additionalPoints.length === 0) {
        return "";
      }

      if (additionalPoints.length === 2) {
        const [start, end] = additionalPoints;
        assert(start);
        assert(end);
        return `M${start.x},${start.y} L${end.x},${end.y}`;
      }

      let path = "";
      for (
        let index = 0;
        index < additionalPoints.length - 1;
        index = index + 3
      ) {
        const [start, c1, c2, c3] = additionalPoints.slice(index, index + 4);
        if (!start) {
          return path;
        }
        if (c1 && c2 && c3) {
          path = `${path} M${start.x},${start.y} L${c1.x},${c1.y} Q${c2.x},${c2.y} ${c3.x},${c3.y}`;
        } else if (c1) {
          path = `${path} L${c1.x},${c1.y}`;
        }
      }
      return path;
    }, [additionalPoints]);

    return (
      <svg
        width={graphWidth}
        height={graphHeight}
        className="absolute inset-0 pointer-events-none hover:z-10"
      >
        <g
          className={clsx(
            // "fill-none stroke-2 group transition-all pointer-events-auto",
            "fill-none stroke-1 group transition-all pointer-events-auto",
            // "stroke-sky-500",
            // "stroke-sky-500 opacity-30 hover:opacity-100 hover:stroke-sky-400",
            // "stroke-sky-200 hover:stroke-sky-500",
            // "stroke-gray-500 opacity-30 hover:opacity-100 hover:stroke-sky-400",
            "stroke-gray-300 hover:stroke-sky-500",
          )}
          transform={`translate(${offsetX} ${offsetY})`}
        >
          <path className="stroke-[8] opacity-0" d={d}>
            <title>
              {edge.id} (from {edge.sources.join(",")} to{" "}
              {edge.targets.join(",")})
            </title>
          </path>
          <path
            className="stroke-[6] opacity-0 group-hover:opacity-100 stroke-sky-100"
            d={d}
          >
            <title>
              {edge.id} (from {edge.sources.join(",")} to{" "}
              {edge.targets.join(",")})
            </title>
          </path>
          <path d={d} />
        </g>
      </svg>
    );
  },
);
export interface MapViewV2Props {}

export const MapViewV2 = memo(({}: MapViewV2Props) => {
  const { tree, connections, nodeInfo } = useMapV2({});
  useEffect(() => {
    console.log({ tree, connections, nodeInfo });
  }, [nodeInfo]);

  // const getConnectionId = useCallback(
  //   (nodePath: string, name: string, type: "source" | "target") => {
  //     const info = nodeInfo?.get(nodePath);

  //     if (info?.type === "function") {
  //       return `${nodePath}#${type}`;
  //     }

  //     if (info?.type === "}") {
  //       return `${nodePath}#${type}`;
  //     }

  //     if (
  //       info?.type === "construct" &&
  //       info.inflights.some((inflight) => inflight.name === name)
  //     ) {
  //       return `${nodePath}#${name}#${type}`;
  //     }

  //     return nodePath;
  //   },
  //   [nodeInfo],
  // );
  const getConnectionId = useCallback(
    (connection: ConnectionData, type: "source" | "target") => {
      const info = nodeInfo?.get(connection[type]);

      if (info?.type === "function") {
        // Ignore `invokeAsync`.
        return `${connection[type]}#invoke#${type}`;
      }

      return `${connection[type]}#${(connection as any)[`${type}Op`]}#${type}`;
    },
    [nodeInfo],
  );
  // const getConnectionSource = useCallback(
  //   (connection: ConnectionData) => {
  //     const sourceInfo = nodeInfo?.get(connection.source);
  //     if (sourceInfo?.type === "function") {
  //       return `${connection.source}#source`;
  //     }
  //     if (sourceInfo?.type === "construct") {
  //       return `${connection.source}#${connection.name}#source`;
  //     }
  //     return connection.source;
  //   },
  //   [nodeInfo],
  // );

  const RenderNode = useCallback<
    FunctionComponent<{
      constructTreeNode: ConstructTreeNode;
    }>
  >(
    (props) => {
      // if (props.constructTreeNode.display?.hidden) {
      //   return <></>;
      // }
      const info = nodeInfo?.get(props.constructTreeNode.path);

      if (info?.type === "autoId") {
        return <AutoIdNode constructTreeNode={props.constructTreeNode} />;
      }

      if (info?.type === "construct") {
        return (
          <ConstructNode
            id={props.constructTreeNode.path}
            name={props.constructTreeNode.id}
            fqn={props.constructTreeNode.constructInfo?.fqn ?? ""}
            inflights={info.inflights}
            // highlight={}
          >
            {Object.values(props.constructTreeNode.children ?? {}).map(
              (child) => (
                <RenderNode key={child.id} constructTreeNode={child} />
              ),
            )}
          </ConstructNode>
        );
      }

      if (info?.type === "function") {
        return (
          <FunctionNode
            id={props.constructTreeNode.path}
            sourceOccupied={connections?.some(
              (connection) =>
                connection.source === props.constructTreeNode.path,
            )}
            targetOccupied={connections?.some(
              (connection) =>
                connection.target === props.constructTreeNode.path,
            )}
          />
        );
      }

      // if (info?.type === "queue") {
      //   return (
      //     <ConstructNode
      //       id={props.constructTreeNode.path}
      //       name={props.constructTreeNode.id}
      //       inflights={info.inflights}
      //       // highlight={}
      //     />
      //   );
      // }

      return (
        <ContainerNode
          id={props.constructTreeNode.path}
          name={props.constructTreeNode.id}
        >
          {Object.values(props.constructTreeNode.children ?? {}).map(
            (child) => (
              <RenderNode key={child.id} constructTreeNode={child} />
            ),
          )}
        </ContainerNode>
      );
    },
    [nodeInfo],
  );

  return (
    <div className="relative">
      {tree && (
        <Graph
          elk={{
            id: "root",
            layoutOptions: {
              // "elk.algorithm": "org.eclipse.elk.layered",
              // "elk.hierarchyHandling": "INCLUDE_CHILDREN",
              // "elk.layered.spacing.baseValue": `${SPACING_BASE_VALUE}`,
              // "elk.direction": "RIGHT",
              ...baseLayoutOptions,
              "elk.padding": "[top=24,left=20,bottom=20,right=20]",
            },
          }}
          // edges={connections?.map((connection) => {
          //   return {
          //     id: `${connection.source}#${connection.target}#${connection.name}`,
          //     sources: [
          //       getConnectionId(connection.source, connection.name, "source"),
          //     ],
          //     targets: [
          //       getConnectionId(connection.target, connection.name, "target"),
          //     ],
          //   };
          // })}
          edges={connections?.map((connection) => {
            return {
              id: `${connection.source}#${connection.target}#${connection.name}`,
              sources: [getConnectionId(connection, "source")],
              targets: [getConnectionId(connection, "target")],
            };
          })}
          // edges={connections?.map((connection) => {
          //   const source = `${connection.source}#${
          //     (connection as any).sourceOp
          //   }#source`;
          //   const target = `${connection.target}#${
          //     (connection as any).targetOp
          //   }#target`;
          //   return {
          //     id: `${source}##${target}`,
          //     sources: [source],
          //     targets: [target],
          //   };
          // })}
          edgeComponent={RoundedEdge}
          className="bg-gray-50"
        >
          <RenderNode constructTreeNode={tree} />
        </Graph>
      )}
    </div>
  );
});

const AutoIdNode: FunctionComponent<{
  constructTreeNode: ConstructTreeNode;
}> = (props) => {
  return (
    <Node
      elk={{
        id: props.constructTreeNode.path,
        layoutOptions: {
          "elk.portConstraints": "FIXED_SIDE",
        },
      }}
      className="inline-block"
    >
      <div
        className={clsx(
          "size-6",
          "border border-gray-300 border-dashed",
          "hover:border-sky-300 rounded-full outline-0 outline outline-sky-300 hover:outline-2",
          "transition-all",
          "shadow",
          "relative",
          "bg-white",
        )}
      >
        <Port
          elk={{
            id: `${props.constructTreeNode.path}#handle#target`,
            layoutOptions: {
              "elk.port.side": "WEST",
              "elk.port.anchor": `[-${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort />
        </Port>

        <Port
          elk={{
            id: `${props.constructTreeNode.path}#handle#source`,
            layoutOptions: {
              "elk.port.side": "EAST",
              "elk.port.anchor": `[${PORT_ANCHOR},0]`,
            },
          }}
        >
          <InflightPort />
        </Port>
      </div>
    </Node>
  );
};
