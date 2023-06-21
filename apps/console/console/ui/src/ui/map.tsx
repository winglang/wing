import { ResourceIcon, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { ContainerNode } from "./elk-map-nodes.js";
import { ElkMap } from "./elk-map.js";
import { MapControls } from "./map-controls.js";
import { ZoomPaneProvider } from "./zoom-pane.js";

export interface MapProps {
  selectedNodeId?: string;
  showTests?: boolean;
  showMapControls?: boolean;
  onSelectedNodeIdChange?: (id: string | undefined) => void;
  mapData: any;
}
export const Map = ({
  showMapControls,
  showTests,
  onSelectedNodeIdChange,
  selectedNodeId,
  mapData,
}: MapProps) => {};
