import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
} from "react";

import { useControlled } from "../utils/use-controlled.js";

import { treeContext } from "./tree-context.js";

const rootItemId = Symbol("root");

export interface TreeViewProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  "data-testid"?: string;
  defaultSelectedItems?: string[];
  defaultExpandedItems?: string[];
  expandedItems?: string[];
  selectedItems?: string[];
  onSelectedItemsChange?: (itemIds: string[]) => void;
  onExpandedItemsChange?: (itemIds: string[]) => void;
}

export const TreeView = ({
  expandedItems: expandedItemsProperty,
  selectedItems: selectedItemsProperty,
  defaultExpandedItems,
  defaultSelectedItems,
  onSelectedItemsChange,
  onExpandedItemsChange,
  children,
  ...props
}: PropsWithChildren<TreeViewProps>) => {
  const [expandedItems, setExpandedItems] = useControlled({
    controlled: expandedItemsProperty,
    default: defaultExpandedItems ?? [],
    onChange: onExpandedItemsChange,
  });
  const toggleItemExpanded = useCallback(
    (itemId: string) => {
      setExpandedItems(([...expanded]) => {
        const itemIndex = expanded.indexOf(itemId);
        if (itemIndex === -1) {
          return [...expanded, itemId];
        }

        expanded.splice(itemIndex, 1);
        return expanded;
      });
    },
    [setExpandedItems],
  );

  const [itemRecord, setItemRecord] = useState<
    Record<
      symbol | string,
      {
        parentItem: string | undefined;
        children: string[];
        element: HTMLElement | undefined;
      }
    >
  >(() => ({
    [rootItemId]: {
      parentItem: undefined,
      children: [],
      element: undefined,
    },
  }));

  const registerItem = useCallback(
    (
      itemId: string,
      {
        parentItem,
        element,
      }: { parentItem: string | undefined; element: HTMLElement },
    ) => {
      setItemRecord(({ ...itemRecord }) => {
        itemRecord[itemId] = {
          parentItem,
          children: itemRecord[itemId]?.children ?? [],
          element,
        };

        const parent = itemRecord[parentItem ?? rootItemId];
        const siblings = parent?.children ?? [];
        itemRecord[parentItem ?? rootItemId] = {
          parentItem,
          element: undefined,
          ...parent,
          children: [...siblings, itemId],
        };
        return itemRecord;
      });
    },
    [],
  );
  const unregisterItem = useCallback((itemId: string) => {
    setItemRecord(({ ...itemRecord }) => {
      const { parentItem } = itemRecord[itemId] ?? {};
      if (parentItem) {
        const parentInfo = itemRecord[parentItem];
        if (parentInfo) {
          const { children } = itemRecord[parentItem] ?? {};
          if (children) {
            const itemIndex = children.indexOf(itemId);
            if (itemIndex !== -1) {
              children.splice(itemIndex, 1);
            }
            itemRecord[parentItem] = {
              ...parentInfo,
              children,
            };
          }
        }
      }
      delete itemRecord[itemId];
      return itemRecord;
    });
  }, []);

  const [focusedItem, setFocusedItem] = useState(defaultSelectedItems?.[0]);
  const [selectedItems, setSelectedItems] = useControlled({
    controlled: selectedItemsProperty,
    default: defaultSelectedItems ?? [],
    onChange: onSelectedItemsChange,
  });

  const findFirstVisibleChild = useCallback(
    (itemId: string) => {
      if (!expandedItems.includes(itemId)) {
        return;
      }

      const item = itemRecord[itemId];
      const { children } = item ?? {};
      return children?.[0];
    },
    [itemRecord, expandedItems],
  );

  const findSiblings = useCallback(
    (itemId: string) => {
      const item = itemRecord[itemId];
      const { parentItem } = item ?? {};
      const parent = itemRecord[parentItem ?? rootItemId];
      const { children: siblings } = parent ?? {};
      return siblings;
    },
    [itemRecord],
  );

  const findNextSibling = useCallback(
    (itemId: string, direction: "up" | "down") => {
      const siblings = findSiblings(itemId);
      if (!siblings) {
        return;
      }

      const itemIndex = siblings.indexOf(itemId);
      if (itemIndex === -1) {
        return;
      }

      if (direction === "up") {
        return siblings[itemIndex - 1];
      }

      return siblings[itemIndex + 1];
    },
    [findSiblings],
  );

  const findFirstVisibleItem = useCallback(() => {
    return itemRecord[rootItemId]?.children[0];
  }, [itemRecord]);

  const findLatestVisibleItem = useCallback(
    (itemId: string | undefined): string | undefined => {
      const item = itemRecord[itemId ?? rootItemId];
      if (!item) {
        return;
      }

      if (itemId && !expandedItems.includes(itemId)) {
        return itemId;
      }

      const { children } = item;
      if (children.length === 0) {
        return itemId;
      }

      return findLatestVisibleItem(children[children.length - 1]);
    },
    [itemRecord, expandedItems],
  );

  const findNextItem = useCallback(
    (direction: "up" | "down") => {
      if (!focusedItem) {
        return findFirstVisibleItem();
      }

      if (direction === "down") {
        let stack = [focusedItem];
        do {
          const itemId = stack.pop();
          if (!itemId) {
            throw new Error("Empty itemId");
          }

          const item = itemRecord[itemId];
          if (!item) {
            throw new Error(`No item found for id ${itemId}`);
          }

          // If item is expanded, we want to go to the first child.
          // If item is not expanded, we want to go to the next sibling.
          // If item is not the last child, we want to go to the next sibling.
          const nextItem =
            findFirstVisibleChild(itemId) ?? findNextSibling(itemId, direction);
          if (nextItem) {
            return nextItem;
          }

          if (item.parentItem) {
            const parentsNextSibling = findNextSibling(
              item.parentItem,
              direction,
            );
            if (parentsNextSibling) {
              return parentsNextSibling;
            }
          }
        } while (stack.length > 0);

        return focusedItem;
      } else {
        const item = itemRecord[focusedItem];
        const nextSibling = findNextSibling(focusedItem, direction);
        return (
          (nextSibling ? findLatestVisibleItem(nextSibling) : undefined) ??
          nextSibling ??
          item?.parentItem ??
          focusedItem
        );
      }
    },
    [
      itemRecord,
      focusedItem,
      findFirstVisibleChild,
      findNextSibling,
      findFirstVisibleItem,
      findLatestVisibleItem,
    ],
  );

  useEffect(() => {
    setFocusedItem((focusedItem) => {
      return focusedItem ?? findFirstVisibleItem();
    });
  }, [itemRecord, findFirstVisibleItem]);

  const focusOnItem = useCallback(
    (itemId: string | undefined) => {
      if (!itemId) {
        return;
      }

      const { element } = itemRecord[itemId] ?? {};
      element?.focus();
    },
    [itemRecord],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      // See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tree_role#keyboard_interactions.
      if (!focusedItem) {
        return;
      }

      const item = itemRecord[focusedItem];
      const children = item?.children ?? [];
      const expanded = expandedItems.includes(focusedItem);
      switch (event.key) {
        case "ArrowRight": {
          event.preventDefault();
          if (children.length > 0 && !expanded) {
            // When focus is on a closed node, opens the node; focus does not move.
            toggleItemExpanded(focusedItem);
          } else if (children.length > 0) {
            // When focus is on an open node, moves focus to the first child node.
            const nextItem = children[0];
            setFocusedItem(nextItem);
            focusOnItem(nextItem);
          } else {
            // When focus is on an end node (a tree item with no children), does nothing.
          }
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          const { parentItem } = item ?? {};
          if (children.length > 0 && expanded) {
            // When focus is on an open node, closes the node.
            toggleItemExpanded(focusedItem);
          } else if (parentItem) {
            // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
            setFocusedItem(parentItem);
            focusOnItem(parentItem);
          } else {
            // When focus is on a closed `tree`, does nothing.
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          // Moves focus to the previous node that is focusable without opening or closing a node.
          const nextItem = findNextItem("up");
          setFocusedItem(nextItem);
          focusOnItem(nextItem);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          // Moves focus to the next node that is focusable without opening or closing a node.
          const nextItem = findNextItem("down");
          setFocusedItem(nextItem);
          focusOnItem(nextItem);
          break;
        }
        case "Home": {
          event.preventDefault();
          // Moves focus to the first node in the tree without opening or closing a node.
          const nextItem = findFirstVisibleItem();
          setFocusedItem(nextItem);
          focusOnItem(nextItem);
          break;
        }
        case "End": {
          event.preventDefault();
          // Moves focus to the last node in the tree that is focusable without opening the node.
          const nextItem = findLatestVisibleItem(undefined);
          setFocusedItem(nextItem);
          focusOnItem(nextItem);
          break;
        }
        case "Enter": {
          setSelectedItems([focusedItem]);
          break;
        }
      }
    },
    [
      expandedItems,
      findFirstVisibleItem,
      findLatestVisibleItem,
      findNextItem,
      focusedItem,
      itemRecord,
      toggleItemExpanded,
      focusOnItem,
      setSelectedItems,
    ],
  );

  return (
    <ul {...props} role="tree">
      <treeContext.Provider
        value={{
          expandedItems,
          toggleItemExpanded,
          registerItem,
          unregisterItem,
          focusedItem,
          setFocusedItem,
          selectedItems,
          setSelectedItems,
          onKeyDown,
        }}
      >
        {children}
      </treeContext.Provider>
    </ul>
  );
};
