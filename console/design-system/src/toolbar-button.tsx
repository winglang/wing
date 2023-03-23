import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface ToolbarButtonProps {
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const ToolbarButton = ({
  title,
  disabled,
  onClick,
  children,
}: PropsWithChildren<ToolbarButtonProps>) => {
  return (
    <button
      className={classNames("p-0.5 hover:bg-slate-200 rounded group", {
        "opacity-70 cursor-not-allowed": disabled,
      })}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
