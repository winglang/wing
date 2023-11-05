import {
  ArrowsPointingOutIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
import { Toolbar, ToolbarButton, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
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

          <ToolbarButton title="Zoom to fit" onClick={() => zoomToFit()}>
            <ArrowsPointingOutIcon className="w-4 h-4" />
          </ToolbarButton>

          {testsExists && (
            <div className="ml-2">
              <ToolbarButton
                title={showTests ? "Hide tests" : "Show tests"}
                onClick={() => setShowTests(!showTests)}
              >
                <div className="flex items-center gap-1">
                  {showTests ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                  <span className="text-xs px-0.5">
                    {showTests ? "Hide tests" : "Show tests"}
                  </span>
                </div>
              </ToolbarButton>
            </div>
          )}
        </Toolbar>
      </div>
    </div>
  );
};
