import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React, { Fragment, ReactNode, useEffect, useMemo, useRef } from "react";

import { Square2StackMinusIcon, Square2StackPlusIcon } from "./icons/index.js";
import { ScrollableArea } from "./ScrollableArea.js";

export interface TreeMenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string | ReactNode | ((item: TreeMenuItem) => ReactNode);
  secondaryLabel?: string | ReactNode | ((item: TreeMenuItem) => ReactNode);
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
  hideToolbar?: boolean;
  hideChevrons?: boolean;
  dataTestId?: string;
  toolbarActions?: ReactNode;
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
  hideToolbar = false,
  hideChevrons = false,
  dataTestId = "",
  toolbarActions,
}: TreeMenuProps) => {
  return (
    <div className={"w-full h-full flex flex-col"} data-testid={dataTestId}>
      <div
        className={classNames(
          "flex-shrink-0 flex items-center justify-between gap-2 px-2",
          !title && !hideToolbar && "pb-2",
        )}
      >
        {title && (
          <div className="flex items-center min-w-0 h-9">
            <span className="text-slate-600 text-sm truncate uppercase">
              {title}
            </span>
          </div>
        )}

        {!hideToolbar && (
          <div className="flex items-center h-9">
            {toolbarActions}
            {!hideChevrons && (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
      <div className="relative grow">
        <div className="absolute inset-0">
          <ScrollableArea
            overflowY
            className="h-full w-full text-sm text-slate-800 bg-slate-50 flex flex-col gap-1"
          >
            <div className="flex flex-col">
              <MenuItems
                items={items}
                selectedItem={selectedItemId}
                openedMenuItems={openMenuItemIds}
                onItemClick={onItemClick}
                onItemToggle={onItemToggle}
                hideChevrons={hideChevrons}
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
  hideChevrons?: boolean;
}

function MenuItems({
  items,
  selectedItem,
  openedMenuItems = [],
  indentationLevel = 0,
  onItemClick,
  onItemToggle,
  hideChevrons = false,
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
          hideChevron={hideChevrons}
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
  hideChevron?: boolean;
}

function MenuItem({
  item,
  selectedItem,
  openedMenuItems = [],
  indentationLevel = 0,
  onItemClick,
  onItemToggle,
  hideChevron = false,
}: MenuItemProps) {
  const open = useMemo(() => {
    return openedMenuItems.includes(item.id);
  }, [openedMenuItems, item.id]);

  const hasChildren = useMemo(() => {
    if (!item.children) {
      return false;
    }

    return item.children.length > 0;
  }, [item.children]);

  const ref = useRef<HTMLDivElement>(null);
  // TODO: Can't use scrollIntoView on two different items at the same time (e.g. the tree menu and the map view). Need to figure out a way to do this (only scrolling the map view item when the tree menu item clicked, and only scrolling the tree menu item if the map view item is clicked). Here's some links to bug reports in Chrome:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1121151
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1043933
  // https://bugs.chromium.org/p/chromium/issues/detail?id=833617
  // useEffect(() => {
  //   if (selectedItem === item.id) {
  //     requestAnimationFrame(() => {
  //       ref.current?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "nearest",
  //         inline: "nearest",
  //       });
  //     });
  //   }
  // }, [selectedItem, item.id]);

  const ChevronIcon = useMemo(
    () => (open ? ChevronDownIcon : ChevronRightIcon),
    [open],
  );

  return (
    <Fragment>
      {/* TODO: Fix a11y */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={ref}
        className={classNames(
          "w-full flex cursor-pointer group hover:bg-slate-200/50",
          selectedItem === item.id && "bg-slate-200",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onItemClick?.(item);
        }}
        onDoubleClick={(event) => {
          event.stopPropagation();
          onItemToggle?.(item);
        }}
      >
        {!hideChevron && (
          <button
            type={"button"}
            className={classNames("pl-2 py-0.5 flex items-center", {
              invisible: !hasChildren,
            })}
            style={{ marginLeft: `${8 * indentationLevel}px` }}
            onClick={(event) => {
              event.stopPropagation();
              onItemToggle?.(item);
            }}
          >
            <ChevronIcon
              className={classNames(
                "w-4 h-4 text-slate-500 mr-1.5 flex-shrink-0 group-hover:text-slate-600",
                {
                  "text-slate-600": selectedItem === item.id,
                },
              )}
              aria-hidden="true"
            />
          </button>
        )}
        {hideChevron && <div className="pl-2" />}
        <button
          type={"button"}
          className="grow py-0.5 flex items-center truncate"
          onClick={(event) => {
            event.stopPropagation();
            onItemClick?.(item);
          }}
          onDoubleClick={(event) => {
            event.stopPropagation();
            onItemToggle?.(item);
          }}
        >
          {item.icon && <div className="mr-1.5 flex-shrink-0">{item.icon}</div>}

          {typeof item.label === "function" && item.label(item)}
          {typeof item.label === "string" && (
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
          )}
          <div className="grow" />
          {item.secondaryLabel && typeof item.secondaryLabel === "function"
            ? item.secondaryLabel(item)
            : item.secondaryLabel}
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
    </Fragment>
  );
}
