import { ResourceIcon } from "@wingconsole/design-system";
import type { ExplorerItem } from "@wingconsole/server";
import { useCallback, useEffect } from "react";

import type { TreeMenuItem } from "../ui/use-tree-menu-items.js";
import { useTreeMenuItems } from "../ui/use-tree-menu-items.js";

import { trpc } from "./trpc.js";

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
      />
    ) : undefined,
    children: item.childItems?.map((item) =>
      createTreeMenuItemFromExplorerTreeItem(item),
    ),
  };
};

export const useExplorer = () => {
  const {
    items,
    setItems,
    selectedItems,
    setSelectedItems,
    expandedItems,
    setExpandedItems,
    expand,
    expandAll,
    collapseAll,
  } = useTreeMenuItems({
    selectedItemIds: ["root"],
  });

  const tree = trpc["app.explorerTree"].useQuery();

  const { mutate: setSelectedNode } = trpc["app.selectNode"].useMutation();
  const selectedNode = trpc["app.selectedNode"].useQuery();
  const nodeIds = trpc["app.nodeIds"].useQuery();

  const onSelectedItemsChange = useCallback(
    (selectedItems: string[]) => {
      setSelectedItems(selectedItems);
      setSelectedNode({
        resourcePath: selectedItems[0] ?? "",
      });
    },
    [setSelectedNode, setSelectedItems],
  );

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

    if (!selectedNode.data || !nodeIds.data?.includes(selectedNode.data)) {
      setSelectedNode({
        resourcePath: "root",
      });
    }
  }, [selectedNode.data, nodeIds.data, setSelectedNode]);

  useEffect(() => {
    if (!selectedNode.data) {
      return;
    }
    setSelectedItems([selectedNode.data]);
  }, [selectedNode.data, setSelectedItems]);

  useEffect(() => {
    expandAll();
  }, [items, expandAll]);

  return {
    items,
    selectedItems,
    setSelectedItems: onSelectedItemsChange,
    expandedItems,
    setExpandedItems,
    expand,
    expandAll,
    collapseAll,
  };
};
