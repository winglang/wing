import { useTheme, Button, Modal } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { set } from "zod";

import { trpc } from "../services/trpc.js";

import { DiscordButton } from "./discord-button.js";
import { RestartButton } from "./restart-button.js";

export interface HeaderProps {}

export const Header = () => {
  const { theme } = useTheme();

  const restartSimulatorMutation = trpc["app.restart"].useMutation();
  const [showRestartModal, setShowRestartModal] = useState(false);

  const restartSimulator = useCallback(async () => {
    setShowRestartModal(false);
    await restartSimulatorMutation.mutateAsync();
  }, [restartSimulatorMutation]);

  return (
    <div
      className={classNames(
        "w-full h-8 draggable-frame flex items-center px-2",
        theme.bg1,
        theme.text2,
      )}
    >
      <div className="w-1/3 grow flex items-center gap-x-1 text-sm">
        <RestartButton
          onRestart={() => setShowRestartModal(true)}
          loading={restartSimulatorMutation.isLoading}
        />
      </div>
      <div className="w-1/3 justify-center items-center text-center gap-x-1 flex text-sm"></div>
      <div className="w-1/3 flex space-x-2 justify-end">
        <DiscordButton />
      </div>
      <Modal visible={showRestartModal}>
        <div className="flex flex-col gap-4 max-w-lg items-center">
          <h3
            className={classNames(
              theme.text1,
              "text-base font-semibold leading-6",
            )}
          >
            Reset Simulator
          </h3>
          <p className={classNames(theme.text2, "text-sm text-center")}>
            Are you sure you want to reset all state and restart the
            application?
          </p>
          <div className="flex justify-around gap-2">
            <Button onClick={() => setShowRestartModal(false)}>Cancel</Button>{" "}
            <Button
              onClick={restartSimulator}
              dataTestid="restart-simulator-button"
            >
              Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
