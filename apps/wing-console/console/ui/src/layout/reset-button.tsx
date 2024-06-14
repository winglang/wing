import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Modal, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useState } from "react";

import { trpc } from "../services/trpc.js";

export const ResetButton = ({ disabled }: { disabled?: boolean }) => {
  const { theme } = useTheme();

  const resetMutation = trpc["app.reset"].useMutation();
  const [showRestartModal, setShowRestartModal] = useState(false);

  const restart = useCallback(async () => {
    setShowRestartModal(false);
    await resetMutation.mutateAsync();
  }, [resetMutation]);

  return (
    <>
      <button
        onClick={() => setShowRestartModal(true)}
        className={classNames(
          "flex items-center gap-x-1 px-1 py-0.5",
          theme.bg2Hover,
          "transition-all",
          disabled && "cursor-not-allowed opacity-50",
        )}
        disabled={resetMutation.isLoading || disabled}
      >
        <ArrowPathIcon className="size-3.5" />
        <span>Reset</span>
      </button>

      <Modal visible={showRestartModal}>
        <div className="flex flex-col gap-4 max-w-lg items-center">
          <h3
            className={classNames(
              theme.text1,
              "text-base font-semibold leading-6",
            )}
          >
            Reset Application
          </h3>
          <p className={classNames(theme.text2, "text-sm text-center")}>
            Are you sure you want to reset all state and restart the
            application?
          </p>
          <div className="flex justify-around gap-2">
            <Button onClick={() => setShowRestartModal(false)}>Cancel</Button>{" "}
            <Button onClick={restart} dataTestid="restart-simulator-button">
              Reset
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
