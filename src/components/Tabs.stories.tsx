import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Tabs } from "@/components/Tabs";
import { ResourceIcon } from "@/stories/utils";

import { useTabs } from "./useTabs";

const TabsStory: ComponentStory<typeof Tabs> = (args) => {
  const tabs = useTabs({
    tabs: args.tabs,
    currentTabId: args.currentTabId,
  });

  return (
    <div className="flex-1 h-20 bg-white px-1.5 py-1.5">
      <Tabs
        tabs={tabs.tabs}
        currentTabId={tabs.currentTabId}
        onTabClicked={(tab) => tabs.setCurrentTabId(tab.id)}
      />
    </div>
  );
};

export default {
  title: "Components/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => {
  return <TabsStory {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    {
      id: "1",
      name: "Bucket",
      icon: <ResourceIcon resourceType="cloud.Bucket" className="w-4 h-4" />,
    },
    {
      id: "2",
      name: "Function",
      icon: <ResourceIcon resourceType="cloud.Function" className="w-4 h-4" />,
    },
    {
      id: "3",
      name: "Construct",
      icon: (
        <ResourceIcon resourceType="constructs.Construct" className="w-4 h-4" />
      ),
    },
    {
      id: "4",
      name: "endpoint",
      icon: <ResourceIcon resourceType="cloud.Endpoint" className="w-4 h-4" />,
    },
  ],
  currentTabId: "2",
};
