import classNames from "classnames";
import { PropsWithChildren } from "react";

import { useTheme } from "./theme-provider.js";
export interface PillProps {
  textSize?: "xs" | "base";
}

export const Pill = ({
  children,
  textSize = "base",
}: PropsWithChildren<PillProps>) => {
  const { theme } = useTheme();
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded px-1.5 truncate",
        theme.bg2,
        theme.text2,
        {
          "text-[0.6rem]": textSize === "xs",
          "text-xs": textSize === "base",
        },
      )}
    >
      <span className="truncate">{children}</span>
    </span>
  );
};
