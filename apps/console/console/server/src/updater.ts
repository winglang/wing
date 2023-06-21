export type UpdaterStatus = {
  status:
    | "initial"
    | "checking-for-update"
    | "update-available"
    | "update-not-available"
    | "download-progress"
    | "update-downloaded"
    | "error"
    | "update-cancelled";
  progress?: number;
  version?: string;
};
export interface Updater {
  status(): UpdaterStatus;
  addEventListener(event: "status-change", listener: () => void): void;
  removeEventListener(event: "status-change", listener: () => void): void;

  checkForUpdates(): Promise<void>;
  quitAndInstall(): void;
}
