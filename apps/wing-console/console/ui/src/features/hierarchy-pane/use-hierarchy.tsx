import { ResourceIcon } from "@wingconsole/design-system";
import type { ExplorerItem } from "@wingconsole/server";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { trpc } from "../../trpc.js";
import { useSelectionContext } from "../selection-context/selection-context.js";

export interface TreeMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  secondaryLabel?: string | ReactNode | ((item: TreeMenuItem) => ReactNode);
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

  useEffect(() => {
    // Expand automatically if there is only one item and it is not explicitly set to be collapsed.
    if (items?.length === 1 && items[0] && items[0].expanded !== false) {
      setExpandedItems([items[0].id]);
      return;
    }
    const getExpandedNodes = (items: TreeMenuItem[]): string[] => {
      let expandedNodes: string[] = [];
      for (const item of items) {
        if (item.expanded === true) {
          expandedNodes.push(item.id);
        }
        if (item.children && item.children.length > 0) {
          expandedNodes = [
            ...expandedNodes,
            ...getExpandedNodes(item.children),
          ];
        }
      }
      return expandedNodes;
    };

    setExpandedItems(getExpandedNodes(items ?? []));
  }, [items, setExpandedItems]);

  return {
    items,
  };
};
