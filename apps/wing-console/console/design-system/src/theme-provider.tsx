import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Theme {
  bg1: string;
  bg2: string;
  bg3: string;
  bg4: string;
  bgInput: string;
  bgInputHover: string;
  bg2Hover: string;
  bg3Hover: string;
  bg4Hover: string;
  border3: string;
  border4: string;
  text1: string;
  text2: string;
  text1Hover: string;
  text2Hover: string;
  text3Hover: string;
  text4Hover: string;
  text4GroupHover: string;
  textFocus: string;
  textInput: string;
  focusInput: string;
  borderInput: string;
  focusWithin: string;
  scrollbar: string;
}

export type Mode = "dark" | "light" | "auto";

const localStorageThemeKey = "console-theme";

export const USE_EXTERNAL_THEME_COLOR = "use-external-theme-color";

export const DefaultTheme: Theme = {
  bg1: "bg-slate-300 dark:bg-slate-800",
  bg2: "bg-slate-200 dark:bg-slate-800",
  bg3: "bg-slate-100 dark:bg-slate-700",
  bg4: "bg-white dark:bg-slate-550",
  bgInput: "bg-white dark:bg-slate-800",
  bgInputHover: "hover:bg-slate-50 dark:hover:bg-slate-750",
  bg2Hover: "hover:bg-slate-200 dark:hover:bg-slate-750",
  bg3Hover: "hover:bg-slate-150 dark:hover:bg-slate-650",
  bg4Hover: "hover:bg-slate-50 dark:hover:bg-slate-500",
  border3: "border-slate-300 dark:border-slate-800",
  border4: "border-slate-200 dark:border-slate-600",
  text1: "text-slate-900 dark:text-slate-250",
  text2: "text-slate-500 dark:text-slate-400",
  text1Hover: "hover:text-slate-950 dark:hover:text-slate-200",
  text2Hover: "hover:text-slate-850 dark:hover:text-slate-250",
  text3Hover: "hover:text-slate-600 dark:hover:text-slate-350",
  text4Hover: "hover:text-slate-550 dark:hover:text-slate-350",
  text4GroupHover: "group-hover:text-slate-550 dark:group-hover:text-slate-350",
  textFocus: "text-sky-700 dark:text-sky-300",
  textInput:
    "text-slate-900 placeholder:text-slate-500 dark:text-slate-300 dark:placeholder:text-slate-500",
  focusInput:
    "focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none",
  borderInput: "border-slate-300 dark:border-slate-800",
  focusWithin:
    "focus-within:ring-2 focus-within:ring-sky-500/50 focus-within:border-sky-500 outline-none",
  scrollbar:
    "scrollbar hover:scrollbar-bg-slate-500/10 hover:scrollbar-thumb-slate-700/30 scrollbar-thumb-hover-slate-700/40 scrollbar-thumb-active-slate-700/60 dark:hover:scrollbar-bg-slate-400/10 dark:hover:scrollbar-thumb-slate-400/30 dark:scrollbar-thumb-hover-slate-400/40 dark:scrollbar-thumb-active-slate-400/60",
};

const adjustChannel = (value: number, factor: number): number => {
  return Math.max(Math.round(value + (255 - value) * (1 - factor)), 0);
};

const computeColor = (color: string, level: number = 1): string => {
  const hexColor = color.replace("#", "");

  if (level === 1) {
    return `#${hexColor}`;
  }

  const oldR = Number.parseInt(hexColor.slice(0, 2), 16);
  const oldG = Number.parseInt(hexColor.slice(2, 4), 16);
  const oldB = Number.parseInt(hexColor.slice(4, 6), 16);

  const newR = adjustChannel(oldR, level);
  const newG = adjustChannel(oldG, level);
  const newB = adjustChannel(oldB, level);

  const newColor = `${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;

  return `#${newColor}`;
};

