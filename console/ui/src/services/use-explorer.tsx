import { ResourceIcon } from "@wingconsole/design-system";
import { ExplorerItem } from "@wingconsole/server";
import { useEffect } from "react";

import { TreeMenuItem, useTreeMenuItems } from "../ui/use-tree-menu-items.js";
import { trpc } from "../utils/trpc.js";

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
  useEffect(() => {
    if (!tree.data) {
      return;
    }
    setItems([createTreeMenuItemFromExplorerTreeItem(tree.data)]);
    setSelectedItems(["root"]);
  }, [tree.data, setItems, setSelectedItems]);

  useEffect(() => {
    expandAll();
  }, [items, expandAll]);

  return {
    items,
    selectedItems,
    setSelectedItems,
    expandedItems,
    setExpandedItems,
    expand,
    expandAll,
    collapseAll,
  };
};
