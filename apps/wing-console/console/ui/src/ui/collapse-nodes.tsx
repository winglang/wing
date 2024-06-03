import type { ConstructTreeNode } from "@winglang/sdk/lib/core";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

import type { Node } from "../shared/Node.js";

interface CollapseNodesContextType {
  collapsedNodes: Set<string>;
  expandedNodes: Set<string>;
  expandNode: (nodeId: string) => void;
  collapseNode: (nodeId: string) => void;
  collapseAll: () => void;
  expandAll: () => void;
  setNodeList: (nodes: Set<string>) => void;
  isNodeCollapsed: (node: ConstructTreeNode) => boolean;
}

const context = createContext<CollapseNodesContextType | undefined>(undefined);

export type DefaultBehavior = "collapsed" | "expanded";

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
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(
    new Set<string>(),
  );

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set<string>(),
  );

  const [nodeList, setNodeList] = useState<Set<string>>(new Set<string>());

  const expandAll = useCallback(() => {
    setCollapsedNodes(new Set<string>());
    setExpandedNodes(nodeList);
  }, [setCollapsedNodes, setExpandedNodes, nodeList]);

  const collapseAll = useCallback(() => {
    setCollapsedNodes(nodeList);
    setExpandedNodes(new Set<string>());
  }, [nodeList, setCollapsedNodes]);

  const collapseNode = useCallback(
    (nodeId: string) => {
      setCollapsedNodes((previous) => {
        previous.add(nodeId);
        return new Set(previous);
      });
      setExpandedNodes((previous) => {
        previous.delete(nodeId);
        return new Set(previous);
      });
    },
    [setCollapsedNodes],
  );

  const expandNode = useCallback(
    (nodeId: string) => {
      setExpandedNodes((previous) => {
        previous.add(nodeId);
        return new Set(previous);
      });
      setCollapsedNodes((previous) => {
        previous.delete(nodeId);
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
        collapsedNodes,
        expandedNodes,
        expandNode,
        collapseNode,
        setNodeList,
        collapseAll,
        expandAll,
        isNodeCollapsed,
      }}
    >
      {children}
    </context.Provider>
  );
};
