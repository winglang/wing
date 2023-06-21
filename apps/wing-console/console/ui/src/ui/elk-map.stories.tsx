import { Meta, StoryObj } from "@storybook/react";

import { ElkMap } from "./elk-map.js";

const meta = {
  title: "UI/MapView/ElkMap",
  component: ElkMap,
  tags: ["autodocs"],
} satisfies Meta<typeof ElkMap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodes: [
      {
        id: "1",
        data: {
          className: "w-4 h-4 bg-red-500",
        },
      },
      {
        id: "2",
        data: {
          className: "w-12 h-4 bg-blue-500",
        },
      },
    ],
    // @ts-ignore
    node: (props) => <div className={props.node.data.className} />,
  },
};
