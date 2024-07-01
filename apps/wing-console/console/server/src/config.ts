export interface Config {
  set(key: string, value: unknown): void;
  get<T>(key: string): T;
  addEventListener(event: "config-change", listener: () => void): void;
  removeEventListener(event: "config-change", listener: () => void): void;
}
