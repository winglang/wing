import { CubeIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NewNodeRelationshipsView } from "./NewNodeRelationshipsView";

export default {
  title: "Components/NewNodeRelationshipsView",
  component: NewNodeRelationshipsView,
} as ComponentMeta<typeof NewNodeRelationshipsView>;

const Template: ComponentStory<typeof NewNodeRelationshipsView> = (args) => (
  <div className="max-w-lg">
    <NewNodeRelationshipsView {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  node: {
    icon: <CubeIcon className="w-4 h-4 text-violet-500" aria-hidden="true" />,
    id: "endpoint",
    path: "endpoint",
  },
  inbound: [
    {
      icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
      id: "function-1",
      path: "function-1",
      relationshipName: "invoke",
    },
  ],
  outbound: [
    {
      icon: <CubeIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
      id: "function-2",
      path: "function-2",
      relationshipName: "invoke",
    },
  ],
};
