import {
  createContext,
  PropsWithChildren,
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

export const CUSTOMIZABLE_THEME = "customizable-theme";

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
  border3: "border-slate-300 dark:border-slate-900",
  border4: "border-slate-200 dark:border-slate-800",
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
  borderInput: "border-slate-300 dark:border-slate-900",
  focusWithin:
    "focus-within:ring-2 focus-within:ring-sky-500/50 focus-within:border-sky-500 outline-none",
  scrollbar:
    "scrollbar hover:scrollbar-bg-slate-500/10 hover:scrollbar-thumb-slate-700/30 scrollbar-thumb-hover-slate-700/40 scrollbar-thumb-active-slate-700/60 dark:hover:scrollbar-bg-slate-400/10 dark:hover:scrollbar-thumb-slate-400/30 dark:scrollbar-thumb-hover-slate-400/40 dark:scrollbar-thumb-active-slate-400/60",
};

export const computeColor = (color: string, level: number = 1): string => {
  if (level === 1) {
    return color;
  }

  const hex = color.replace("#", "");
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);

  const newR = Math.min(Math.max(Math.round(r * level), 0), 255);
  const newG = Math.min(Math.max(Math.round(g * level), 0), 255);
  const newB = Math.min(Math.max(Math.round(b * level), 0), 255);

  const newColor = `${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;

  return `${newColor}`;
};

const applyThemeCss = (newTheme: Theme) => {
  let styleElement = document.querySelector("#style-theme");
  if (styleElement) {
    styleElement.remove();
  }
  styleElement = document.createElement("style");
  styleElement.setAttribute("id", "style-theme");

  let styles = {};
  Object.keys(newTheme).map((key) => {
    const colorKey = newTheme[key as keyof Theme];
    if (colorKey === DefaultTheme[key as keyof Theme]) {
      return;
    }
    const color = colorKey.replace("bg-", "");

    styles = {
      ...styles,
      [`.${CUSTOMIZABLE_THEME} .${colorKey}`]: `{ background-color: #${color} !important;}`,
    };
  });

  let stylesText = "";

  Object.keys(styles).map((key) => {
    stylesText += `${key} ${styles[key as keyof typeof styles]}\n`;
  });

  styleElement.innerHTML = stylesText;
  document.head.append(styleElement);
};

export const buildTheme = (color?: string): Theme => {
  if (!color) {
    return DefaultTheme;
  }
  const currentMode = getThemeMode();
  const theme: Theme = {
    ...DefaultTheme,
    bg1: `bg-${computeColor(color, currentMode === "dark" ? 0.8 : 1.2)}`,
    bg2: `bg-${computeColor(color, currentMode === "dark" ? 0.9 : 1.1)}`,
    bg3: `bg-${computeColor(color)}`,
    bg4: `bg-${computeColor(color, currentMode === "dark" ? 1.1 : 0.9)}`,
    bgInput: `bg-${computeColor(color, currentMode === "dark" ? 1.2 : 0.8)}`,
  };

  applyThemeCss(theme);

  let mergedTheme: Theme = DefaultTheme;
  Object.keys(DefaultTheme).map((value) => {
    const keyTheme = value as keyof Theme;

    const changed = theme[keyTheme] !== DefaultTheme[keyTheme];
    mergedTheme = {
      ...mergedTheme,
      [keyTheme]: `${DefaultTheme[keyTheme]} ${changed && theme[keyTheme]}`,
    };
  });

  return mergedTheme;
};

export interface ThemeProviderProps {
  theme: Theme;
  mode: Mode;
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

  setThemeMode(mode);

  useEffect(() => {
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
  }, []);

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
