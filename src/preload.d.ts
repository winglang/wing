import { ElectronApi, ElectronApiKey } from "../electron/preload";

declare global {
  interface Window {
    [ElectronApiKey]?: ElectronApi;
  }
}
