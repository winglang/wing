import { ipcRenderer } from "electron";
import { useEffect } from "react";

export interface IpcEventListenerOptions {
  immediate?: boolean;
}

export function useIpcEventListener(
  channel: string,
  callback: () => any,
  options?: IpcEventListenerOptions,
) {
  useEffect(() => {
    ipcRenderer.on(channel, () => callback());

    if (options?.immediate) {
      callback();
    }

    return () => {
      ipcRenderer.removeAllListeners(channel);
    };
  }, []);
}
