import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

interface CollapseNodesContextType {
  collapsedNodes: Set<string>;
  setCollapsedNodes: (nodes: Set<string>) => void;
  collapseAll: () => void;
  expandAll: () => void;
  setNodeList: (nodes: Set<string>) => void;
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
  defaultBehavior?: DefaultBehavior;
}

export const CollapseNodesProvider = ({
  children,
  defaultBehavior = "collapsed",
}: CollapseNodesProviderProps) => {
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(
    defaultBehavior === "collapsed" ? new Set<string>() : new Set<string>(),
  );
  const [nodeList, setNodeList] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    if (defaultBehavior === "expanded") {
      setCollapsedNodes(new Set<string>());
    } else if (defaultBehavior === "collapsed") {
      setCollapsedNodes(nodeList);
    }
  }, [nodeList, defaultBehavior]);

  const expandAll = useCallback(() => {
    setCollapsedNodes(new Set<string>());
  }, [setCollapsedNodes]);

  const collapseAll = useCallback(() => {
    setCollapsedNodes(nodeList);
  }, [nodeList, setCollapsedNodes]);

  return (
    <context.Provider
      value={{
        collapsedNodes,
        setCollapsedNodes,
        setNodeList,
        collapseAll,
        expandAll,
      }}
    >
      {children}
    </context.Provider>
  );
};
