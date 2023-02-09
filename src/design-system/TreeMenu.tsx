import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";

import { Square2StackMinusIcon, Square2StackPlusIcon } from "./icons/index.js";
import { ScrollableArea } from "./ScrollableArea.js";

export interface TreeMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  parentId?: string;
  children?: TreeMenuItem[];
}

export interface TreeMenuProps {
  title?: string;
  selectedItemId?: string;
  openMenuItemIds?: string[];
  items: TreeMenuItem[];
  onItemClick?: (item: TreeMenuItem) => void;
  onItemToggle?: (item: TreeMenuItem) => void;
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
  disabled?: boolean;
}

export const TreeMenu = ({
  title,
  selectedItemId,
  openMenuItemIds = [],
  items,
  onItemClick,
  onItemToggle,
  onExpandAll,
  onCollapseAll,
  disabled = false,
}: TreeMenuProps) => {
  return (
    <div className={"w-full h-full"} data-testid="tree-menu">
      <div className="h-9 flex-shrink-0 flex items-center justify-between gap-2 px-4">
        <div className="flex items-center min-w-0">
          <span className="text-slate-600 text-sm truncate uppercase">
            {title}
          </span>
        </div>

        <div className="flex items-center">
          <button
            className="p-0.5 hover:bg-slate-200 rounded group"
            onClick={onExpandAll}
            title="Expand All"
            disabled={disabled}
          >
            <Square2StackPlusIcon
              className="w-4 h-4 text-slate-600 group-hover:text-slate-700 rotate-90"
              aria-hidden="true"
            />
          </button>

          <button
            className="p-0.5 hover:bg-slate-200 rounded group"
            onClick={onCollapseAll}
            title="Collapse All"
            disabled={disabled}
          >
            <Square2StackMinusIcon
              className="w-4 h-4 text-slate-600 group-hover:text-slate-700 rotate-90"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="relative h-full">
        <div className="absolute inset-0">
          <ScrollableArea
            overflowY
            className="h-full w-full text-sm text-slate-800 bg-slate-100 flex flex-col gap-1"
          >
            <div className="flex flex-col">
              <MenuItems
                items={items}
                selectedItem={selectedItemId}
                openedMenuItems={openMenuItemIds}
                onItemClick={onItemClick}
                onItemToggle={onItemToggle}
              />
            </div>
          </ScrollableArea>
        </div>
      </div>
    </div>
  );
};

interface MenuItemsProps {
  items: TreeMenuItem[];
  selectedItem?: string;
  openedMenuItems?: string[];
  indentationLevel?: number;
  onItemClick?: (item: TreeMenuItem) => void;
  onItemToggle?: (item: TreeMenuItem) => void;
}

function MenuItems({
  items,
  selectedItem,
  openedMenuItems = [],
  indentationLevel = 0,
  onItemClick,
  onItemToggle,
}: MenuItemsProps) {
  return (
    <>
      {items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          selectedItem={selectedItem}
          openedMenuItems={openedMenuItems}
          indentationLevel={indentationLevel}
          onItemClick={onItemClick}
          onItemToggle={onItemToggle}
        />
      ))}
    </>
  );
}

export const SELECTED_TREE_ITEM_CSS_ID = "current-tree-item";

interface MenuItemProps {
  item: TreeMenuItem;
  selectedItem?: string;
  openedMenuItems?: string[];
  indentationLevel?: number;
  onItemClick?: (item: TreeMenuItem) => void;
  onItemToggle?: (item: TreeMenuItem) => void;
}

function MenuItem({
  item,
  selectedItem,
  openedMenuItems = [],
  indentationLevel = 0,
  onItemClick,
  onItemToggle,
}: MenuItemProps) {
  const open = openedMenuItems.includes(item.id);
  const hasChildren = !item.children || item.children.length === 0;

  return (
    <>
      <div
        className={classNames(
          "w-full flex cursor-pointer group hover:bg-slate-200/50",
          selectedItem === item.id && "bg-slate-200",
          selectedItem === item.id && SELECTED_TREE_ITEM_CSS_ID,
        )}
        onClick={(e) => {
          e.stopPropagation();
          onItemClick?.(item);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onItemToggle?.(item);
        }}
      >
        <button
          type={"button"}
          className="pl-4 py-0.5 flex items-center"
          style={{ marginLeft: `${8 * indentationLevel}px` }}
          onClick={(e) => {
            e.stopPropagation();
            onItemToggle?.(item);
          }}
        >
          {open ? (
            <ChevronDownIcon
              className={classNames(
                "w-4 h-4 text-slate-500 mr-1.5 flex-shrink-0 group-hover:text-slate-600",
                {
                  invisible: hasChildren,
                  "text-slate-600": selectedItem === item.id,
                },
              )}
              aria-hidden="true"
            />
          ) : (
            <ChevronRightIcon
              className={classNames(
                "w-4 h-4 text-slate-500 mr-1.5 flex-shrink-0 group-hover:text-slate-600",
                {
                  invisible: hasChildren,
                  "text-slate-600": selectedItem === item.id,
                },
              )}
              aria-hidden="true"
            />
          )}
        </button>
        <button
          type={"button"}
          className="py-0.5 flex items-center truncate"
          onClick={(e) => {
            e.stopPropagation();
            onItemClick?.(item);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            onItemToggle?.(item);
          }}
        >
          {item.icon && <div className="mr-1.5 flex-shrink-0">{item.icon}</div>}
          <span
            title={item.label}
            className={classNames(
              "truncate text-slate-800 group-hover:text-slate-900",
              {
                "text-slate-900": selectedItem === item.id,
              },
            )}
          >
            {item.label}
          </span>
        </button>
      </div>
      {open && (
        <MenuItems
          items={item.children ?? []}
          selectedItem={selectedItem}
          openedMenuItems={openedMenuItems}
          indentationLevel={indentationLevel + 1}
          onItemClick={onItemClick}
          onItemToggle={onItemToggle}
        />
      )}
    </>
  );
}
