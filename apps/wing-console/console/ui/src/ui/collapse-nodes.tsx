import type { ConstructTreeNode } from "@winglang/sdk/lib/core";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useMap } from "../services/use-map.js";

interface CollapseNodesContextType {
  expandNode: (nodeId: string) => void;
  collapseNode: (nodeId: string) => void;
  collapseAll: () => void;
  expandAll: () => void;
  isNodeCollapsed: (node: ConstructTreeNode) => boolean;
}

const context = createContext<CollapseNodesContextType | undefined>(undefined);

export const useCollapseNodes = () => {
  const contextValue = useContext(context);
  if (!contextValue) {
    throw new Error(
      "useCollapseNodes must be used within a CollapseNodesProvider",
    );
  }
  return contextValue;
};

export interface CollapseNodesProviderProps {
  children: ReactNode;
}

export const CollapseNodesProvider = ({
  children,
}: CollapseNodesProviderProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set<string>(),
  );

  const { rootNodes, isNodeHidden } = useMap();

  const expandAll = useCallback(() => {
    const nodeList = new Set<string>();
    if (rootNodes)
      for (const node of rootNodes) {
        const children = Object.values(node.children ?? {});
        if (children.length === 0) {
          continue;
        }
        for (const child of children) {
          if (!isNodeHidden(child.path)) {
            nodeList.add(child.path);
          }
        }
      }

    setExpandedNodes(nodeList);
  }, [setExpandedNodes, rootNodes, isNodeHidden]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set<string>());
  }, [setExpandedNodes]);

  const collapseNode = useCallback(
    (nodeId: string) => {
      setExpandedNodes((previous) => {
        previous.delete(nodeId);
        return new Set(previous);
      });
    },
    [setExpandedNodes],
  );

  const expandNode = useCallback(
    (nodeId: string) => {
      setExpandedNodes((previous) => {
        previous.add(nodeId);
        return new Set(previous);
      });
    },
    [setExpandedNodes],
  );

  const isNodeCollapsed = useCallback(
    (node: ConstructTreeNode) => {
      const children = Object.values(node.children ?? {});
      const isCollapsible = children.some((child) => !child.display?.hidden);
      if (!isCollapsible) {
        return false;
      }
      return !expandedNodes.has(node.path);
    },
    [expandedNodes],
  );

  return (
    <context.Provider
      value={{
        expandNode,
        collapseNode,
        collapseAll,
        expandAll,
        isNodeCollapsed,
      }}
    >
      {children}
    </context.Provider>
  );
};
