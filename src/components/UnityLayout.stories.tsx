import { ComponentStory, ComponentMeta } from "@storybook/react";

import { constructHubTreeToWingSchema } from "../stories/utils.js";

import { UnityLayout } from "./UnityLayout.js";

export default {
  title: "Layouts/Unity",
  component: UnityLayout,
  args: {},
} as ComponentMeta<typeof UnityLayout>;

const Template: ComponentStory<typeof UnityLayout> = () => {
  const schema = constructHubTreeToWingSchema();

  return (
    <div className="select-none dark fixed left-0 top-0 h-full w-full">
      <UnityLayout schema={schema} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
