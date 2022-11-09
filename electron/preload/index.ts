import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const api = {
  ipcRenderer: {
    async invoke(channel: string, ...args: any[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
    send(channel: string, ...args: any[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void,
    ) {
      ipcRenderer.on(channel, listener);
    },
    once(
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void,
    ) {
      ipcRenderer.once(channel, listener);
    },
    removeListener(
      channel: string,
      listener: (event: IpcRendererEvent, ...args: any[]) => void,
    ) {
      ipcRenderer.removeListener(channel, listener);
    },
  },
};

export const ElectronApiKey = "electronTRPC";
export type ElectronApi = typeof api;

contextBridge.exposeInMainWorld(ElectronApiKey, api);
