import React from "react";

interface ArrowLongRightIconProps extends React.ComponentProps<"svg"> {
  title?: string;
  titleId?: string;
}

export const ArrowLongRightIcon = React.forwardRef<
  SVGSVGElement,
  ArrowLongRightIconProps
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H0"
      />
    </svg>
  );
});
