import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@wingconsole/design-system";

export const RestartButton = ({ onRestart }: { onRestart?: () => void }) => {
  return (
    <Button onClick={onRestart} small icon={ArrowPathIcon}>
      Restart simulator
    </Button>
  );
};
