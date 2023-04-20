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

import { TestsContext } from "../../utils/tests-context.js";

import { useZoomPaneContext, Selection } from "./zoom-pane.js";

export interface MapControlsProps {}

export const MapControls = ({}: MapControlsProps) => {
  const { zoomIn, zoomOut, zoomToFit } = useZoomPaneContext();

  const { showTests, setShowTests } = useContext(TestsContext);

  const theme = useTheme();

  return (
    <div className={classNames("flex justify-normal items-center", theme.bg3)}>
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
        </Toolbar>
      </div>

      <div className="py-2 h-full">
        <div className={classNames("h-full border-l", theme.border3)}></div>
      </div>

      <div>
        <Toolbar>
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
        </Toolbar>
      </div>
    </div>
  );
};
