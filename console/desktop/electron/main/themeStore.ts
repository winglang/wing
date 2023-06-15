import Store from "electron-store";

import { ThemeMode } from "./config.js";
export class ThemeStore {
  readonly store;
  constructor() {
    this.store = new Store({
      name: "wing-console-theme",
      schema: {
        themeMode: {
          type: "string",
        },
      },
    });
  }

  getThemeMode = (): ThemeMode => {
    const mode = this.store.get("themeMode");
    if (!mode) {
      this.store.set("themeMode", "auto");
      return "auto";
    }
    return mode as ThemeMode;
  };

  setThemeMode = (mode: ThemeMode): void => {
    this.store.set("themeMode", mode);
  };
}
