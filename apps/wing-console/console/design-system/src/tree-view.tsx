import { PropsWithChildren } from "react";

import { TreeView as HeadlessTreeView } from "./headless/tree-view.js";

export interface TreeViewProps {
  "aria-label"?: string;
  defaultSelectedItem?: string;
  defaultExpandedItems?: string[];
  expandedItems?: string[];
  selectedItems?: string[];
  onSelectedItemsChange?: (itemId: string[]) => void;
  onExpandedItemsChange?: (itemIds: string[]) => void;
}

export const TreeView = ({
  children,
  ...props
}: PropsWithChildren<TreeViewProps>) => {
  return <HeadlessTreeView {...props}>{children}</HeadlessTreeView>;
};
