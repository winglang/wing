import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UnityLayout } from "./UnityLayout.js";

export default {
  title: "Layouts/Unity",
  component: UnityLayout,
  args: {},
} as ComponentMeta<typeof UnityLayout>;

const Template: ComponentStory<typeof UnityLayout> = () => {
  return (
    <div className="select-none dark fixed left-0 top-0 h-full w-full">
      <UnityLayout />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
