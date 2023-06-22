import { ReactNode, useCallback, useState } from "react";

export interface TreeMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  secondaryLabel?: string | ReactNode | ((item: TreeMenuItem) => ReactNode);
  children?: TreeMenuItem[];
}

export function useTreeMenuItems(options?: {
  treeMenuItems?: TreeMenuItem[];
  selectedItemIds?: string[];
  openMenuItemIds?: string[];
}) {
  const [items, setItems] = useState(options?.treeMenuItems ?? []);

  const [selectedItems, setSelectedItems] = useState(
    () => options?.selectedItemIds ?? [],
  );
  const [expandedItems, setExpandedItems] = useState(
    options?.openMenuItemIds ?? [],
  );
  const toggle = useCallback((itemId: string) => {
    setExpandedItems(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(itemId);
      if (index !== -1) {
        openedMenuItems.splice(index, 1);
        return openedMenuItems;
      }

      openedMenuItems.push(itemId);
      return openedMenuItems;
    });
  }, []);

  const expandAll = useCallback(() => {
    const itemIds = [];
    const stack = [...items];
    while (stack.length > 0) {
      const item = stack.pop();
      if (!item) {
        continue;
      }

      itemIds.push(item.id);

      if (item.children) {
        stack.push(...item.children);
      }
    }

    setExpandedItems(itemIds);
  }, [items]);

  const collapseAll = useCallback(() => {
    setExpandedItems([]);
  }, []);

  const expand = useCallback((itemId: string) => {
    setExpandedItems(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(itemId);
      if (index !== -1) {
        return openedMenuItems;
      }

      openedMenuItems.push(itemId);
      return openedMenuItems;
    });
  }, []);

  return {
    items,
    setItems,
    selectedItems,
    setSelectedItems,
    expandedItems,
    setExpandedItems,
    toggle,
    expandAll,
    collapseAll,
    expand,
  };
}
