import classNames from "classnames";
import { PropsWithChildren } from "react";

import { useTheme } from "./theme-provider.js";

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
  const { theme } = useTheme();
  return (
    <button
      className={classNames(
        theme.bg2Hover,
        theme.text1,
        theme.focusInput,
        "text-xs",
        "py-0.5 px-1 rounded group flex items-center gap-1",
        {
          "opacity-70 cursor-not-allowed": disabled,
        },
      )}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
