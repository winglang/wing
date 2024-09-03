import { motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { PropsWithChildren, ReactNode, KeyboardEvent } from "react";

import { useTreeContext } from "./tree-context.js";

interface TreeItemContext {
  itemId: string | undefined;
  indentation: number;
}

const treeItemContext = createContext<TreeItemContext>({
  itemId: undefined,
  indentation: 0,
});

interface UseTreeItemOptions {
  itemId: string;
}

const useTreeItem = ({ itemId }: UseTreeItemOptions) => {
  const ref = useRef<HTMLLIElement>(null);
  const {
    expandedItems,
    toggleItemExpanded,
    registerItem,
    unregisterItem,
    focusedItem,
    setFocusedItem,
    selectedItems,
    setSelectedItems,
  } = useTreeContext();
  const { itemId: parentItem } = useContext(treeItemContext);
  useEffect(() => {
    registerItem(itemId, { parentItem, element: ref.current! });
    return () => {
      unregisterItem(itemId);
    };
  }, [itemId, parentItem, registerItem, unregisterItem]);

  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setExpanded(expandedItems.includes(itemId));
  }, [itemId, expandedItems, setExpanded]);

  const toggleExpanded = useCallback(() => {
    toggleItemExpanded(itemId);
  }, [itemId, toggleItemExpanded]);

  const focused = useMemo(() => itemId === focusedItem, [itemId, focusedItem]);
  const setFocused = useCallback(() => {
    setFocusedItem(itemId);
  }, [itemId, setFocusedItem]);

  const selected = useMemo(
    () => selectedItems.includes(itemId),
    [itemId, selectedItems],
  );
  const setSelected = useCallback(() => {
    // Here we assume that the tree is single-select.
    // TODO: Add support for multi-select.
    setSelectedItems([itemId]);
  }, [itemId, setSelectedItems]);

  return {
    ref,
    expanded,
    toggleExpanded,
    focused,
    setFocused,
    setSelected,
    selected,
  };
};

export interface TreeItemRenderContext {
  expanded: boolean;
  canBeExpanded: boolean;
  focused: boolean;
  selected: boolean;
  indentation: number;
  toggleExpanded(): void;
}

export interface TreeItemProps {
  itemId: string;
  content?: ReactNode | ((context: TreeItemRenderContext) => JSX.Element);
  id?: string;
  className?: string;
  "data-testid"?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export const TreeItem = ({
  itemId,
  content: Content,
  children,
  ...props
}: PropsWithChildren<TreeItemProps>) => {
  const { onKeyDown } = useTreeContext();

  const { indentation } = useContext(treeItemContext);

  const {
    ref,
    expanded,
    toggleExpanded,
    focused,
    setFocused,
    setSelected,
    selected,
  } = useTreeItem({
    itemId,
  });
  const canBeExpanded = !!children;

  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selected, ref]);

  return (
    <li
      ref={ref}
      {...props}
      role="treeitem"
      tabIndex={focused ? 0 : -1}
      aria-selected={selected}
      aria-expanded={canBeExpanded ? expanded : undefined}
      onClick={(event) => {
        // Avoid triggering parent handlers.
        event.stopPropagation();
        setFocused();
        setSelected();
      }}
      onKeyDown={(event) => {
        // Avoid triggering parent handlers.
        event.stopPropagation();
        onKeyDown(event);
        props.onKeyDown?.(event);
      }}
    >
      {Content && typeof Content === "function" && (
        <Content
          expanded={expanded}
          focused={focused}
          selected={selected}
          indentation={indentation}
          canBeExpanded={canBeExpanded}
          toggleExpanded={toggleExpanded}
        />
      )}
      {Content && typeof Content !== "function" && Content}

      <motion.ul
        role="group"
        style={{ overflow: "hidden" }}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: expanded ? 1 : 0, height: expanded ? "auto" : 0 }}
        exit={{ opacity: 0, height: 0 }}
      >
        <treeItemContext.Provider
          value={{ itemId, indentation: indentation + 1 }}
        >
          {children}
        </treeItemContext.Provider>
      </motion.ul>
    </li>
  );
};
