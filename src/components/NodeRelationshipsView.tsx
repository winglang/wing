import {
  ArrowLongDownIcon as ArrowDownIcon,
  ArrowLongRightIcon as ArrowRightIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

export interface Relationships {
  self: {
    icon: React.ReactNode;
    id: string;
    path: string;
  };
  parent:
    | {
        icon: React.ReactNode;
        id: string;
        path: string;
      }
    | undefined;
  children: {
    icon: React.ReactNode;
    id: string;
    path: string;
  }[];
  callers: {
    icon: React.ReactNode;
    id: string;
    path: string;
  }[];
  callees: {
    icon: React.ReactNode;
    id: string;
    path: string;
  }[];
}

const NO_PARENT_TEXT = "No parent";
const NO_CALLERS_TEXT = "No callers";
const NO_CALLEES_TEXT = "No callees";
const NO_CHILDREN_TEXT = "No children";
const MAX_ITEM_COUNT = 4;
const LOAD_MORE_ITEMS_TEXT = "Load more…";
const SIDE_COLUMNS_MARGIN_ALIGN = "-mt-4 pb-1";
const SIDE_COLUMNS_MARGIN_CENTER = "-mt-2 mb-24";

function times<T>(times: number, callback: (index: number) => T) {
  if (times < 1) {
    return [];
  }

  const values: T[] = [];
  for (let index = 0; index < times; ++index) {
    values.push(callback(index));
  }
  return values;
}

interface ItemButtonProps {
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function ItemButton({
  title,
  disabled,
  onClick,
  children,
}: React.PropsWithChildren<ItemButtonProps>) {
  return (
    <button
      className={classNames(
        "flex-shrink-0 max-w-full truncate bg-slate-50 border border-slate-300/75 shadow-sm text-xs px-2.5 py-1 flex items-center gap-1.5 min-w-0",
        {
          "cursor-not-allowed": disabled,
          "cursor-pointer hover:bg-slate-100": !disabled,
        },
      )}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ItemButtonContainer({
  spacerItems = 0,
  children,
}: React.PropsWithChildren<{
  spacerItems?: number;
}>) {
  return (
    <div className="min-w-0 max-w-full flex flex-col gap-0.5 items-stretch ">
      <div className="min-w-0 max-w-full flex flex-col gap-0.5 items-stretch bg-slate-200/50 p-1 rounded">
        {children}
      </div>

      {times(spacerItems, (index) => (
        <InvisibleSpacingButton key={index} />
      ))}
    </div>
  );
}

function LoadMoreButton({
  itemCount,
  onClick,
}: {
  itemCount: number;
  onClick?: () => void;
}) {
  const text = `Load ${itemCount} more…`;
  return (
    <ItemButton title={text} onClick={onClick}>
      <span className="w-full text-center italic px-2 text-slate-500">
        {text}
      </span>
    </ItemButton>
  );
}

function InvisibleSpacingButton() {
  return (
    <div className="w-full border border-dashed border-slate-300 text-xs px-2.5 py-1 min-w-0 invisible">
      &nbsp;
    </div>
  );
  return (
    <div className="w-full truncate bg-slate-50 border border-slate-300 shadow-sm text-xs px-2.5 py-1 flex items-center justify-around gap-1.5 cursor-pointer hover:bg-slate-100 min-w-0 invisible">
      &nbsp;
    </div>
  );
}

export interface NodeRelationshipsViewProps {
  relationships: Relationships;
  centerSidesVertically?: boolean;
  hideUsageRelationship?: boolean;
  onNodeClick?: (name: string) => void;
}

export function NodeRelationshipsView({
  relationships,
  centerSidesVertically,
  hideUsageRelationship,
  onNodeClick,
}: NodeRelationshipsViewProps) {
  const [viewAllCallers, setViewAllCallers] = useState(false);
  const [viewAllCallees, setViewAllCallees] = useState(false);
  const [viewAllChildren, setViewAllChildren] = useState(false);

  return (
    <div className="flex-1 text-slate-700 bg-slate-100 flex p-2">
      {!hideUsageRelationship && (
        <div
          className={classNames(
            "w-1/4 flex-1 flex flex-col justify-around items-end",
            centerSidesVertically
              ? SIDE_COLUMNS_MARGIN_CENTER
              : SIDE_COLUMNS_MARGIN_ALIGN,
          )}
        >
          <ItemButtonContainer
            spacerItems={
              centerSidesVertically
                ? 0
                : MAX_ITEM_COUNT -
                  (relationships.callers.length === 0 ? 1 : 0) -
                  relationships.callers.length
            }
          >
            <span className="w-full text-center text-xs font-medium text-slate-600">
              callers ({relationships.callers.length})
            </span>

            <div className="relative">
              <div
                className={classNames("flex flex-col gap-0.5", {
                  invisible: viewAllCallers,
                })}
              >
                {relationships.callers.length === 0 && (
                  <ItemButton title={NO_CALLERS_TEXT} disabled>
                    <span className="px-2 italic text-slate-500">
                      {NO_CALLERS_TEXT}
                    </span>
                  </ItemButton>
                )}

                {relationships.callers
                  .slice(
                    0,
                    relationships.callers.length > MAX_ITEM_COUNT
                      ? MAX_ITEM_COUNT - 1
                      : relationships.callers.length,
                  )
                  .map((resource) => (
                    <ItemButton
                      key={resource.path}
                      title={resource.path}
                      onClick={() => onNodeClick?.(resource.path)}
                    >
                      <div className="flex-shrink-0 -ml-0.5">
                        {resource.icon}
                      </div>
                      <div className="truncate">{resource.id}</div>
                    </ItemButton>
                  ))}

                {relationships.callers.length > MAX_ITEM_COUNT && (
                  <LoadMoreButton
                    itemCount={
                      1 + relationships.callers.length - MAX_ITEM_COUNT
                    }
                    onClick={() => setViewAllCallers(true)}
                  />
                )}
              </div>
              {viewAllCallers && (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-0.5 overflow-y-scroll">
                  {relationships.callers.map((resource) => (
                    <ItemButton
                      key={resource.path}
                      title={resource.path}
                      onClick={() => onNodeClick?.(resource.path)}
                    >
                      <div className="flex-shrink-0 -ml-0.5">
                        {resource.icon}
                      </div>
                      <div className="truncate">{resource.id}</div>
                    </ItemButton>
                  ))}
                </div>
              )}
            </div>
          </ItemButtonContainer>
        </div>
      )}
      <div
        className={classNames("px-2 flex-shrink-0 flex flex-col gap-2 flex-1", {
          "max-w-full": hideUsageRelationship,
          "max-w-[50%]": !hideUsageRelationship,
        })}
      >
        <div className="flex justify-around">
          <ItemButtonContainer>
            <span className="w-full text-center text-xs font-medium text-slate-600">
              parent
            </span>
            {!relationships.parent && (
              <ItemButton title={NO_PARENT_TEXT} disabled>
                <span className="px-2 italic">{NO_PARENT_TEXT}</span>
              </ItemButton>
            )}
            {relationships.parent && (
              <ItemButton
                title={relationships.parent.id}
                onClick={() => {
                  if (relationships.parent) {
                    onNodeClick?.(relationships.parent.path);
                  }
                }}
              >
                <div className="flex-shrink-0 -ml-0.5">
                  {relationships.parent.icon}
                </div>
                <div className="truncate">{relationships.parent.id}</div>
              </ItemButton>
            )}
          </ItemButtonContainer>
        </div>
        <div className="flex justify-around">
          <ArrowDownIcon
            className="w-4 h-4 text-slate-600"
            aria-hidden="true"
          />
        </div>
        <div className="flex justify-around items-center">
          {!hideUsageRelationship && (
            <div className="flex-shrink-0">
              <ArrowRightIcon
                className="w-4 h-4 text-slate-600"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="min-w-0 flex items-center gap-2 cursor-default">
            <ItemButtonContainer>
              {/* <span className="w-full text-center text-xs font-medium text-slate-600">
                self
              </span> */}

              <div
                className="bg-white border border-slate-300/75 shadow-sm flex items-center gap-2 px-3.5 py-2.5 min-w-0"
                title={relationships.self.id}
              >
                <div className="flex-shrink-0 -ml-1">
                  {relationships.self.icon}
                </div>
                <div className="flex-1 truncate text-sm">
                  {relationships.self.id}
                </div>
              </div>
            </ItemButtonContainer>
          </div>
          {!hideUsageRelationship && (
            <div className="flex-shrink-0">
              <ArrowRightIcon
                className="w-4 h-4 text-slate-600"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <div className="flex justify-around">
          <ArrowDownIcon
            className="w-4 h-4 text-slate-600"
            aria-hidden="true"
          />
        </div>
        <div className="flex justify-around">
          <ItemButtonContainer
            spacerItems={
              MAX_ITEM_COUNT -
              (relationships.children.length === 0 ? 1 : 0) -
              relationships.children.length
            }
          >
            <span className="w-full text-center text-xs font-medium text-slate-600">
              children ({relationships.children.length})
            </span>

            <div className="relative">
              <div
                className={classNames("flex flex-col gap-0.5", {
                  invisible: viewAllChildren,
                })}
              >
                {relationships.children.length === 0 && (
                  <ItemButton title={NO_CHILDREN_TEXT} disabled>
                    <span className="px-2 italic text-slate-500">
                      {NO_CHILDREN_TEXT}
                    </span>
                  </ItemButton>
                )}

                {relationships.children
                  .slice(
                    0,
                    relationships.children.length > MAX_ITEM_COUNT
                      ? MAX_ITEM_COUNT - 1
                      : relationships.children.length,
                  )
                  .map((resource, childIndex) => (
                    <ItemButton
                      key={resource.path}
                      title={resource.path}
                      onClick={() => onNodeClick?.(resource.path)}
                    >
                      <div className="flex-shrink-0 -ml-0.5">
                        {resource.icon}
                      </div>
                      <div className="truncate">{resource.id}</div>
                    </ItemButton>
                  ))}

                {relationships.children.length > MAX_ITEM_COUNT && (
                  <LoadMoreButton
                    itemCount={
                      1 + relationships.children.length - MAX_ITEM_COUNT
                    }
                    onClick={() => setViewAllChildren(true)}
                  />
                )}
              </div>
              {viewAllChildren && (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-0.5 overflow-y-scroll">
                  {relationships.children.length === 0 && (
                    <ItemButton title={NO_CHILDREN_TEXT} disabled>
                      <span className="px-2 italic text-slate-500">
                        {NO_CHILDREN_TEXT}
                      </span>
                    </ItemButton>
                  )}
                  {relationships.children.map((resource) => (
                    <ItemButton
                      key={resource.path}
                      title={resource.path}
                      onClick={() => onNodeClick?.(resource.path)}
                    >
                      <div className="flex-shrink-0 -ml-0.5">
                        {resource.icon}
                      </div>
                      <div className="truncate">{resource.id}</div>
                    </ItemButton>
                  ))}
                </div>
              )}
            </div>
          </ItemButtonContainer>
        </div>
      </div>
      {!hideUsageRelationship && (
        <div
          className={classNames(
            "w-1/4 flex-1 flex flex-col justify-around items-start",
            centerSidesVertically
              ? SIDE_COLUMNS_MARGIN_CENTER
              : SIDE_COLUMNS_MARGIN_ALIGN,
          )}
        >
          <ItemButtonContainer
            spacerItems={
              centerSidesVertically
                ? 0
                : MAX_ITEM_COUNT -
                  (relationships.callees.length === 0 ? 1 : 0) -
                  relationships.callees.length
            }
          >
            <span className="w-full text-center text-xs font-medium text-slate-600">
              callees ({relationships.callees.length})
            </span>

            <div className="relative">
              <div
                className={classNames("flex flex-col gap-0.5", {
                  invisible: viewAllCallees,
                })}
              >
                {relationships.callees.length === 0 && (
                  <ItemButton title={NO_CALLEES_TEXT} disabled>
                    <span className="px-2 italic text-slate-500">
                      {NO_CALLEES_TEXT}
                    </span>
                  </ItemButton>
                )}

                {relationships.callees
                  .slice(
                    0,
                    relationships.callers.length > MAX_ITEM_COUNT
                      ? MAX_ITEM_COUNT - 1
                      : relationships.callees.length,
                  )
                  .map((resource) => (
                    <ItemButton
                      key={resource.path}
                      title={resource.path}
                      onClick={() => onNodeClick?.(resource.path)}
                    >
                      <div className="flex-shrink-0 -ml-0.5">
                        {resource.icon}
                      </div>
                      <div className="truncate">{resource.id}</div>
                    </ItemButton>
                  ))}

                {relationships.callees.length > MAX_ITEM_COUNT && (
                  <LoadMoreButton
                    itemCount={
                      1 + relationships.callees.length - MAX_ITEM_COUNT
                    }
                    onClick={() => setViewAllCallees(true)}
                  />
                )}
              </div>
              {viewAllCallees && (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-0.5 overflow-y-scroll">
                  {relationships.callees.map((resource) => (
                    <ItemButton
                      key={resource.path}
                      title={resource.path}
                      onClick={() => onNodeClick?.(resource.path)}
                    >
                      <div className="flex-shrink-0 -ml-0.5">
                        {resource.icon}
                      </div>
                      <div className="truncate">{resource.id}</div>
                    </ItemButton>
                  ))}
                </div>
              )}
            </div>
          </ItemButtonContainer>
        </div>
      )}
    </div>
  );
}
