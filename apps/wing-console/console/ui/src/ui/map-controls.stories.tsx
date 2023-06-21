import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MapControls } from "./map-controls.js";
import { ZoomPaneProvider } from "./zoom-pane.js";

export default {
  title: "UI/MapView/MapControls",
  component: MapControls,
  parameters: {
    docs: {
      description: {
        component: "Provides controls for the MapView.",
      },
    },
  },
} satisfies ComponentMeta<typeof MapControls>;

const Template: ComponentStory<typeof MapControls> = (props) => (
  <div className="inline-block">
    <ZoomPaneProvider>
      <MapControls {...props} />
    </ZoomPaneProvider>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
