import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect, useState } from "react";

import { Breadcrumb, Breadcrumbs } from "@/components/Breadcrumbs";
import { breadcrumbs } from "@/stories/mockData";

const BreadcrumbsStory: ComponentStory<typeof Breadcrumbs> = (args) => {
  const [bc, setBc] = useState<Breadcrumb[]>([]);
  useEffect(() => {
    setBc(
      breadcrumbs.map((bc) => ({
        ...bc,
        onClick: (id: string) => {
          setBc((prevState) => {
            return prevState
              .filter((value) => value.id <= bc.id)
              .map((item) => ({
                ...item,
                current: item.id === bc.id,
              }));
          });
        },
      })),
    );
  }, []);

  return (
    <div className="flex-1 bg-white px-3 py-1.5">
      <Breadcrumbs breadcrumbs={bc} />
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
