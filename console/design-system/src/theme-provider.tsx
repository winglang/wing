import { createContext, PropsWithChildren, useContext, useEffect } from "react";

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
    "text-slate-900 placeholder:text-slate-500 dark:text-slate-300 dark:placeholder:text-slate-450",
  focusInput:
    "focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 outline-none",
  borderInput: "border-slate-300 dark:border-slate-900",
  focusWithin:
    "focus-within:ring-2 focus-within:ring-sky-500/50 focus-within:border-sky-500 outline-none",
  scrollbar:
    "scrollbar hover:scrollbar-bg-slate-500/10 hover:scrollbar-thumb-slate-700/30 scrollbar-thumb-hover-slate-700/40 scrollbar-thumb-active-slate-700/60 dark:hover:scrollbar-bg-slate-400/10 dark:hover:scrollbar-thumb-slate-400/30 dark:scrollbar-thumb-hover-slate-400/40 dark:scrollbar-thumb-active-slate-400/60 transition-colors ease-in-out duration-700",
};

const ThemeContext = createContext<ThemeProviderProps>({
  theme: DefaultTheme,
});

export interface ThemeProviderProps {
  theme: Theme;
  mode?: Mode;
}

const setModeInLocalStorage = (mode: Mode) => {
  localStorage.setItem(localStorageThemeKey, JSON.stringify({ mode: mode }));
};

const updateDomClassList = (mode: Mode) => {
  if (mode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const setThemeMode = (selectedMode?: Mode) => {
  const mediaTheme = window?.matchMedia("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
  if (selectedMode) {
    setModeInLocalStorage(selectedMode);
    updateDomClassList(selectedMode === "auto" ? mediaTheme : selectedMode);
    return;
  }
  const localThemeObject = localStorage.getItem(localStorageThemeKey);
  if (!localThemeObject) {
    updateDomClassList(mediaTheme);
    return;
  }
  const mode = JSON.parse(localThemeObject)?.mode ?? mediaTheme;
  return updateDomClassList(mode === "auto" ? mediaTheme : mode);
};

export const ThemeProvider = ({
  theme,
  mode,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
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
    <ThemeContext.Provider value={{ theme: theme ?? DefaultTheme, mode: mode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
