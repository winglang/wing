import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export const RestartButton = ({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex items-center gap-x-1 px-1 py-0.5",
        theme.bg2Hover,
        "transition-all",
        disabled && "cursor-not-allowed opacity-50",
      )}
      disabled={disabled}
    >
      <ArrowPathIcon className="size-3.5" />
      <span>Restart</span>
    </button>
  );
};
