import {
  ArrowsPointingOutIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/solid";
import {
  SquareStackMinusIcon,
  SquareStackPlusIcon,
  Toolbar,
  ToolbarButton,
} from "@wingconsole/design-system";

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
            <SquareStackMinusIcon className="size-4 rotate-90" />
          </ToolbarButton>
          <ToolbarButton title="Expand all" onClick={onExpandAll}>
            <SquareStackPlusIcon className="size-4 rotate-90" />
          </ToolbarButton>

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
