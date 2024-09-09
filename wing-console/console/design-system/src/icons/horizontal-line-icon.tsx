import React from "react";

interface HorizontalLineIconProps extends React.ComponentProps<"svg"> {
  title?: string;
  titleId?: string;
}

export const HorizontalLineIcon = React.forwardRef<
  SVGSVGElement,
  HorizontalLineIconProps
>(({ title, titleId, ...props }, svgRef) => {
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
      <path d="M0 12H24" />
    </svg>
  );
});
