import { forwardRef, ComponentProps } from "react";

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
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
          viewBox="0 -18 256 256"
          ref={svgRef}
          aria-labelledby={titleId}
          {...props}
        >
          {title && <title id={titleId}>{title}</title>}
          <path
            fill="#912626"
            d="m246 169-100 44c-15 8-23 8-35 2L10 173c-6-4-10-6-10-9v-26s98-21 114-27 21-6 35-1c13 5 94 20 107 24v26c0 3-3 5-10 9"
          />
          <path
            fill="#C6302B"
            d="m246 143-100 44c-15 8-23 8-35 2L10 147c-13-7-14-11 0-16l104-41c16-5 21-6 35-1l97 38c13 5 14 9 0 16"
          />
          <path
            fill="#912626"
            d="m246 127-100 44c-15 8-23 8-35 2L10 131c-6-4-10-6-10-9V96s98-21 114-27c16-5 21-6 35-1 13 5 94 20 107 25v25c0 3-3 5-10 9"
          />
          <path
            fill="#C6302B"
            d="m246 101-100 44c-15 8-23 8-35 3L10 105c-13-7-14-11 0-16l104-41c16-5 21-5 35 0l97 37c13 5 14 9 0 16"
          />
          <path
            fill="#912626"
            d="m246 84-100 44c-15 8-23 8-35 2L10 87c-6-3-10-6-10-8V53s98-22 114-27c16-6 21-6 35-1 13 5 94 19 107 24v26c0 2-3 5-10 9"
          />
          <path
            fill="#C6302B"
            d="m246 58-100 44c-15 8-23 8-35 2L10 61c-13-6-13-10 0-16L114 5c16-6 21-6 35-1l97 38c13 5 14 9 0 16"
          />
          <path
            fill="#FFF"
            d="m159 33-22 2-5 12-8-13-25-3 19-6-6-11 18 7 17-5-5 10 17 7m-28 57L90 73l59-9-18 26M74 39c17 0 32 6 32 13 0 6-15 12-32 12s-31-6-31-12c0-7 14-13 31-13"
          />
          <path fill="#621B1C" d="m185 36 35 14-35 14V36" />
          <path fill="#9A2928" d="m147 51 38-15v28l-3 1-35-14" />
        </svg>
      </>
    );
  },
);
