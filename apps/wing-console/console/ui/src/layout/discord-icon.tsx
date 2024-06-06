import { forwardRef } from "react";

type DiscordIconProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
  title?: string;
  titleId?: string;
} & React.RefAttributes<SVGSVGElement>;

export const DiscordIcon = forwardRef<SVGSVGElement, DiscordIconProps>(
  ({ title, titleId, ...props }, svgRef) => {
    return (
      <svg
        viewBox="0 -29 256 256"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        aria-labelledby={titleId}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}

        <path
          fill="currentColor"
          stroke="currentColor"
          d="M217 17c-17-8-34-14-53-17l-7 14c-19-3-39-3-58 0L92 0C73 3 56 9 39 17 6 67-3 116 1 165c22 17 44 27 65 33l14-23-22-10 5-5c42 20 88 20 130 0l5 5-22 10 14 23c21-6 43-16 65-33 5-56-9-105-38-148ZM85 135c-12 0-23-12-23-26s11-26 23-26c13 0 24 12 23 26 1 14-10 26-23 26Zm86 0c-13 0-23-12-23-26s10-26 23-26c12 0 23 12 23 26s-11 26-23 26Z"
        />
      </svg>
    );
  },
);
