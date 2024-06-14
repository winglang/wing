import {
  SquareStackMinusIcon,
  SquareStackPlusIcon,
  Toolbar,
  ToolbarButton,
  TreeItem,
  TreeView,
  useTheme,
  ResourceIcon,
  ScrollableArea,
} from "@wingconsole/design-system";
import type { ExplorerItem } from "@wingconsole/server";
import classNames from "classnames";
import { memo } from "react";

import { useSelectionContext } from "../selection-context/selection-context.js";

import { NoResources } from "./no-resources.js";
import { useHierarchy, type TreeMenuItem } from "./use-hierarchy.js";

const renderTreeItems = (items: TreeMenuItem[]) => {
  return items.map((item) => {
    return (
      <TreeItem
        key={item.id}
        itemId={item.id}
        label={item.label}
        icon={item.icon}
      >
        {item.children &&
          item.children.length > 0 &&
          renderTreeItems(item.children)}
      </TreeItem>
    );
  });
};

const createTreeMenuItemFromExplorerTreeItem = (
  item: ExplorerItem,
): TreeMenuItem => {
  return {
    id: item.id,
    label: item.label,
    icon: item.type ? (
      <ResourceIcon
        resourceType={item.type}
        resourcePath={item.label}
        className="w-4 h-4"
        color={item.display?.color}
        icon={item.display?.icon}
      />
    ) : undefined,
    children: item.childItems?.map((item) =>
      createTreeMenuItemFromExplorerTreeItem(item),
    ),
  };
};

export interface HierarchyProps {
  loading?: boolean;
  "data-testid"?: string;
}

export const Hierarchy = memo((props: HierarchyProps) => {
  const { theme } = useTheme();
  const hierarchy = useHierarchy();
  const selectionContext = useSelectionContext();
  return (
    <div
      className={classNames("w-full h-full flex flex-col", theme.bg3)}
      data-testid={props["data-testid"]}
    >
      <Toolbar title="Explorer">
        <ToolbarButton onClick={selectionContext.expandAll} title="Expand All">
          <SquareStackPlusIcon className="w-4 h-4 rotate-90" />
        </ToolbarButton>

        <ToolbarButton
          onClick={selectionContext.collapseAll}
          title="Collapse All"
        >
          <SquareStackMinusIcon className="w-4 h-4 rotate-90" />
        </ToolbarButton>
      </Toolbar>

      <div className="relative grow">
        <div className="absolute inset-0">
          <ScrollableArea
            overflowY
            className={classNames(
              "h-full w-full text-sm flex flex-col gap-1",
              theme.bg3,
              theme.text2,
            )}
          >
            <div className="flex flex-col">
              {hierarchy.items && hierarchy.items.length === 0 && (
                <NoResources />
              )}
              <TreeView
                expandedItems={selectionContext.expandedItems}
                onExpandedItemsChange={selectionContext.setExpandedItems}
                selectedItems={selectionContext.selectedItems}
                onSelectedItemsChange={selectionContext.setSelectedItems}
              >
                {hierarchy.items && renderTreeItems(hierarchy.items)}
              </TreeView>
            </div>
          </ScrollableArea>
        </div>
      </div>
    </div>
  );
});
