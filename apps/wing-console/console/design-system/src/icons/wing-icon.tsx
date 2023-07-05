import { forwardRef } from "react";

type WingIconProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
  title?: string;
  titleId?: string;
} & React.RefAttributes<SVGSVGElement>;

export const WingIcon = forwardRef<SVGSVGElement, WingIconProps>(
  ({ title, titleId, ...props }, svgRef) => {
    return (
      <svg
        viewBox="0 0 251 153"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        aria-labelledby={titleId}
        {...props}
      >
        {title && <title id={titleId}>{title}</title>}

        <g clipPath="url(#clip0_2448_61911)">
          <path
            d="M95.4633 152.509C80.6038 152.509 68.2667 144.121 57.7313 126.868C49.6994 113.724 43.4407 96.6334 37.3907 80.1148C30.9424 62.5 24.2949 44.361 16.1777 33.0563C9.16038 23.2957 3.5845 22.1614 0 22.1614V0H60.2916C73.302 0 84.7667 6.75805 94.3539 20.074C104.244 33.8474 111.423 53.4448 118.364 72.394C123.608 86.7108 129.023 101.495 135.215 112.513L138.278 117.966L135.215 123.418C131.176 130.614 118.876 152.509 95.4728 152.509H95.4633ZM35.5036 22.1614C44.6545 35.7824 51.4632 54.3789 58.0632 72.3845C68.0296 99.5787 79.2952 130.338 95.4633 130.338C99.4556 130.338 105.411 128.899 112.921 117.584C107.231 106.175 102.376 92.9446 97.6728 80.0862C91.234 62.5096 84.5866 44.361 76.4693 33.0563C69.4425 23.2957 63.8667 22.1614 60.2822 22.1614H35.5036V22.1614Z"
            fill="currentColor"
          />
          <path
            d="M155.527 152.509C132.124 152.509 119.825 130.616 115.785 123.42L112.722 117.968L115.785 112.516C121.977 101.488 127.392 86.7149 132.626 72.4276C139.577 53.451 146.756 33.8548 156.646 20.0823C166.233 6.74809 177.698 0 190.708 0H251V22.1696C247.416 22.1696 241.84 23.3038 234.813 33.0733C226.705 44.3678 220.058 62.5152 213.628 80.0621C207.559 96.6369 201.301 113.717 193.269 126.87C182.733 144.121 170.396 152.509 155.537 152.509H155.527ZM138.069 117.587C145.58 128.9 151.535 130.339 155.527 130.339C171.695 130.339 182.961 99.5916 192.899 72.4562C199.518 54.3851 206.336 35.7802 215.478 22.1601H190.699C187.114 22.1601 181.539 23.2943 174.512 33.0638C166.404 44.3582 159.757 62.5057 153.327 80.0526C148.605 92.9388 143.759 106.168 138.069 117.577V117.587Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_2448_61911">
            <rect width="251" height="153" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
