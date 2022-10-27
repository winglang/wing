import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronTRPC", {
  rpc: (args: any) => ipcRenderer.invoke("electron-trpc", args),
});
