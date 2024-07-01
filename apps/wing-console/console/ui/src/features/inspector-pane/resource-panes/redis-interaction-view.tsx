import { createPersistentState } from "@wingconsole/use-persistent-state";
import { memo, useCallback } from "react";

import { RedisInteraction } from "./redis-interaction.js";
import { useRedis } from "./use-redis.js";
import { useTerminalHistory } from "./use-terminal-history.js";

export interface RedisViewProps {
  resourcePath: string;
}

const REDIS_HELP_URL = "https://redis.io/commands";

export const RedisInteractionView = memo(({ resourcePath }: RedisViewProps) => {
  const { usePersistentState } = createPersistentState(resourcePath);

  const [command, setCommand] = usePersistentState("");
  const {
    commandHistory,
    terminalHistory,
    cmdIndex,
    setCmdIndex,
    updateTerminalHistory,
    updateCommandHistory,
    clearTerminalHistory,
  } = useTerminalHistory({
    useState: usePersistentState,
  });

  const { isLoading, redisUrl, execCommand } = useRedis({ resourcePath });

  const executeCommand = useCallback(
    async (command: string) => {
      if (command === "") {
        return;
      }

      updateCommandHistory(command, true);

      switch (command.toLowerCase()) {
        case "help": {
          window.open(REDIS_HELP_URL, "_blank");
          updateTerminalHistory([
            { type: "message", message: command },
            {
              type: "message",
              message: "No problem! Let me just open this url for you",
            },
            {
              type: "message",
              message: REDIS_HELP_URL,
            },
          ]);
          break;
        }
        case "clear": {
          clearTerminalHistory();
          break;
        }
        default: {
          updateTerminalHistory([{ type: "command", message: command }]);
          execCommand(command).then((result) => {
            updateTerminalHistory([{ type: "message", message: result }]);
          });
        }
      }
    },
    [
      execCommand,
      updateCommandHistory,
      updateTerminalHistory,
      clearTerminalHistory,
    ],
  );

  const handleOnInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCommand(event.target.value);
      if (cmdIndex === 0) {
        updateCommandHistory(event.target.value);
      }
    },
    [cmdIndex, setCommand, updateCommandHistory],
  );

  const handleOnEnter = useCallback(async () => {
    await executeCommand(command);
    setCommand("");
  }, [command, executeCommand, setCommand]);

  const handleOnArrowUp = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const newIndex = Math.min(commandHistory.length - 1, cmdIndex + 1);
      setCmdIndex(newIndex);
      setCommand(commandHistory[newIndex] ?? "");
    },
    [cmdIndex, commandHistory, setCmdIndex, setCommand],
  );

  const handleOnArrowDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const newIndex = Math.max(0, cmdIndex - 1);
      setCmdIndex(newIndex);
      setCommand(commandHistory[newIndex] ?? "");
    },
    [cmdIndex, commandHistory, setCmdIndex, setCommand],
  );

  return (
    <RedisInteraction
      isLoading={isLoading}
      url={redisUrl}
      currentCommand={command}
      terminalHistory={terminalHistory}
      onInputChange={handleOnInputChange}
      onEnter={handleOnEnter}
      onArrowUp={handleOnArrowUp}
      onArrowDown={handleOnArrowDown}
    />
  );
});
