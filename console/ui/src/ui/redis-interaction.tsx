import { Attribute, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useEffect, useId, useRef } from "react";

import { TerminalHistoryItem } from "../shared/redis.js";

const REDIS_PROMPT = "redis>";

export interface RedisInteractionProps {
  isLoading: boolean;
  url: string;
  currentCommand: string;
  terminalHistory: TerminalHistoryItem[];
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  onArrowUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onArrowDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
export const RedisInteraction = ({
  isLoading,
  url,
  currentCommand,
  terminalHistory,
  onInputChange,
  onArrowDown,
  onArrowUp,
  onEnter,
}: RedisInteractionProps) => {
  const { theme } = useTheme();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const onInputKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    switch (event.key) {
      case "Enter": {
        onEnter();
        break;
      }
      case "ArrowUp": {
        onArrowUp(event);
        break;
      }
      case "ArrowDown": {
        onArrowDown(event);
        break;
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  // scroll to bottom
  useEffect(() => {
    scrollableRef.current?.scrollTo({
      top: scrollableRef.current.scrollHeight,
    });
  }, [terminalHistory]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm gap-y-1">
      <Attribute name="URL" value={url} noLeftPadding />
      <div>
        <label htmlFor={inputId} className={classNames("text-sm", theme.text2)}>
          Command Line
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
                  value={currentCommand}
                  onChange={onInputChange}
                  onKeyDown={onInputKeyDown}
                  readOnly={isLoading}
                  placeholder={(isLoading && "...") || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
