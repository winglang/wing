import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme, Loader, Button, Modal } from "@wingconsole/design-system";
import type { State } from "@wingconsole/server";
import classNames from "classnames";
import { useState, useCallback } from "react";

import { AutoUpdater } from "../features/auto-updater.js";
import { trpc } from "../services/trpc.js";

import { DiscordButton } from "./discord-button.js";
import { ResetButton } from "./reset-button.js";
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

  const resetMutation = trpc["app.reset"].useMutation();
  const [showRestartModal, setShowRestartModal] = useState(false);

  const restart = useCallback(async () => {
    setShowRestartModal(false);
    await resetMutation.mutateAsync();
  }, [resetMutation]);

  return (
    <footer
      className={classNames(
        theme.bg1,
        theme.text1,
        theme.border3,
        "px-4 flex gap-2 items-center text-2xs w-full relative z-10",
      )}
    >
      {/*left side*/}
      <div className="flex gap-2 items-center">
        <ResetButton
          onClick={() => setShowRestartModal(true)}
          disabled={resetMutation.isLoading || loading}
        />
        <div title={wingVersion} className="truncate space-x-1">
          {wingVersion && (
            <div className="flex gap-1 px-1 py-0.5">
              <span>Wing</span>
              <span className={classNames(theme.text2)}>v{wingVersion}</span>
            </div>
          )}
        </div>

        <div className="flex gap-1 px-1 py-0.5">
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
      <div className="grow"></div>
      {/*right side*/}
      <div className="flex gap-2 items-center">
        <AutoUpdater />
        <DiscordButton />
        {showThemeToggle && <ThemeToggle />}
      </div>
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
    </footer>
  );
};
