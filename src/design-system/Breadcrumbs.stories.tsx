import { ComponentMeta, ComponentStory } from "@storybook/react";

import { breadcrumbs } from "../stories/mockData.js";

import { Breadcrumbs } from "./Breadcrumbs.js";

const BreadcrumbsStory: ComponentStory<typeof Breadcrumbs> = (args) => {
  return (
    <div className="flex-1 bg-white px-3 py-1.5">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
  );
};

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => {
  return <BreadcrumbsStory {...args} />;
};
export const Primary = Template.bind({});
Primary.parameters = {
  docs: {
    description: {
      story: "Default Breadcrumbs ui",
    },
  },
};
