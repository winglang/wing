import type { ElkNode } from "elkjs";
import { motion } from "framer-motion";
import {
  type FunctionComponent,
  type PropsWithChildren,
  createContext,
  useContext,
  memo,
  createElement,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { assert } from "./assert.js";
import {
  NodeChildrenContext,
  type NodeChildrenProps,
} from "./node-children.js";
import { NodeContext, type NodeProps } from "./node.js";
import { PortContext, type PortProps } from "./port.js";
import type { IntrinsicElements, EdgeComponent } from "./types.js";

const DepthContext = createContext<number>(0);

const ElkNodeContext = createContext<ElkNode>({
  id: "",
});

const OriginsContext = createContext<Map<string, { x: number; y: number }>>(
  new Map(),
);

// eslint-disable-next-line unicorn/no-null
const PortalContext = createContext<HTMLElement | null>(null);

const NodeComponent = memo(
  <K extends keyof IntrinsicElements = "div">({
    elk,
    as,
    children,
    ...props
  }: Omit<
    NodeProps<K>,
    "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
  >) => {
    const portal = useContext(PortalContext);
    assert(portal);

    const depth = useContext(DepthContext);

    const parent = useContext(ElkNodeContext);
    const node = useMemo(
      () => parent.children?.find((child) => child.id === elk.id),
      [elk.id, parent.children],
    );

    const origins = useContext(OriginsContext);
    const origin = origins.get(elk.id);

    const Component = motion[as ?? "div"];
    return createPortal(
      origin && node && (
        <Component
          key={elk.id}
          {...props}
          style={{
            ...props.style,
            position: "absolute",
          }}
          initial={{
            top: origin.y,
            left: origin.x,
            width: node.width,
            height: node.height,
            zIndex: depth,
            //opacity: 0,
          }}
          animate={{
            top: origin.y,
            left: origin.x,
            width: node.width,
            height: node.height,
            zIndex: depth,
            //opacity: 1,
          }}
          //exit={{ opacity: 0 }}
        >
          {node && (
            <DepthContext.Provider value={depth + 1}>
              <ElkNodeContext.Provider key="children" value={node}>
                {children}
              </ElkNodeContext.Provider>
            </DepthContext.Provider>
          )}
        </Component>
      ),
      portal,
    );
  },
);

const NodeChildrenComponent = memo(
  <K extends keyof IntrinsicElements = "div">({
    as,
    children,
    ...props
  }: NodeChildrenProps<K>) => {
    return createElement(as ?? "div", props, children);
  },
);

const PortComponent = memo(
  <K extends keyof IntrinsicElements = "div">({
    elk,
    as,
    children,
    ...props
  }: PortProps<K>) => {
    const node = useContext(ElkNodeContext);
    const port = useMemo(
      () => node.ports?.find((port) => port.id === elk.id),
      [elk.id, node.ports],
    );
    assert(port);

    return createElement(
      as ?? "div",
      {
        ...props,
        style: {
          ...props.style,
          position: "absolute",
          top: `${port.y ?? 0}px`,
          left: `${port.x ?? 0}px`,
        },
      },
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ position: "absolute" }}>{children}</div>
      </div>,
    );
  },
);

const DefaultEdge: EdgeComponent = memo(
  ({ edge, offsetX = 0, offsetY = 0 }) => {
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
      <g transform={`translate(${offsetX} ${offsetY})`}>
        <path d={d} fill="none" stroke="black" />
      </g>
    );
  },
);

export interface GraphRendererProps {
  graph: ElkNode;
  edgeComponent?: EdgeComponent;
}

export const GraphRenderer: FunctionComponent<
  PropsWithChildren<GraphRendererProps>
> = memo((props) => {
  const Edge = props.edgeComponent ?? DefaultEdge;

  const origins = useMemo(() => {
    const origins = new Map<string, { x: number; y: number }>();
    const mapNode = (node: ElkNode, offsetX: number, offsetY: number) => {
      const x = offsetX + (node.x ?? 0);
      const y = offsetY + (node.y ?? 0);
      origins.set(node.id, { x, y });
      for (const child of Object.values(node.children ?? {})) {
        mapNode(child, x, y);
      }
    };
    mapNode(props.graph, 0, 0);
    return origins;
  }, [props.graph]);

  const portalTarget = useRef<HTMLDivElement | null>(null);
  const [portal, setPortal] = useState<HTMLDivElement | undefined>();
  useEffect(() => {
    setPortal(portalTarget.current ?? undefined);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: `${props.graph.width ?? 0}px`,
        height: `${props.graph.height ?? 0}px`,
      }}
    >
      {props.graph.edges?.map((edge) => (
        <Edge
          key={edge.id}
          edge={edge}
          offsetX={origins.get((edge as any).container)?.x}
          offsetY={origins.get((edge as any).container)?.y}
          graphWidth={props.graph.width!}
          graphHeight={props.graph.height!}
        />
      ))}

      <div ref={portalTarget} />

      {portal && (
        <OriginsContext.Provider value={origins}>
          <ElkNodeContext.Provider value={props.graph}>
            <PortalContext.Provider value={portal}>
              <NodeContext.Provider value={NodeComponent}>
                <NodeChildrenContext.Provider value={NodeChildrenComponent}>
                  <PortContext.Provider value={PortComponent}>
                    {props.children}
                  </PortContext.Provider>
                </NodeChildrenContext.Provider>
              </NodeContext.Provider>
            </PortalContext.Provider>
          </ElkNodeContext.Provider>
        </OriginsContext.Provider>
      )}
    </div>
  );
});
