import type { ElkNode } from "elkjs";
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

import { assert } from "./assert.js";
import {
  NodeChildrenContext,
  type NodeChildrenProps,
} from "./node-children.js";
import { NodeContext, type NodeProps } from "./node.js";
import { PortContext, type PortProps } from "./port.js";
import { createPrependPortal } from "./preprend-portal.js";
import type { IntrinsicElements, EdgeComponent } from "./types.js";

const ElkNodeContext = createContext<ElkNode>({
  id: "",
});

const OriginsContext = createContext<Map<string, { x: number; y: number }>>(
  new Map(),
);

// eslint-disable-next-line unicorn/no-null
const PortalContext = createContext<HTMLElement | null>(null);

const NodeComponent = <K extends keyof IntrinsicElements = "div">({
  elk,
  as,
  children,
  ...props
}: NodeProps<K>) => {
  const portal = useContext(PortalContext);
  assert(portal);

  const parent = useContext(ElkNodeContext);
  const node = useMemo(
    () => parent.children?.find((child) => child.id === elk.id),
    [elk.id, parent.children],
  );

  const origins = useContext(OriginsContext);
  const origin = origins.get(elk.id);

  return createPrependPortal(
    createElement(
      as ?? "div",
      {
        ...props,
        style: {
          ...props.style,
          position: "absolute",
          // top: `${node.y ?? 0}px`,
          // left: `${node.x ?? 0}px`,
          top: `${origin?.y ?? 0}px`,
          left: `${origin?.x ?? 0}px`,
          width: `${node?.width ?? 0}px`,
          height: `${node?.height ?? 0}px`,
          // transform: `translate(${origin?.x ?? 0}px, ${origin?.y ?? 0}px)`,
        },
      },
      node ? (
        <ElkNodeContext.Provider key="children" value={node}>
          {children}
        </ElkNodeContext.Provider>
      ) : (
        <></>
      ),
    ),
    portal,
  );
};

const NodeChildrenComponent = <K extends keyof IntrinsicElements = "div">({
  as,
  children,
  ...props
}: NodeChildrenProps<K>) => {
  return createElement(as ?? "div", props, children);
};

const PortComponent = <K extends keyof IntrinsicElements = "div">({
  elk,
  as,
  children,
  ...props
}: PortProps<K>) => {
  const node = useContext(ElkNodeContext);
  const port = useMemo(
    () => node.ports?.find((port) => port.id === elk.id),
    [],
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
};

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
      {/* <svg
        width={props.graph.width}
        height={props.graph.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
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
      </svg> */}
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
