import { useState } from "react";

import { Tab } from "@/design-system/Tabs";

export function useTabs(options?: { tabs?: Tab[]; currentTabId?: string }) {
  const [tabs, setTabs] = useState(options?.tabs ?? []);
  const [currentTabId, setCurrentTabId] = useState(options?.currentTabId);
  const closeTab = (tabId: string) => {
    setTabs(([...tabs]) => {
      const index = tabs.findIndex((tab) => tab.id === tabId);
      if (index !== -1) {
        tabs.splice(index, 1);
      }
      return tabs;
    });
  };
  const openTab = (tab: Tab) => {
    setTabs((tabs) => {
      const index = tabs.findIndex((otherTab) => otherTab.id === tab.id);
      if (index !== -1) {
        return tabs;
      }

      return [...tabs, tab];
    });
    setCurrentTabId(tab.id);
  };
  const closeAll = () => {
    setTabs([]);
  };

  return {
    tabs,
    setTabs,
    currentTabId,
    setCurrentTabId,
    closeTab,
    openTab,
    closeAll,
  };
}
