import {
  MoonIcon as MoonIconOutline,
  SunIcon as SunIconOutline,
} from "@heroicons/react/24/outline";
import {
  MoonIcon as MoonIconSolid,
  SunIcon as SunIconSolid,
} from "@heroicons/react/24/solid";
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
        "font-medium flex focus:outline-none",
        "transition-color duration-300 cursor-pointer",
        "gap-x-1 p-1",
        theme.bg2Hover,
      )}
      onClick={toggleThemeMode}
      title="Toggle theme"
    >
      {mode === "auto" && (
        <div className="relative size-4 flex">
          {currentTheme === "light" && (
            <>
              <SunIconSolid className="absolute -top-[2.5px] -right-[2.5px] size-3.5" />
              <MoonIconOutline className="absolute bottom-0 left-0 size-3" />
            </>
          )}
          {currentTheme === "dark" && (
            <>
              <SunIconOutline className="absolute -top-[2.5px] -right-[2.5px] size-3.5" />
              <MoonIconSolid className="absolute bottom-0 left-0 size-3" />
            </>
          )}
        </div>
      )}
      {mode !== "auto" && (
        <>
          {currentTheme === "light" && <SunIconSolid className="h-4" />}
          {currentTheme === "dark" && <MoonIconSolid className="h-4" />}
        </>
      )}
    </button>
  );
};
