import {
  ArrowsPointingOutIcon,
  ChevronUpDownIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
import { Toolbar, ToolbarButton, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { zoomIdentity } from "d3-zoom";
import { useCallback, useContext } from "react";

import { TestsContext } from "../../utils/tests-context.js";

import { useZoomPaneContext, Selection } from "./zoom-pane.js";

const selectionTransition = (selection: Selection, duration?: number) => {
  const newSelection = (selection as any).transition();
  if (duration) {
    return newSelection.duration(duration) as Selection;
  }
  return newSelection as Selection;
};

export interface MapControlsProps {}

export const MapControls = ({}: MapControlsProps) => {
  const { zoom, selection, targetRef } = useZoomPaneContext();

  const zoomToFit = useCallback(() => {
    const node = selection?.node();
    if (!selection || !node) {
      return;
    }

    if (!targetRef.current) {
      return;
    }

    const width = node.clientWidth;
    const height = node.clientHeight;
    const x0 = 0;
    const y0 = 0;
    const x1 = targetRef.current.clientWidth;
    const y1 = targetRef.current.clientHeight;
    selectionTransition(selection, 800).call(
      zoom.transform,
      zoomIdentity
        .translate(width / 2, height / 2)
        .scale(
          Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)),
        )
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
    );
  }, [selection, zoom, targetRef]);

  const zoomOut = useCallback(() => {
    if (!selection) {
      return;
    }
    selectionTransition(selection).call(zoom.scaleBy, 0.9);
  }, [selection, zoom]);

  const zoomIn = useCallback(() => {
    if (!selection) {
      return;
    }
    selectionTransition(selection).call(zoom.scaleBy, 1.1);
  }, [selection, zoom]);

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

          <ToolbarButton title="Zoom to fit" onClick={zoomToFit}>
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
