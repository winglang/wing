import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

import { ScrollableArea } from "./scrollable-area.js";
import { useTheme } from "./theme-provider.js";

export interface Tab {
  id: string;
  name: string;
  icon?: ReactNode;
  panel?: ReactNode | (() => ReactNode);
  count?: number;
}

export interface TabsProps {
  tabs: Tab[];
  currentTabId?: string;
  onTabChange?: (tabId: string) => void;
  renderActiveTabPanelOnly?: boolean;
  tabsWithNotifications?: string[];
  transparent?: boolean;
  small?: boolean;
}

export const Tabs = (props: TabsProps) => {
  const { theme } = useTheme();
  const [currentTabId, setCurrentTabId] = useState(props.currentTabId);

  useEffect(() => {
    if (props.currentTabId) {
      setCurrentTabId(props.currentTabId);
    }
  }, [props]);

  useEffect(() => {
    if (props.onTabChange && currentTabId) {
      props.onTabChange(currentTabId);
    }
  }, [currentTabId]);

  return (
    <div className="h-full flex flex-col">
      <div
        className={classNames(
          "relative w-full text-sm select-none",
          !props.transparent && [theme.bg3, theme.text2],
          props.small ? "h-6" : "h-8",
        )}
      >
        <ScrollableArea
          overflowX
          overflowY
          scrollbarSize="xs"
          className={classNames(
            "flex gap-px",
            !props.transparent && [theme.bg1, theme.text2],
            props.transparent && "gap-x-3",
          )}
        >
          {props.tabs.map((tab) => {
            const isCurrent = tab.id === currentTabId;
            return (
              // TODO: Fix a11y
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={tab.id}
                className={classNames(
                  "relative flex items-center cursor-pointer group",
                  props.transparent &&
                    isCurrent && [theme.text2, "border-b-2", theme.border3],
                  props.transparent &&
                    !isCurrent && [
                      theme.text2,
                      theme.text3Hover,
                      "border-b-2 border-transparent",
                    ],

                  !props.transparent && "px-4",
                  !props.transparent && isCurrent && theme.bg3,
                  !props.transparent &&
                    !isCurrent && [theme.bg2, theme.bg2Hover],
                )}
                onClick={() => setCurrentTabId(tab.id)}
              >
                {tab.icon && <div className="mr-1.5">{tab.icon}</div>}
                <div className="whitespace-nowrap space-x-1">
                  <span>{tab.name}</span>
                  {tab.count !== undefined && (
                    <span className="text-xs">({tab.count})</span>
                  )}
                </div>

                {props.tabsWithNotifications?.includes(tab.id) && (
                  <div className="ml-2">
                    <span className="relative flex h-2 w-2">
                      <span
                        className={classNames(
                          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                          theme.bg1,
                        )}
                      />
                      <span
                        className={classNames(
                          "relative inline-flex rounded-full h-2 w-2",
                          theme.bg1,
                        )}
                      />
                    </span>
                  </div>
                )}
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
