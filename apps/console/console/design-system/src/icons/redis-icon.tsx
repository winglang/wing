import { forwardRef } from "react";

type RedisIconProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
  title?: string;
  titleId?: string;
} & React.RefAttributes<SVGSVGElement>;

export const RedisIcon = forwardRef<SVGSVGElement, RedisIconProps>(
  ({ title, titleId, ...props }, svgRef) => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          ref={svgRef}
          aria-labelledby={titleId}
          {...props}
        >
          {title && <title id={titleId}>{title}</title>}
          <path
            fill="currentColor"
            d="M32 19.1c0 .3-.4.7-1.3 1.1-1.7.9-10.5 4.5-12.4 5.5-1.9 1-3 1-4.4.3-1.5-.7-11-4.5-12.6-5.4-.9-.4-1.3-.7-1.3-1v3.2c0 .3.4.7 1.3 1 1.7.9 11.1 4.7 12.6 5.4 1.5.7 2.5.7 4.4-.3 1.9-1 10.7-4.6 12.4-5.5 1-.4 1.3-.8 1.3-1V19zm0-5.3c0 .4-.4.7-1.3 1.1-1.7 1-10.5 4.6-12.4 5.5-1.9 1-3 1-4.4.3-1.5-.7-11-4.5-12.6-5.3C.4 15 0 14.6 0 14.3v3.2c0 .4.4.7 1.3 1.1l12.6 5.3c1.5.7 2.5.8 4.4-.2 1.9-1 10.7-4.6 12.4-5.5 1-.5 1.3-.8 1.3-1.2v-3.2zm0-5.4c0-.3-.4-.6-1.3-1L18.6 2.8c-1.7-.6-2.4-.6-4.4.1l-13 5c-.8.4-1.2.7-1.2 1v3.3c0 .3.4.6 1.3 1l12.6 5.4c1.5.7 2.5.7 4.4-.3 1.9-1 10.7-4.6 12.5-5.5.8-.5 1.2-.8 1.2-1.1V8.4zm-20.5 3 7.4-1.1-2.3 3.3zm16.4-3-4.9 2-4.4-1.7 4.9-2zm-13-3.1L14.4 4l2.2.9 2.1-.7-.6 1.3 2.2.8-2.8.3-.6 1.5-1-1.6-3.2-.3zM9.6 7.2c2.2 0 4 .7 4 1.5 0 .9-1.9 1.5-4 1.5s-4-.6-4-1.5c0-.8 1.8-1.5 4-1.5z"
          />
        </svg>
      </>
    );
  },
);
