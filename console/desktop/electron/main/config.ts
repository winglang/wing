import { EventEmitter } from "node:events";

import { Config } from "@wingconsole/server";
export type ThemeMode = "light" | "dark" | "auto";
export class AppConfig extends EventEmitter implements Config {
  config: Record<string, unknown>;
  constructor() {
    super();
    this.config = {
      themeMode: "auto",
    };
  }
  set(key: string, value: unknown): void {
    this.config[key] = value;
    this.emit("config-change");
  }
  get<T>(key: string): T {
    return this.config[key] as T;
  }
  addEventListener(event: "config-change", listener: () => void): void {
    this.addListener(event, listener);
  }
  removeEventListener(event: "config-change", listener: () => void): void {
    this.removeListener(event, listener);
  }
}
