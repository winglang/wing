import { createContext, useContext, KeyboardEvent } from "react";

export interface TreeContext {
  expandedItems: string[];
  toggleItemExpanded(itemId: string): void;
  registerItem(
    itemId: string,
    options: { parentItem: string | undefined; element: HTMLElement },
  ): void;
  unregisterItem(itemId: string): void;
  focusedItem: string | undefined;
  setFocusedItem(itemId: string): void;
  selectedItems: string[];
  setSelectedItems(itemIds: string[] | ((itemIds: string[]) => string[])): void;
  onKeyDown(event: KeyboardEvent<HTMLElement>): void;
}

export const treeContext = createContext<TreeContext | undefined>(undefined);

export const useTreeContext = () => {
  const context = useContext(treeContext);
  if (!context) {
    throw new Error("Could not find TreeContext");
  }

  return context;
};
