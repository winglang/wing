import { ArrowPathIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useMemo } from "react";

export interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { theme, setThemeMode, mode, mediaTheme } = useTheme();

  const currentTheme = useMemo(() => {
    if (mode === "auto") {
      return mediaTheme;
    }
    return mode;
  }, [mode, mediaTheme]);

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
        <div>{title}</div>
      </div>
      <div className="w-1/3 flex space-x-1 justify-end">
        <button
          className={classNames(
            theme.textInput,
            "rounded-3xl font-medium flex focus:outline-none",
            "hover:bg-slate-200 hover:dark:bg-slate-600",
            "transition-color duration-300 cursor-pointer",
            "gap-x-1 px-1.5 py-0.5",
          )}
          onClick={toggleThemeMode}
        >
          {currentTheme === "light" && <SunIcon className="h-4" />}
          {currentTheme === "dark" && <MoonIcon className="h-4" />}
          <div className="font-light capitalize text-xs">{mode}</div>
        </button>
      </div>
    </div>
  );
};
