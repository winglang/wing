import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

export interface TreeMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  parentId?: string;
  children?: TreeMenuItem[];
  onTreeItemClick?: (item: TreeMenuItem) => void;
}

export interface TreeMenuProps {
  title?: string;
  selectedItemId?: string;
  openMenuItemIds?: string[];
  items: TreeMenuItem[];
}

export const TreeMenu = ({
  title,
  selectedItemId,
  openMenuItemIds = [],
  items,
}: TreeMenuProps) => {
  return (
    <div className="bg-slate-100 flex flex-col gap-1 overflow-auto">
      <div className="h-8" />
      <div className="px-4 flex items-center">
        <span className="uppercase text-sm font-semibold">{title}</span>
      </div>
      <div className="flex flex-col">
        <MenuItems
          items={items}
          selectedItem={selectedItemId}
          openedMenuItems={openMenuItemIds}
          onItemClick={(item) => {
            item.onTreeItemClick?.(item);
          }}
        />
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
          "w-full cursor-pointer hover:bg-slate-200",
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
              className={classNames("w-4 h-4 text-slate-500 mr-1.5", {
                invisible: hasChildren,
              })}
              aria-hidden="true"
            />
          ) : (
            <ChevronRightIcon
              className={classNames("w-4 h-4 text-slate-500 mr-1.5", {
                invisible: hasChildren,
              })}
              aria-hidden="true"
            />
          )}
          {item.icon && <div className="mr-1.5">{item.icon}</div>}
          <span>{item.label}</span>
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
