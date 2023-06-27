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
import { ExplorerItem } from "@wingconsole/server";
import classNames from "classnames";

import { TreeMenuItem } from "./use-tree-menu-items.js";

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
        // darkenOnGroupHover
      />
    ) : undefined,
    children: item.childItems?.map((item) =>
      createTreeMenuItemFromExplorerTreeItem(item),
    ),
  };
};

export interface ExplorerProps {
  loading?: boolean;
  items: TreeMenuItem[] | undefined;
  selectedItems: string[];
  expandedItems: string[];
  "data-testid"?: string;
  onSelectedItemsChange: (ids: string[]) => void;
  onExpandedItemsChange: (ids: string[]) => void;
  onExpandAll(): void;
  onCollapseAll(): void;
}

export const Explorer = (props: ExplorerProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames("w-full h-full flex flex-col", theme.bg3)}
      data-testid={props["data-testid"]}
    >
      <Toolbar title="Explorer">
        <ToolbarButton
          onClick={props.onExpandAll}
          title="Expand All"
          disabled={props.loading}
        >
          <SquareStackPlusIcon className="w-4 h-4 rotate-90" />
        </ToolbarButton>

        <ToolbarButton
          onClick={props.onCollapseAll}
          title="Collapse All"
          disabled={props.loading}
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
              <TreeView
                expandedItems={props.expandedItems}
                onExpandedItemsChange={props.onExpandedItemsChange}
                selectedItems={props.selectedItems}
                onSelectedItemsChange={props.onSelectedItemsChange}
              >
                {props.items && renderTreeItems(props.items)}
              </TreeView>
            </div>
          </ScrollableArea>
        </div>
      </div>
    </div>
  );
};
