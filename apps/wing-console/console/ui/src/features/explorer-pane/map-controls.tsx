import {
  ArrowsPointingOutIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
import { Toolbar, ToolbarButton } from "@wingconsole/design-system";

export interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomToFit?: () => void;
}

export const MapControls = ({
  onZoomIn,
  onZoomOut,
  onZoomToFit,
}: MapControlsProps) => {
  return (
    <div className="flex justify-normal items-center">
      <div className="grow" />

      <div>
        <Toolbar>
          <ToolbarButton title="Zoom out" onClick={onZoomOut}>
            <MagnifyingGlassMinusIcon className="size-4" />
          </ToolbarButton>

          <ToolbarButton title="Zoom in" onClick={onZoomIn}>
            <MagnifyingGlassPlusIcon className="size-4" />
          </ToolbarButton>

          <ToolbarButton title="Zoom to fit" onClick={onZoomToFit}>
            <ArrowsPointingOutIcon className="size-4" />
          </ToolbarButton>
        </Toolbar>
      </div>
    </div>
  );
};
