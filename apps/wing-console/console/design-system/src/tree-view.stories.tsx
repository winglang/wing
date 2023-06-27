import { CubeIcon } from "@heroicons/react/24/outline";
import { Meta, StoryObj } from "@storybook/react";

import { TreeItem } from "./tree-item.js";
import { TreeView } from "./tree-view.js";

const meta = {
  title: "Design System/TreeView",
  component: TreeView,
  tags: ["autodocs"],
} satisfies Meta<typeof TreeView>;

export default meta;

type Story = StoryObj<typeof meta>;

const icon = <CubeIcon className="w-4 h-4" />;

export const Default: Story = {
  args: {
    defaultExpandedItems: ["3"],
    defaultSelectedItem: "3.1",
    children: (
      <>
        <TreeItem itemId="1" label="1" icon={icon} />
        <TreeItem itemId="2" label="2" icon={icon} />
        <TreeItem itemId="3" label="3" icon={icon}>
          <TreeItem itemId="3.1" label="3.1" icon={icon} />
          <TreeItem itemId="3.2" label="3.2" icon={icon} />
          <TreeItem itemId="4" label="4" icon={icon}>
            <TreeItem itemId="4.1" label="4.1" icon={icon} />
            <TreeItem itemId="4.2" label="4.2" icon={icon} />
          </TreeItem>
        </TreeItem>
      </>
    ),
  },
};
