import type { ElkExtendedEdge, ElkNode, ElkPort } from "elkjs";
import ELK from "elkjs/lib/elk.bundled.js";
import {
  type FunctionComponent,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  memo,
  createElement,
  type RefObject,
} from "react";

import { assert } from "./assert.js";
import {
  NodeChildrenContext,
  type NodeChildrenProps,
} from "./node-children.js";
import { NodeContext, type NodeProps } from "./node.js";
import { PortContext, type PortProps } from "./port.js";
import type { ElkOptions, IntrinsicElements } from "./types.js";

const ElkNodeContext = createContext<ElkNode>({
  id: "",
});

const NodeRefContext = createContext<RefObject<Element> | undefined>(undefined);

const NodeComponent = <K extends keyof IntrinsicElements = "div">({
  elk,
  as,
  children,
  ...props
}: NodeProps<K>) => {
  const [node] = useState<ElkNode>(() => ({
    ...elk,
  }));

  const parent = useContext(ElkNodeContext);
  useEffect(() => {
    parent.children =
      parent.children?.filter((child) => child.id !== elk.id) ?? [];
    parent.children.push(node);
    return () => {
      parent.children =
        parent.children?.filter((child) => child.id !== elk.id) ?? [];
    };
  });

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    node.layoutOptions = {
      ...node.layoutOptions,
      "elk.nodeSize.constraints": "MINIMUM_SIZE",
      "elk.nodeSize.minimum": `[${rect?.width ?? 0}, ${rect?.height ?? 0}]`,
    };
  });

  return createElement(
    as ?? "div",
    { ...props, style: { ...props.style, position: "relative" }, ref },
    <ElkNodeContext.Provider value={node}>
      <NodeRefContext.Provider value={ref}>{children}</NodeRefContext.Provider>
    </ElkNodeContext.Provider>,
  );
};

const NodeChildrenComponent = <K extends keyof IntrinsicElements = "div">({
  as,
  children,
  ...props
}: NodeChildrenProps<K>) => {
  const node = useContext(ElkNodeContext);

  const nodeRef = useContext(NodeRefContext);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nodeRect = nodeRef?.current?.getBoundingClientRect();
    assert(nodeRect);
    const childrenRect = ref.current?.getBoundingClientRect();
    assert(childrenRect);
    const padding = {
      top: childrenRect.top - nodeRect.top,
      left: childrenRect.left - nodeRect.left,
      bottom: nodeRect.bottom - childrenRect.bottom,
      right: nodeRect.right - childrenRect.right,
    };
    node.layoutOptions = {
      ...node.layoutOptions,
      "elk.padding": `[top=${padding.top},left=${padding.left},bottom=${padding.bottom},right=${padding.right}]`,
    };
  });

  return createElement(as ?? "div", { ...props, ref }, children);
};

const PortComponent = <K extends keyof IntrinsicElements = "div">({
  elk,
  as,
  children,
  ...props
}: PortProps<K>) => {
  const [port] = useState<ElkPort>(() => ({
    ...elk,
  }));

  const parent = useContext(ElkNodeContext);
  useEffect(() => {
    parent.ports = parent.ports?.filter((child) => child.id !== elk.id) ?? [];
    parent.ports.push(port);
    return () => {
      parent.ports = parent.ports?.filter((child) => child.id !== elk.id) ?? [];
    };
  });

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    port.layoutOptions = {
      ...port.layoutOptions,
      "elk.nodeSize.constraints": "MINIMUM_SIZE",
      "elk.nodeSize.minimum": `[${rect?.width ?? 0}, ${rect?.height ?? 0}]`,
    };
  });

  return createElement(
    as ?? "div",
    { ...props, style: { ...props.style, position: "absolute" }, ref },
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

export interface GraphGeneratorProps {
  elk: ElkOptions;
  edges?: ElkExtendedEdge[];
  onGraph?: (graph: ElkNode) => void;
}

export const GraphGenerator: FunctionComponent<
  PropsWithChildren<GraphGeneratorProps>
> = memo((props) => {
  const [root] = useState<ElkNode>(() => ({
    ...props.elk,
  }));

  const [jsonGraph, setJsonGraph] = useState<string>();
  useEffect(() => {
    const nodeMap = new Map<string, ElkNode>();
    const processNode = (node: ElkNode) => {
      nodeMap.set(node.id, node);
      for (const port of node.ports ?? []) {
        nodeMap.set(port.id, port);
      }
      for (const child of node.children ?? []) {
        processNode(child);
      }
    };
    processNode(root);
    const edges = (props.edges ?? []).filter((edge) => {
      return (
        edge.sources.every((source) => {
          const exists = nodeMap.has(source);
          if (!exists) {
            console.warn(`Edge source ${source} does not exist in node map`);
          }
          return exists;
        }) &&
        edge.targets.every((target) => {
          const exists = nodeMap.has(target);
          if (!exists) {
            console.warn(`Edge target ${target} does not exist in node map`);
          }
          return exists;
        })
      );
    });

    setJsonGraph(() => {
      // Remove $H properties from JSON and sort children by id.
      const processNode = (node: ElkNode) => {
        delete (node as any).$H;
        const children = node.children ?? [];
        node.children = children.sort((a, b) => a.id.localeCompare(b.id));
        for (const child of node.children) {
          processNode(child);
        }
      };

      processNode(root);

      return JSON.stringify({ ...root, edges });
    });
  });

  useEffect(() => {
    if (!jsonGraph) {
      return;
    }

    let abort = false;

    const elk = new ELK();

    void elk
      .layout(JSON.parse(jsonGraph))
      .then((graph) => {
        if (abort) {
          return;
        }

        props.onGraph?.(graph);
      })
      .catch((error) => console.error("elk layout error:", error));
    return () => {
      abort = true;
    };
  }, [jsonGraph]);

  return (
    <ElkNodeContext.Provider value={root}>
      <NodeContext.Provider value={NodeComponent}>
        <NodeChildrenContext.Provider value={NodeChildrenComponent}>
          <PortContext.Provider value={PortComponent}>
            {props.children}
          </PortContext.Provider>
        </NodeChildrenContext.Provider>
      </NodeContext.Provider>
    </ElkNodeContext.Provider>
  );
});
