import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ElkMap } from "./ElkMap.js";

export default {
  title: "UI/ElkMap",
  component: ElkMap,
} satisfies ComponentMeta<typeof ElkMap>;

const Template: ComponentStory<typeof ElkMap> = (props) => (
  <ElkMap {...props} />
);

export const Default = Template.bind({});
Default.args = {
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
};
