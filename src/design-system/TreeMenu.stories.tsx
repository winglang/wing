import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useEffect } from "react";

import { Button } from "../design-system/Button.js";
import { TreeMenu } from "../design-system/TreeMenu.js";
import { treeMenuItems as treeMenuItemsMock } from "../stories/mockData.js";
import {
  SchemaToTreeMenuItems,
  flattenTreeMenuItems,
  constructHubTreeToWingSchema,
} from "../stories/utils.js";
import { useTreeMenuItems } from "../utils/useTreeMenuItems.js";

const TreeMenuStory: ComponentStory<typeof TreeMenu> = (args) => {
  const treeMenu = useTreeMenuItems({
    treeMenuItems: args?.items ?? treeMenuItemsMock,
    selectedItemId: args?.selectedItemId,
    openMenuItemIds: args?.openMenuItemIds,
  });

  useEffect(() => {
    if (!args?.selectedItemId) {
      return;
    }
    const flattenedItems = flattenTreeMenuItems(args?.items || treeMenu.items);
    let parentId = flattenedItems.find(
      (item) => item.id === args.selectedItemId,
    )?.parentId;
    while (parentId) {
      treeMenu.toggle(parentId);
      parentId = flattenedItems.find((item) => item.id === parentId)?.parentId;
    }
  }, []);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button onClick={treeMenu.expandAll} label="Open All" />
        <Button onClick={treeMenu.collapseAll} label="Close All" />
      </div>

      <div className="flex-1 h-[600px] flex text-sm text-slate-800 border border-t-0 border-slate-200 overflow-hidden">
        <TreeMenu
          items={treeMenu.items}
          selectedItemId={treeMenu.currentItemId}
          openMenuItemIds={treeMenu.openItemIds}
          onItemClick={(item) => {
            treeMenu.toggle(item.id);
            treeMenu.setCurrent(item.id);
          }}
          title={args?.title || "Explorer"}
        />
      </div>
    </div>
  );
};

export default {
  title: "Components/TreeMenu",
  component: TreeMenu,
} as ComponentMeta<typeof TreeMenu>;

const Template: ComponentStory<typeof TreeMenu> = (args) => {
  return <TreeMenuStory {...args} />;
};
export const Primary = Template.bind({});
Primary.parameters = {
  docs: {
    description: {
      story: "Default collapsed TreeMenu",
    },
  },
};

export const ExpandedOneLevel = Template.bind({});
ExpandedOneLevel.parameters = {
  docs: {
    description: {
      story: "Expanded TreeMenu with one level",
    },
  },
};
ExpandedOneLevel.args = {
  openMenuItemIds: ["4", "9"],
};

export const SelectedItem = Template.bind({});
SelectedItem.parameters = {
  docs: {
    description: {
      story: "Selected TreeMenu item with auto expanded parents",
    },
  },
};
SelectedItem.args = {
  selectedItemId: "6",
};

export const ConstructHubStory = Template.bind({});
ConstructHubStory.parameters = {
  docs: {
    description: {
      story: "ConstructHub story",
    },
  },
};
ConstructHubStory.args = {
  title: "Construct-Hub",
  items: SchemaToTreeMenuItems(constructHubTreeToWingSchema()),
};
