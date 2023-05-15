import { shell } from "electron";

export class HostUtils {
  async openExternal(url: string): Promise<void> {
    return shell.openExternal(url);
  }
}
