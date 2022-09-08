import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect, useState } from "react";

import { TreeMenu, TreeMenuItem } from "@/components/TreeMenu";
import { treeMenuItems } from "@/stories/mockData";
import {
  constructHubTreeToTreeMenuItems,
  flattenTreeMenuItems,
} from "@/stories/utils";

const TreeMenuStory: ComponentStory<typeof TreeMenu> = (args) => {
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(
    args?.selectedItemId || undefined,
  );
  const [openMenuItemIds, setOpenMenuItemIds] = useState<string[]>(
    args?.openMenuItemIds || [],
  );

  useEffect(() => {
    if (!args?.selectedItemId) {
      return;
    }
    const flattenedItems = flattenTreeMenuItems(args?.items || treeMenuItems);
    let parentId = flattenedItems.find(
      (item) => item.id === args.selectedItemId,
    )?.parentId;
    while (parentId) {
      updateOpenedMenuItems(parentId);
      parentId = flattenedItems.find((item) => item.id === parentId)?.parentId;
    }
  }, []);

  const updateOpenedMenuItems = (id: string) => {
    setOpenMenuItemIds(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(id);
      if (index !== -1) {
        openedMenuItems.splice(index, 1);
        return openedMenuItems;
      }

      openedMenuItems.push(id);
      return openedMenuItems;
    });
  };

  const enrichTreeMenuItems = (tree: TreeMenuItem[]): TreeMenuItem[] => {
    return tree.map((item) => {
      return {
        ...item,
        children: item.children ? enrichTreeMenuItems(item.children) : [],
        onTreeItemClick: (item) => {
          updateOpenedMenuItems(item.id);
          setSelectedItemId(item.id);
        },
      };
    });
  };

  return (
    <div className="flex-1 h-[600px] flex text-sm text-slate-800 border border-t-0 border-slate-200 overflow-hidden">
      <TreeMenu
        items={enrichTreeMenuItems(args?.items || treeMenuItems)}
        selectedItemId={selectedItemId}
        openMenuItemIds={openMenuItemIds}
        title={args?.title || "Wing Console"}
      />
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
  items: constructHubTreeToTreeMenuItems(),
};
