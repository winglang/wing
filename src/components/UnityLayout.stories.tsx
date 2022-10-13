import { ComponentStory, ComponentMeta } from "@storybook/react";

import { buildNodeMap } from "@/utils/nodeMap";

import { constructHubTreeToWingSchema } from "../stories/utils";

import { UnityLayout } from "./UnityLayout";

export default {
  title: "Layouts/Unity",
  component: UnityLayout,
  args: {},
} as ComponentMeta<typeof UnityLayout>;

const Template: ComponentStory<typeof UnityLayout> = () => {
  // const { schema, nodeMap } = useTreeNodeMap();
  const schema = constructHubTreeToWingSchema();
  const nodeMap = buildNodeMap(schema.root);

  return (
    <div className="select-none dark fixed left-0 top-0 h-full w-full">
      <UnityLayout schema={schema} nodeMap={nodeMap} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
