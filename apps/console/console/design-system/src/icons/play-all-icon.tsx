import React from "react";

interface PlayAllIconProps extends React.ComponentProps<"svg"> {
  title?: string;
  titleId?: string;
}

export const PlayAllIcon = React.forwardRef<SVGSVGElement, PlayAllIconProps>(
  ({ title, titleId, ...props }, svgRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        ref={svgRef}
        aria-labelledby={titleId}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        <path d="M5 8.69c0-.87.93-1.4 1.68-.98l7.11 4.06a1.13 1.13 0 0 1 0 1.96l-7.1 4.06A1.13 1.13 0 0 1 5 16.8V8.69zm5.75 0c0-.87.93-1.4 1.68-.98l7.11 4.06a1.13 1.13 0 0 1 0 1.96l-7.1 4.06a1.13 1.13 0 0 1-1.69-.98l0 -1M10.76 10l0 -1.5" />
      </svg>
    );
  },
);
