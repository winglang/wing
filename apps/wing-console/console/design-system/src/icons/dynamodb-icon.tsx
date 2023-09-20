import { forwardRef } from "react";

type DynamoDBIconProps = React.PropsWithoutRef<
  React.SVGProps<SVGSVGElement>
> & {
  title?: string;
  titleId?: string;
} & React.RefAttributes<SVGSVGElement>;

export const DynamoDBIcon = forwardRef<SVGSVGElement, DynamoDBIconProps>(
  ({ title, titleId, ...props }, svgRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 289"
        aria-hidden="true"
        ref={svgRef}
        aria-labelledby={titleId}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}
        <path
          fill="#5294CF"
          d="M165.3 288.5h3.5l57.2-28.6 1-1.4V30l-1-1.4L168.8 0h-3.6v288.5"
        />
        <path
          fill="#1F5B98"
          d="M90.7 288.5h-3.5L30 259.9l-1.2-2L28.2 31l1.8-2.5L87.2 0h3.6v288.5"
        />
        <path fill="#2D72B8" d="M87.3 0h81.4v288.5H87.3V0z" />
        <path
          fill="#1A476F"
          d="m256 137.8-2-.5-27.6-2.5-.4.2-57.3-2.3H87.3L30 135V91.2l57.3-13.3h81.4L226 91.2l21.1 11.2v-7.2l8.9-1-1-1.8-28-20.2-.9.3-57.3-17.7H87.3L30 72.5V28.6L0 63.7v30.7l.2-.2 8.7 1v7.3L0 107.3v30.5h.2l8.7.1v12.8l-7.5.1-1.4-.1v30.5l8.9 4.8v7.4l-8.5 1-.4-.3v30.6L30 260v-44l57.3 17.8h81.4l57.5-17.8.8.3 27.8-19.8 1.2-2-8.9-1v-7.3l-1.2-.4-19 10.2-.7 1.5-57.5 13.2H87.3L30 197.3v-43.8l57.3 2.2v.1h81.4l57.3-2.3 1.3.6 26.8-2.3 1.9-1-8.9-.1v-12.8l8.9-.1"
        />
        <path
          fill="#2D72B8"
          d="M226 216v43.9l30-35.2v-30.4l-29.8 21.6h-.2m0-18.5h.2l29.8-16v-30.7l-30 2.8v44m.2-106.3h-.2V135l30 2.8V107l-29.8-15.9m0-18.5L256 94.2V63.7l-30-35v43.8h.2v.2"
        />
      </svg>
    );
  },
);
