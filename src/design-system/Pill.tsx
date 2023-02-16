import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface PillProps {
  textSize?: "xs" | "base";
}

export const Pill = ({
  children,
  textSize = "base",
}: PropsWithChildren<PillProps>) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded bg-slate-200 px-1.5 text-slate-500 shadow truncate",
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
