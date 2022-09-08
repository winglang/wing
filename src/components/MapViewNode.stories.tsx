import { CubeIcon } from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MapViewNode } from "./MapViewNode.js";

export default {
  title: "Experimental/MapViewNode",
  component: MapViewNode,
  args: {
    // centerSidesVertically: false,
  },
} as ComponentMeta<typeof MapViewNode>;

const Template: ComponentStory<typeof MapViewNode> = (args) => (
  <div className="max-w-lg">
    <MapViewNode {...args} />
  </div>
);

export const Open = Template.bind({});
Open.args = {
  defaultOpen: true,
  resource: {
    name: "image-scrapper",
    id: "scrape-images-d5755084",
    type: "co.monada.wing.cloud.Function",
    icon: CubeIcon,
  },
};

export const Closed = Template.bind({});
Closed.args = {
  defaultOpen: false,
  resource: {
    name: "image-scrapper",
    id: "scrape-images-d5755084",
    type: "co.monada.wing.cloud.Function",
    icon: CubeIcon,
  },
};

export const LargeTexts = Template.bind({});
LargeTexts.args = {
  defaultOpen: true,
  resource: {
    name: "image-scrapper",
    id: "App/image-scrapper/scrape-images-d5755084",
    type: "co.monada.wing.cloud.Function.co.monada.wing.cloud.Function",
    icon: CubeIcon,
  },
};
