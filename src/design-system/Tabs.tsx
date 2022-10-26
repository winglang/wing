import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

import { ScrollableArea } from "./ScrollableArea.js";

export interface Tab {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  currentTabId?: string;
  onTabClicked?: (tab: Tab) => void;
  onTabClosed?: (tab: Tab) => void;
}

export const Tabs = (props: TabsProps) => {
  const { tabs, currentTabId, onTabClicked, onTabClosed } = props;
  if (tabs.length === 0) {
    return <></>;
  }

  return (
    <div className="flex-1 relative w-full text-sm h-8 bg-slate-100 select-none">
      <ScrollableArea
        overflowX
        overflowY
        scrollbarSize="xs"
        className="flex gap-px"
      >
        {tabs.map((tab) => {
          const isCurrent = tab.id === currentTabId;
          return (
            <div
              key={tab.id}
              className={classNames(
                "relative flex items-center px-3 cursor-pointer group",
                isCurrent ? "bg-white" : "bg-slate-200",
              )}
              onClick={() => onTabClicked?.(tab)}
            >
              {tab.icon && <div className="mr-1.5">{tab.icon}</div>}
              <div className="whitespace-nowrap">{tab.name}</div>
              <button
                type="button"
                className={classNames(
                  "ml-1 -mr-1.5 p-1 rounded",
                  isCurrent ? "hover:bg-slate-200" : "hover:bg-slate-300",
                  { "invisible group-hover:visible": !isCurrent },
                )}
                onClick={(event) => {
                  event.stopPropagation();
                  onTabClosed?.(tab);
                }}
              >
                <XMarkIcon
                  className="w-4 h-4 text-slate-600"
                  aria-hidden="true"
                />
              </button>
            </div>
          );
        })}
      </ScrollableArea>
    </div>
  );
};