const applyThemeStyle = (newTheme: Theme) => {
  const colorRegex = /bg-|\[|]|dark:|hover:/g;
  const keyRegex = /[#:[\\\]]/g;

  let styles = {};
  Object.keys(newTheme).map((key) => {
    const colorClasses = newTheme[key as keyof Theme];
    if (colorClasses === DefaultTheme[key as keyof Theme]) {
      return;
    }
    const [lightClass, darkClass] = colorClasses.split(" ");
    if (!lightClass) {
      return;
    }
    const lightColor = lightClass.replaceAll(colorRegex, "");
    const lightKey = lightClass.replaceAll(keyRegex, "\\$&");

    const hover = lightClass.includes("hover:");

    styles = {
      ...styles,
      [`.${USE_EXTERNAL_THEME_COLOR} .${lightKey}${
        hover ? ":hover" : ""
      }`]: `{ background-color: ${lightColor} !important;}`,
    };

    if (!darkClass) {
      return;
    }
    const darkColor = darkClass.replaceAll(colorRegex, "");
    const darkKey = darkClass.replaceAll(keyRegex, "\\$&");
    styles = {
      ...styles,
      [`.dark .${USE_EXTERNAL_THEME_COLOR} .${darkKey}${
        hover ? ":hover" : ""
      }`]: `{ background-color: ${darkColor} !important;}`,
    };
  });

  const stylesText = Object.keys(styles)
    .map((property) => `${property} ${styles[property as keyof typeof styles]}`)
    .join("\n");

  let styleElement = document.querySelector("#style-theme");
  if (styleElement) {
    styleElement.remove();
  }
  styleElement = document.createElement("style");
  styleElement.setAttribute("id", "style-theme");
  styleElement.innerHTML = stylesText;
  document.head.append(styleElement);
};

export const buildTheme = (color?: string): Theme => {
  if (!color) {
    return DefaultTheme;
  }
  const theme: Theme = {
    ...DefaultTheme,
    bg1: `bg-[${computeColor(color, 1.2)}] dark:bg-[${computeColor(
      color,
      1.2,
    )}]`,

    bg2: `bg-[${computeColor(color, 1.1)}] dark:bg-[${computeColor(
      color,
      1.1,
    )}]`,
    bg3: `bg-[${computeColor(color)}] dark:bg-[${computeColor(color)}]`,
    bg4: `bg-[${computeColor(color, 0.8)}] dark:bg-[${computeColor(
      color,
      0.8,
    )}]`,
    bg3Hover: `hover:bg-[${computeColor(
      color,
      1.02,
    )}] dark:hover:bg-[${computeColor(color, 0.98)}]`,
    bg2Hover: `hover:bg-[${computeColor(
      color,
      1.12,
    )}] dark:hover:bg-[${computeColor(color, 1.08)}]`,

    bg4Hover: `hover:bg-[${computeColor(
      color,
      0.82,
    )}] dark:hover:bg-[${computeColor(color, 0.78)}]`,

    bgInput: `bg-[${computeColor(color, 0.8)}] dark:bg-[${computeColor(
      color,
      1.13,
    )}]`,
  };

  applyThemeStyle(theme);

  let mergedTheme: Theme = DefaultTheme;
  Object.keys(DefaultTheme).map((key) => {
    const themeProperty = key as keyof Theme;

    const changed = theme[themeProperty] !== DefaultTheme[themeProperty];
    if (!changed) {
      return;
    }
    mergedTheme = {
      ...mergedTheme,
      [themeProperty]: `${DefaultTheme[themeProperty]} ${theme[themeProperty]}`,
    };
  });

  return mergedTheme;
};

export interface ThemeProviderProps {
  theme: Theme;
  mode?: Mode;
  setThemeMode?: (mode: Mode) => void;
  mediaTheme?: Mode;
}

const setModeInLocalStorage = (mode: Mode) => {
  localStorage.setItem(localStorageThemeKey, JSON.stringify({ mode: mode }));
};

const getThemeModeFromLocalStorage = () => {
  const localThemeObject = localStorage.getItem(localStorageThemeKey);
  if (!localThemeObject) {
    return;
  }
  return JSON.parse(localThemeObject)?.mode as Mode;
};

const updateDomClassList = (mode: Mode) => {
  if (mode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const getMediaThemeMode = () => {
  return window?.matchMedia("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
};

const getThemeMode = (): Mode => {
  return getThemeModeFromLocalStorage() ?? getMediaThemeMode();
};

const setThemeMode = (selectedMode?: Mode) => {
  const mediaTheme = getMediaThemeMode();
  if (selectedMode) {
    setModeInLocalStorage(selectedMode);
    updateDomClassList(selectedMode === "auto" ? mediaTheme : selectedMode);
    return;
  }
  const localThemeObject = getThemeMode();
  if (!localThemeObject) {
    updateDomClassList(mediaTheme);
    return;
  }
  const mode = localThemeObject === "auto" ? mediaTheme : localThemeObject;
  return updateDomClassList(mode);
};

const ThemeContext = createContext<ThemeProviderProps>({
  theme: DefaultTheme,
  mode: getThemeMode(),
  setThemeMode,
});

export const ThemeProvider = ({
  theme,
  mode,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [currentMode, setCurrentMode] = useState<Mode>(mode ?? getThemeMode());

  const onSetThemeMode = useCallback((mode: Mode) => {
    setCurrentMode(mode);
    setThemeMode(mode);
  }, []);

  useEffect(() => {
    setThemeMode(mode);

    const reloadThemeMode = () => {
      setThemeMode();
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", reloadThemeMode);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", reloadThemeMode);
    };
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme ?? DefaultTheme,
        mode: currentMode,
        mediaTheme: getMediaThemeMode(),
        setThemeMode: onSetThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
