import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProgressBar } from "./progress-bar.js";

export default {
  title: "ProgressBar",
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: "Progress bar component.",
      },
    },
  },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (props) => {
  return (
    <div className={"w-[250px]"}>
      <ProgressBar progress={props.progress} size={props.size} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  progress: 25,
  size: "sm",
};
