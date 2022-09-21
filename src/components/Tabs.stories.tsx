import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useEffect, useState } from "react";

import { Tab, Tabs } from "@/components/Tabs";
import { getResourceIcon } from "@/stories/utils";

const TabsStory: ComponentStory<typeof Tabs> = (args) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  useEffect(() => {
    setTabs(() => {
      return args.tabs.map((tab) => ({
        ...tab,
        onClick: (id: string) => {
          setTabs((prevState) => {
            return prevState.map((item) => ({
              ...item,
              current: item.id === id,
            }));
          });
        },
      }));
    });
  }, []);
  return (
    <div className="flex-1 h-20 bg-white px-1.5 py-1.5">
      <Tabs tabs={tabs} />
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
      onClick: (id: string) => console.log(id),
      icon: getResourceIcon("cloud.Bucket"),
      current: false,
    },
    {
      id: "2",
      name: "Function",
      onClick: (id: string) => console.log(id),
      icon: getResourceIcon("cloud.Function"),
      current: true,
    },
    {
      id: "3",
      name: "Construct",
      icon: getResourceIcon("constructs.Construct"),
      onClick: (id: string) => console.log(id),
      current: false,
    },
    {
      id: "4",
      name: "endpoint",
      icon: getResourceIcon("cloud.Endpoint"),
      onClick: (id: string) => console.log(id),
      current: false,
    },
  ],
};
