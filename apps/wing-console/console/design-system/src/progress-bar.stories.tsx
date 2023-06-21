import { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./progress-bar.js";

const meta = {
  title: "Design System/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 25,
    size: "sm",
  },
};
