import { contextBridge, ipcRenderer } from "electron";

import IpcRendererEvent = Electron.IpcRendererEvent;

const api = {
  rpc: (args: any) => ipcRenderer.invoke("electron-trpc", args),
  ipcRenderer: {
    sendMessage(channel: any, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: any, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: any, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld("electronTRPC", api);

export type ElectronApi = typeof api;
