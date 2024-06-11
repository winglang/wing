import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export const RestartButton = ({
  onClick,
  loading,
}: {
  onClick?: () => void;
  loading: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex items-center gap-x-1 px-1 py-0.5",
        theme.bg2Hover,
        "transition-all",
        loading && "cursor-not-allowed opacity-50",
      )}
      disabled={loading}
    >
      <ArrowPathIcon
        className={classNames("size-4", loading ? "animate-spin" : "")}
      />
      <span>Restart</span>
    </button>
  );
};
