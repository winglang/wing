import { useCallback, useState } from "react";

import { TreeMenuItem } from "../design-system/TreeMenu";

export function useTreeMenuItems(options?: {
  treeMenuItems?: TreeMenuItem[];
  selectedItemId?: string;
  openMenuItemIds?: string[];
}) {
  const [items, setItems] = useState(options?.treeMenuItems ?? []);

  const [currentItemId, setCurrent] = useState(options?.selectedItemId);
  const [openItemIds, setOpenMenuItemIds] = useState(
    options?.openMenuItemIds ?? [],
  );
  const toggle = (itemId: string) => {
    setOpenMenuItemIds(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(itemId);
      if (index !== -1) {
        openedMenuItems.splice(index, 1);
        return openedMenuItems;
      }

      openedMenuItems.push(itemId);
      return openedMenuItems;
    });
  };

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

    setOpenMenuItemIds(itemIds);
  }, [items]);

  const collapseAll = () => {
    setOpenMenuItemIds([]);
  };

  const expand = (itemId: string) => {
    setOpenMenuItemIds(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(itemId);
      if (index !== -1) {
        return openedMenuItems;
      }

      openedMenuItems.push(itemId);
      return openedMenuItems;
    });
  };

  return {
    items,
    setItems,
    currentItemId,
    setCurrent,
    openItemIds,
    toggle,
    expandAll,
    collapseAll,
    expand,
  };
}
