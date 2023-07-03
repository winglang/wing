import { ArrowPathIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback } from "react";

import { WingIcon } from "@wingconsole/design-system";

const AutoThemeIcon = () => {
  const { theme } = useTheme();
  return (
    <div className={"relative h-4 w-4"}>
      <ArrowPathIcon className="h-4 absolute -rotate-[5deg]" />
      <SunIcon
        className={classNames(
          "h-[7.5px] absolute z-10 top-0 -left-[1px]",
          theme.bg3,
          "rounded-xl",
        )}
      />
      <MoonIcon
        className={classNames(
          "h-[7.5px] absolute z-10 bottom-0 -right-[1px]",
          theme.bg3,
          "rounded-xl",
        )}
      />
    </div>
  );
};

export interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { theme, setThemeMode, mode } = useTheme();

  const toggleThemeMode = useCallback(() => {
    const newMode =
      mode === "light" ? "auto" : mode === "auto" ? "dark" : "light";
    setThemeMode?.(newMode);
  }, [setThemeMode, mode]);

  return (
    <div
      className={classNames(
        "w-full h-8 draggable-frame border-b flex items-center px-4",
        theme.bg3,
        theme.border3,
        theme.text2,
      )}
    >
      <div className="w-1/3 grow" />
      <div className="w-1/3 justify-center items-center text-center gap-x-1 flex">
        <WingIcon className="w-4 inline-block" />
        <div>{title}</div>
      </div>
      <div className="w-1/3 flex space-x-1 justify-end">
        <button
          className={classNames(
            theme.textInput,
            "rounded-3xl font-medium flex focus:outline-none",
            "hover:bg-slate-200 hover:dark:bg-slate-700",
            "transition-color duration-300",
          )}
          onClick={toggleThemeMode}
        >
          {mode === "light" && <SunIcon className="h-4" />}
          {mode === "dark" && <MoonIcon className="h-4" />}
          {mode === "auto" && <AutoThemeIcon />}
        </button>
      </div>
    </div>
  );
};
