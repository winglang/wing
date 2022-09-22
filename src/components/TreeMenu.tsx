import {
  ChevronDownIcon,
  ChevronRightIcon,
  MinusSmallIcon,
  PlusSmallIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";

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
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
}

export const TreeMenu = ({
  title,
  selectedItemId,
  openMenuItemIds = [],
  items,
  onItemClick,
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
            className="p-0.5 hover:bg-slate-200 rounded relative group"
            onClick={onExpandAll}
            title="Expand All"
          >
            <Square2StackIcon
              className="w-4 h-4 text-slate-600 group-hover:text-slate-700 rotate-90"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{ left: "4.5px", top: "8px" }}
            >
              <PlusSmallIcon
                className="w-2 h-2 text-slate-600 group-hover:text-slate-700"
                aria-hidden="true"
              />
            </div>
          </button>

          <button
            className="p-0.5 hover:bg-slate-200 rounded relative group"
            onClick={onCollapseAll}
            title="Collapse All"
          >
            <Square2StackIcon
              className="w-4 h-4 text-slate-600 group-hover:text-slate-700 rotate-90"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{ left: "4.5px", top: "8px" }}
            >
              <MinusSmallIcon
                className="w-2 h-2 text-slate-600 group-hover:text-slate-700"
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </div>
      <div className="relative h-full">
        <div className="absolute inset-0">
          <div className="h-full w-full text-sm text-slate-800 bg-slate-100 flex flex-col gap-1 overflow-y-overlay scroller transition-colors ease-in-out duration-700 border-transparent scrollbar-w-2.5 hover:border-slate-500/10 hover:duration-700">
            {/* <div className="px-4 flex items-center">
              <span className="uppercase text-sm font-semibold">{title}</span>
            </div> */}
            <div className="flex flex-col">
              <MenuItems
                items={items}
                selectedItem={selectedItemId}
                openedMenuItems={openMenuItemIds}
                onItemClick={onItemClick}
              />
            </div>
          </div>
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
}

function MenuItems({
  items,
  selectedItem,
  openedMenuItems = [],
  indentationLevel = 0,
  onItemClick,
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
}

function MenuItem({
  item,
  selectedItem,
  openedMenuItems = [],
  indentationLevel = 0,
  onItemClick,
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
        />
      )}
    </>
  );
}
