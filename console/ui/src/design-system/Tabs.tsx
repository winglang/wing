import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { ReactNode, useState } from "react";

import { ScrollableArea } from "./ScrollableArea.js";

export interface Tab {
  id: string;
  name: string;
  icon?: ReactNode;
  panel?: ReactNode | (() => ReactNode);
}

export interface TabsProps {
  tabs: Tab[];
  currentTabId?: string;
  renderActiveTabPanelOnly?: boolean;
}

export const Tabs = (props: TabsProps) => {
  const [currentTabId, setCurrentTabId] = useState(props.currentTabId);

  return (
    <div className="h-full flex flex-col">
      <div className="relative w-full text-sm h-8 bg-slate-100 select-none">
        <ScrollableArea
          overflowX
          overflowY
          scrollbarSize="xs"
          className="flex gap-px bg-slate-200"
        >
          {props.tabs.map((tab) => {
            const isCurrent = tab.id === currentTabId;
            return (
              // TODO: Fix a11y
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={tab.id}
                className={classNames(
                  "relative flex items-center px-4 cursor-pointer group",
                  isCurrent ? "bg-slate-50" : "bg-slate-200 hover:bg-slate-100",
                )}
                onClick={() => setCurrentTabId(tab.id)}
              >
                {tab.icon && <div className="mr-1.5">{tab.icon}</div>}
                <div className="whitespace-nowrap">{tab.name}</div>
              </div>
            );
          })}
        </ScrollableArea>
      </div>

      {props.tabs.map((tab) => {
        const isCurrent = tab.id === currentTabId;
        if (props.renderActiveTabPanelOnly && !isCurrent) {
          return;
        }

        return (
          <div
            key={tab.id}
            className={classNames("flex flex-col", {
              "invisible overflow-hidden h-0": !isCurrent,
              grow: isCurrent,
            })}
          >
            {typeof tab.panel === "function" ? tab.panel() : tab.panel}
          </div>
        );
      })}
    </div>
  );
};
