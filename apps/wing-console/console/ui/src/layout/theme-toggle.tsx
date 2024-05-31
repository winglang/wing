import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useMemo } from "react";

export const ThemeToggle = () => {
  const { theme, setThemeMode, mode, mediaTheme } = useTheme();

  const currentTheme = useMemo(() => {
    if (mode === "auto") {
      return mediaTheme;
    }
    return mode;
  }, [mode, mediaTheme]);

  const toggleThemeMode = useCallback(() => {
    const newMode =
      // eslint-disable-next-line unicorn/no-nested-ternary
      mode === "light" ? "auto" : mode === "auto" ? "dark" : "light";
    setThemeMode?.(newMode);
  }, [setThemeMode, mode]);

  return (
    <button
      className={classNames(
        theme.textInput,
        "rounded-3xl font-medium flex focus:outline-none",
        "hover:bg-slate-200 hover:dark:bg-slate-600",
        "transition-color duration-300 cursor-pointer",
        "gap-x-1 p-1",
      )}
      onClick={toggleThemeMode}
    >
      {currentTheme === "light" && <SunIcon className="h-4" />}
      {currentTheme === "dark" && <MoonIcon className="h-4" />}
      {mode === "auto" && (
        <div className="font-light capitalize text-xs">{mode}</div>
      )}
    </button>
  );
};
