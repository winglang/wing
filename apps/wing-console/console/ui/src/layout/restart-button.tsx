import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@wingconsole/design-system";

export const RestartButton = ({
  onRestart,
  loading,
}: {
  onRestart?: () => void;
  loading: boolean;
}) => {
  return (
    <Button
      onClick={onRestart}
      small
      icon={ArrowPathIcon}
      disabled={loading}
      iconClassName={loading ? "animate-spin" : undefined}
    >
      Reset
    </Button>
  );
};
