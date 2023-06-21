import { Meta, StoryObj } from "@storybook/react";

import { SpinnerLoader } from "./spinner-loader.js";

const meta = {
  title: "Design System/SpinnerLoader",
  component: SpinnerLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof SpinnerLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
  },
};
