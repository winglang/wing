import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
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
  onCollapseAll?: () => void;
  onExpandAll?: () => void;
}

export const MapControls = ({
  onCollapseAll,
  onExpandAll,
  onZoomIn,
  onZoomOut,
  onZoomToFit,
}: MapControlsProps) => {
  return (
    <div className="flex justify-normal items-center">
      <div className="grow" />

      <div>
        <Toolbar>
          <ToolbarButton title="Collapse all" onClick={onCollapseAll}>
            <ChevronDownIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton title="Expand all" onClick={onExpandAll}>
            <ChevronUpIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton title="Zoom out" onClick={onZoomOut}>
            <MagnifyingGlassMinusIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton title="Zoom in" onClick={onZoomIn}>
            <MagnifyingGlassPlusIcon className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton title="Zoom to fit" onClick={onZoomToFit}>
            <ArrowsPointingOutIcon className="w-4 h-4" />
          </ToolbarButton>
        </Toolbar>
      </div>
    </div>
  );
};
