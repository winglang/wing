import React from "react";

interface Square2StackMinusIconProps extends React.ComponentProps<"svg"> {
  title?: string;
  titleId?: string;
}

export const SquareStackMinusIcon = React.forwardRef<
  SVGSVGElement,
  Square2StackMinusIconProps
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
        d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
      />
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="14.25"
        y1="11.25"
        x2="14.25"
        y2="17.25"
      />
    </svg>
  );
});
