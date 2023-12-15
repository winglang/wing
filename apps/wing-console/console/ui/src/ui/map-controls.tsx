import {
  ArrowsPointingOutIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
import { Toolbar, ToolbarButton } from "@wingconsole/design-system";
import { useContext } from "react";

import { TestsContext } from "../tests-context.js";

import { useZoomPaneContext } from "./zoom-pane.js";

export interface MapControlsProps {}

export const MapControls = ({}: MapControlsProps) => {
  const { zoomIn, zoomOut, zoomToFit } = useZoomPaneContext();

  const { showTests, setShowTests, testsExists } = useContext(TestsContext);

  return (
    <div className="flex justify-normal items-center">
      <div className="grow" />

      <div>
        <Toolbar>
          <ToolbarButton title="Zoom out" onClick={zoomOut}>
            <MagnifyingGlassMinusIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton title="Zoom in" onClick={zoomIn}>
            <MagnifyingGlassPlusIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton title="Zoom to fit" onClick={zoomToFit}>
            <ArrowsPointingOutIcon className="w-4 h-4" />
          </ToolbarButton>
        </Toolbar>
      </div>
    </div>
  );
};
