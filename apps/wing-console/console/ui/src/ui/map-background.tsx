import type { FunctionComponent } from "react";
import { useId } from "react";

import { useZoomPane } from "./zoom-pane.js";

export interface MapBackgroundProps {
  hideDots?: boolean;
}

export const MapBackground: FunctionComponent<MapBackgroundProps> = ({
  hideDots,
}) => {
  const { viewTransform } = useZoomPane();
  const patternSize = 12 * viewTransform.z;
  const dotSize = 1 * viewTransform.z;
  const id = useId();
  return (
    // Reference: https://github.com/xyflow/xyflow/blob/13897512d3c57e72c2e27b14ffa129412289d948/packages/react/src/additional-components/Background/Background.tsx#L52-L86.
    <svg className="absolute w-full h-full top-0 left-0 bg-slate-50 dark:bg-slate-600 text-slate-200 dark:text-slate-550">
      {!hideDots && (
        <>
          <pattern
            id={id}
            x={(-viewTransform.x * viewTransform.z) % patternSize}
            y={(-viewTransform.y * viewTransform.z) % patternSize}
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(-${viewTransform.z},-${viewTransform.z})`}
          >
            <circle
              cx={dotSize}
              cy={dotSize}
              r={dotSize}
              fill="currentColor"
            ></circle>
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${id})`}
          ></rect>
        </>
      )}
    </svg>
  );
};
