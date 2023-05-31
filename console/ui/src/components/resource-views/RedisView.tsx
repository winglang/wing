import { useTheme, Attribute } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { trpc } from "../../utils/trpc.js";

export interface RedisViewProps {
  resourcePath: string;
}

const REDIS_PROMPT = "redis>";

export const RedisView = ({ resourcePath }: RedisViewProps) => {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const inputId = useId();

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(0);
  const [command, setCommand] = useState("");

  const [terminalHistory, setTerminalHistory] = useState<
    { type: "command" | "message"; message: string }[]
  >([]);

  const openExternal = trpc["app.openExternal"].useMutation();
  const info = trpc["redis.info"].useQuery({ resourcePath });
  const exec = trpc["redis.exec"].useMutation();

  const updateHistory = useCallback(
    (command: string, newItem: boolean = false) => {
      const newHistory = [...commandHistory];
      newHistory[0] = command;
      if (newItem) {
        setCommandHistory(["", ...newHistory]);
      } else {
        setCommandHistory([...newHistory]);
      }
      setCmdIndex(0);
    },
    [commandHistory],
  );

  const execCommand = useCallback(
    async (command: string) => {
      if (command === "") {
        return;
      }
      updateHistory(command, true);
      if (command.toLowerCase() === "help") {
        openExternal.mutate({ url: "https://redis.io/commands" });

        setTerminalHistory((terminalHistory) => [
          ...terminalHistory,
          { type: "message", message: command },
        ]);
        setTerminalHistory((terminalHistory) => [
          ...terminalHistory,
          {
            type: "message",
            message: "No problem! Let me just open this url for you",
          },
        ]);
        setTerminalHistory((terminalHistory) => [
          ...terminalHistory,
          {
            type: "message",
            message: "https://redis.io/commands",
          },
        ]);
        return;
      }
      if (command.toLowerCase() === "clear") {
        setTerminalHistory([]);
        return;
      }
      setLoading(true);
      setTerminalHistory((terminalHistory) => [
        ...terminalHistory,
        { type: "command", message: command },
      ]);
      exec
        .mutateAsync({
          resourcePath,
          command,
        })
        .then((result) => {
          setTerminalHistory((terminalHistory) => [
            ...terminalHistory,
            { type: "message", message: result },
          ]);
          setLoading(false);
        });
    },
    [exec, openExternal, resourcePath],
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
    if (cmdIndex === 0) {
      updateHistory(event.target.value);
    }
  };

  const onInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    switch (event.key) {
      case "Enter": {
        await execCommand(command);
        setCommand("");

        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const newIndex = Math.min(commandHistory.length - 1, cmdIndex + 1);
        setCmdIndex(newIndex);
        setCommand(commandHistory[newIndex] ?? "");

        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        const newIndex = Math.max(0, cmdIndex - 1);
        setCmdIndex(newIndex);
        setCommand(commandHistory[newIndex] ?? "");
        break;
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [loading]);

  const scrollableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // scroll to bottom
    scrollableRef.current?.scrollTo({
      top: scrollableRef.current.scrollHeight,
    });
  }, [terminalHistory]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm gap-y-1">
      <Attribute name="URL" value={info.data?.url} noLeftPadding />
      <div>
        <label htmlFor={inputId} className={classNames("text-sm", theme.text2)}>
          Comand Line
        </label>
        <div
          className={classNames(
            theme.bgInput,
            theme.borderInput,
            theme.textInput,
            theme.focusWithin,
            "items-end flex text-xs",
            "outline-none rounded-md border",
            "transition ease-in-out group overflow-y-auto",
          )}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            ref={scrollableRef}
            className="overflow-y-auto max-h-80 overflow-x-hidden px-2 pt-1.5 w-full"
            onClick={() => {
              if (window.getSelection()?.toString() !== "") {
                return;
              }
              inputRef.current?.focus();
            }}
          >
            <div className="max-h-[20rem] space-y-1">
              {terminalHistory.map((log, index) => (
                <div key={index} className="flex">
                  {log.type === "command" && (
                    <div className="pr-1 font-mono font-medium">
                      {REDIS_PROMPT}
                    </div>
                  )}
                  <p className="break-all w-full font-mono select-text">
                    {log.message}
                  </p>
                </div>
              ))}
              <div className="flex pb-1.5">
                <div className="shrink-0 font-mono font-medium">
                  {REDIS_PROMPT}
                </div>
                <input
                  id={inputId}
                  ref={inputRef}
                  type="text"
                  autoComplete="off"
                  spellCheck="false"
                  className={classNames(
                    "bg-transparent font-mono text-xs leading-none",
                    "px-1 py-0",
                    "w-full border-none focus:ring-0 outline-none focus:outline-none",
                  )}
                  value={command}
                  onChange={onInputChange}
                  onKeyDown={onInputKeyDown}
                  readOnly={loading}
                  placeholder={(loading && "...") || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
