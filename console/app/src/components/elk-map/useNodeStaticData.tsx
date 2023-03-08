import classNames from "classnames";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

import { NodeItemProps } from "./ElkMap.js";
import { Node } from "./Node.js";

export interface NodeStaticDataOptions<T> {
  /**
   * The list of nodes.
   */
  nodes: Node<T>[];

  /**
   * The function that renders a node.
   */
  node: FC<NodeItemProps<T>>;
}

/**
 * Generate data such as sizes, port positions and more for each node.
 */
export const useNodeStaticData = <T,>({
  nodes,
  node: NodeItem,
}: NodeStaticDataOptions<T>) => {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [sizes, setSizes] =
    useState<Record<string, { width: number; height: number }>>();
  useEffect(() => {
    const timestamp = Date.now();

    const renderNode = (node: Node<T>, depth = 0) => {
      return (
        <Fragment key={node.id}>
          <div className="inline-block">
            <div
              className={classNames("h-full relative")}
              ref={(element) => (refs.current[node.id] = element)}
            >
              <NodeItem node={node} depth={depth} />
            </div>
          </div>
          {node.children?.map((node) => renderNode(node, depth + 1))}
        </Fragment>
      );
    };

    const element = document.createElement("div");
    element.classList.add("absolute", "invisible");
    ReactDOM.createRoot(element).render(
      <>{nodes.map((node) => renderNode(node))}</>,
    );
    document.body.append(element);
    console.debug("[useNodeSizes] rendered in", Date.now() - timestamp, "ms");

    let timeout: NodeJS.Timeout | undefined;
    const computeSizes = () => {
      setSizes(() => {
        console.debug(
          "[useNodeSizes] gather sizes",
          Object.entries(refs.current),
        );
        const sizes: Record<string, { width: number; height: number }> = {};
        for (const [nodeId, element] of Object.entries(refs.current)) {
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          sizes[nodeId] = {
            width: rect.width,
            height: rect.height,
          };
        }
        return sizes;
      });
    };

    timeout = setTimeout(() => {
      computeSizes();
    }, 1);

    return () => {
      clearTimeout(timeout);
      element.remove();
    };
  }, [nodes, setSizes]);

  const [nodeRecord, setNodeRecord] = useState<Record<string, Node<T>>>();
  useEffect(() => {
    const nodeRecord: Record<string, any> = {};
    const visit = (node: Node<T>) => {
      nodeRecord[node.id] = node;
      for (const child of node.children ?? []) {
        visit(child);
      }
    };
    for (const node of nodes) {
      visit(node);
    }
    setNodeRecord(nodeRecord);
  }, [nodes]);

  return {
    sizes,
    nodeRecord,
  };
};
