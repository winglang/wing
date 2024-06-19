import { ResourceIcon } from "@wingconsole/design-system";
import type { ExplorerItem } from "@wingconsole/server";
import uniqBy from "lodash.uniqby";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { trpc } from "../../trpc.js";
import { RunningStateIndicator } from "../running-state-indicator/running-state-indicator.js";
import { useSelectionContext } from "../selection-context/selection-context.js";

export interface TreeMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  secondaryLabel?: string | ReactNode | (() => ReactNode);
  children?: TreeMenuItem[];
  expanded?: boolean;
}

const createTreeMenuItemFromExplorerTreeItem = (
  item: ExplorerItem,
): TreeMenuItem => {
  return {
    id: item.id,
    label: item.label,
    icon: item.type ? (
      <ResourceIcon
        resourceType={item.type}
        resourcePath={item.id}
        className="w-4 h-4"
        color={item.display?.color}
        icon={item.display?.icon}
      />
    ) : undefined,
    expanded: item.display?.expanded,
    secondaryLabel: (
      <RunningStateIndicator runningState={item.hierarchichalRunningState} />
    ),
    children: item.childItems?.map((item) =>
      createTreeMenuItemFromExplorerTreeItem(item),
    ),
  };
};

export const useHierarchy = () => {
  const [items, setItems] = useState<TreeMenuItem[] | undefined>();

  const { setSelectedItems, setExpandedItems, setAvailableItems } =
    useSelectionContext();

  useEffect(() => {
    setAvailableItems(items ?? []);
  }, [items, setAvailableItems]);

  const tree = trpc["app.explorerTree"].useQuery();

  const [selectedNode, setSelectedNode] = useState<string>("");

  const nodeIds = trpc["app.nodeIds"].useQuery();

  useEffect(() => {
    if (!tree.data) {
      return;
    }
    // Remove the root node by taking the children.
    const items = createTreeMenuItemFromExplorerTreeItem(tree.data).children;
    setItems(items ?? []);
  }, [tree.data, setItems]);

  useEffect(() => {
    if (!nodeIds.data) {
      return;
    }

    if (!selectedNode || !nodeIds.data?.includes(selectedNode)) {
      setSelectedNode("");
    }
  }, [selectedNode, nodeIds.data, setSelectedNode]);

  useEffect(() => {
    if (!selectedNode) {
      return;
    }
    setSelectedItems([selectedNode]);
  }, [selectedNode, setSelectedItems]);

  // Expand items that are marked as expanded in the source code (only the first time they appear here).
  // The rest of the time, the user's interaction with the tree menu will be handled by the useTreeMenuItems hook.
  const processedItems = useRef(new Array<string>());
  useEffect(() => {
    const getDefaultExpandedItems = (items: TreeMenuItem[]): string[] => {
      let expandedNodes: string[] = [];
      for (const item of items) {
        // Expand if explicitely set to be expanded, or if there is only one item and it is not explicitly set to be collapsed.
        if (
          item.expanded === true ||
          (items.length === 1 && item.expanded !== false)
        ) {
          expandedNodes.push(item.id);
        }
        if (item.children && item.children.length > 0) {
          expandedNodes = [
            ...expandedNodes,
            ...getDefaultExpandedItems(item.children),
          ];
        }
      }
      return expandedNodes;
    };
    const defaultExpandedItems = getDefaultExpandedItems(items ?? []);

    const shouldExpandItems = defaultExpandedItems.filter(
      (id) => !processedItems.current.includes(id),
    );

    setExpandedItems((expandedItems) =>
      uniqBy([...expandedItems, ...shouldExpandItems], (id) => id),
    );

    processedItems.current = uniqBy(
      [...processedItems.current, ...shouldExpandItems],
      (id) => id,
    );
  }, [items, processedItems, setExpandedItems]);

  return {
    items,
  };
};
