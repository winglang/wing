import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme, Loader, Button, Modal } from "@wingconsole/design-system";
import type { State } from "@wingconsole/server";
import classNames from "classnames";
import { useState, useCallback } from "react";

import { AutoUpdater } from "../features/auto-updater.js";
import { trpc } from "../services/trpc.js";

import { DiscordButton } from "./discord-button.js";
import { RestartButton } from "./restart-button.js";
import { ThemeToggle } from "./theme-toggle.js";

export interface StatusBarProps {
  wingVersion?: string;
  cloudAppState: State;
  isError?: boolean;
  showThemeToggle?: boolean;
}

export const StatusBar = ({
  wingVersion = "",
  cloudAppState,
  isError = false,
  showThemeToggle = false,
}: StatusBarProps) => {
  const { theme } = useTheme();
  const loading =
    cloudAppState === "loadingSimulator" || cloudAppState === "compiling";
  const cloudAppStateString = {
    compiling: "compiling",
    loadingSimulator: "loading simulator",
    success: "success",
    error: "error",
  };

  const restartMutation = trpc["app.restart"].useMutation();
  const [showRestartModal, setShowRestartModal] = useState(false);

  const restart = useCallback(async () => {
    setShowRestartModal(false);
    await restartMutation.mutateAsync();
  }, [restartMutation]);

  return (
    <footer
      className={classNames(
        theme.bg1,
        theme.text1,
        theme.border3,
        "px-4 flex items-center text-2xs w-full relative z-10",
      )}
    >
      {/*left side*/}
      <div className="w-full flex gap-4 items-center">
        <RestartButton
          onClick={() => setShowRestartModal(true)}
          disabled={restartMutation.isLoading || loading}
        />
        <div title={wingVersion} className="truncate space-x-1">
          {wingVersion && (
            <>
              <span>Wing</span>
              <span className={classNames(theme.text2)}>v{wingVersion}</span>
            </>
          )}
        </div>

        <div className="flex space-x-1">
          <span>Status:</span>
          <span className={classNames(theme.text2)}>
            <span
              data-testid="app-state"
              className={classNames([
                isError ? "text-red-500" : theme.text2,
                "flex",
              ])}
            >
              {loading && <Loader size="xs" className={"mr-1"} />}
              {cloudAppStateString[cloudAppState]}
            </span>
          </span>
        </div>
      </div>
      {/*center*/}
      <div className="w-full flex justify-center items-center"></div>
      {/*right side*/}
      <div className="w-full flex gap-2 items-center justify-end">
        <AutoUpdater />
        <DiscordButton />
        {showThemeToggle && <ThemeToggle />}

        <Modal visible={showRestartModal}>
          <div className="flex flex-col gap-4 max-w-lg items-center">
            <h3
              className={classNames(
                theme.text1,
                "text-base font-semibold leading-6",
              )}
            >
              Restart Application
            </h3>
            <p className={classNames(theme.text2, "text-sm text-center")}>
              Are you sure you want to reset all state and restart the
              application?
            </p>
            <div className="flex justify-around gap-2">
              <Button onClick={() => setShowRestartModal(false)}>Cancel</Button>{" "}
              <Button onClick={restart} dataTestid="restart-simulator-button">
                Restart
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </footer>
  );
};
