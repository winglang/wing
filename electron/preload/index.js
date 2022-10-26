const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronTRPC", {
  rpc: (args) => ipcRenderer.invoke("electron-trpc", args),
});
