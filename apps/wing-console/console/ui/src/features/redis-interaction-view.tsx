import { useCallback, useState } from "react";

import { useOpenExternal } from "../services/use-open-external.js";
import { useRedis } from "../services/use-redis.js";
import { useTerminalHistory } from "../shared/use-terminal-history.js";
import { RedisInteraction } from "../ui/redis-interaction.js";

export interface RedisViewProps {
  resourcePath: string;
}

const REDIS_HELP_URL = "https://redis.io/commands";

export const RedisInteractionView = ({ resourcePath }: RedisViewProps) => {
  const [command, setCommand] = useState("");
  const {
    commandHistory,
    terminalHistory,
    cmdIndex,
    setCmdIndex,
    updateTerminalHistory,
    updateCommandHistory,
    clearTerminalHistory,
  } = useTerminalHistory();

  const { open } = useOpenExternal();
  const { isLoading, redisUrl, execCommand } = useRedis({ resourcePath });

  const executeCommand = useCallback(
    async (command: string) => {
      if (command === "") {
        return;
      }

      updateCommandHistory(command, true);

      switch (command.toLowerCase()) {
        case "help": {
          open(REDIS_HELP_URL);
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
      open,
      updateCommandHistory,
      updateTerminalHistory,
      clearTerminalHistory,
    ],
  );

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
    if (cmdIndex === 0) {
      updateCommandHistory(event.target.value);
    }
  };

  const handleOnEnter = async () => {
    await executeCommand(command);
    setCommand("");
  };

  const handleOnArrowUp = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const newIndex = Math.min(commandHistory.length - 1, cmdIndex + 1);
    setCmdIndex(newIndex);
    setCommand(commandHistory[newIndex] ?? "");
  };

  const handleOnArrowDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const newIndex = Math.max(0, cmdIndex - 1);
    setCmdIndex(newIndex);
    setCommand(commandHistory[newIndex] ?? "");
  };

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
};
