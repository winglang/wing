import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme, Button } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback } from "react";

import { trpc } from "../services/trpc.js";

import { DiscordButton } from "./discord-button.js";
import { RestartButton } from "./restart-button.js";

export interface HeaderProps {}

export const Header = () => {
  const { theme } = useTheme();

  const restartSimulatorMutation = trpc["app.restart"].useMutation();

  const restartSimulator = useCallback(async () => {
    //setSelectedItems(["root"]);
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
          onRestart={restartSimulator}
          loading={restartSimulatorMutation.isLoading}
        />
      </div>
      <div className="w-1/3 justify-center items-center text-center gap-x-1 flex text-sm"></div>
      <div className="w-1/3 flex space-x-2 justify-end">
        <DiscordButton />
      </div>
    </div>
  );
};
