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
}: TreeMenuProps) => {
  return (
    <>
      <div className="h-8 flex-shrink-0 flex items-center justify-between gap-1 px-4">
        <div className="flex items-center">
          <span className="uppercase text-sm font-semibold">{title}</span>
        </div>

        <div className="flex items-center">
          <button
            className="p-0.5 hover:bg-slate-200 rounded group"
            onClick={onExpandAll}
            title="Expand All"
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
    </>
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
      <button
        type="button"
        className={classNames(
          "w-full cursor-pointer group hover:bg-slate-200/50",
          selectedItem === item.id && "bg-slate-200",
        )}
        tabIndex={-1}
        onClick={() => {
          onItemClick?.(item);
        }}
        onDoubleClick={() => {
          onItemToggle?.(item);
        }}
      >
        <div
          className="px-4 py-0.5 flex items-center"
          style={{ marginLeft: `${8 * indentationLevel}px` }}
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
        </div>
      </button>
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
