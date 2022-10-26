import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SlideOver } from "./SlideOver.js";

export default {
  title: "DesignSystem/SlideOver",
  component: SlideOver,
  argTypes: {
    open: {
      type: "boolean",
    },
  },
} as ComponentMeta<typeof SlideOver>;

export const Default: ComponentStory<typeof SlideOver> = (args) => {
  return (
    <SlideOver {...args}>
      <div className="absolute inset-0 px-4 sm:px-6">
        <div
          className="h-full border-2 border-dashed border-slate-200 rounded"
          aria-hidden="true"
        />
      </div>
    </SlideOver>
  );
};
Default.args = {
  open: true,
  title: "Panel Title",
};
