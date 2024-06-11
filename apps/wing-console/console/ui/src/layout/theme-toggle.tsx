import {
  MoonIcon as MoonIconOutline,
  SunIcon as SunIconOutline,
} from "@heroicons/react/24/outline";
import {
  MoonIcon as MoonIconSolid,
  SunIcon as SunIconSolid,
} from "@heroicons/react/24/solid";
import type { Mode } from "@wingconsole/design-system";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useMemo } from "react";

const AutoIcon = ({ currentTheme }: { currentTheme?: Mode }) => {
  return (
    <div className="relative size-4 flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={currentTheme === "light" ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="absolute size-3.5 left-[1.5px] top-[0px] -rotate-[22deg]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 1.591M5.25 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>

      {currentTheme === "light" ? (
        <MoonIconOutline className="absolute bottom-0 left-0 size-3" />
      ) : (
        <MoonIconSolid className="absolute bottom-0 left-0 size-3" />
      )}
    </div>
  );
};

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
          <AutoIcon currentTheme={currentTheme} />
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
