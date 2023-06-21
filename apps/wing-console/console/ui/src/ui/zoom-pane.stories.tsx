import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ZoomPane, ZoomPaneProvider } from "./zoom-pane.js";

export default {
  title: "UI/MapView/ZoomPane",
  component: ZoomPane,
  parameters: {
    docs: {
      description: {
        component: "A zoomable pane.",
      },
    },
  },
} satisfies ComponentMeta<typeof ZoomPane>;

const Template: ComponentStory<typeof ZoomPane> = (props) => (
  <div className="h-full flex flex-col bg-slate-100">
    <ZoomPaneProvider>
      <ZoomPane className="grow">
        <div className="p-8">
          <div className="w-32 h-32 bg-blue-500"></div>
        </div>
      </ZoomPane>
    </ZoomPaneProvider>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
