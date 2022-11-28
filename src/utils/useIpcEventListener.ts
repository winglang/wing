import { useEffect } from "react";

const ipcRenderer = window.electronTRPC?.ipcRenderer;

export interface IpcEventListenerOptions {
  immediate?: boolean;
}

export function useIpcEventListener(
  channel: string,
  listener: (...args: any[]) => any,
  options?: IpcEventListenerOptions,
) {
  useEffect(() => {
    ipcRenderer?.on(channel, listener);

    if (options?.immediate) {
      void listener();
    }

    return () => {
      ipcRenderer?.removeListener(channel, listener);
    };
  }, []);
}
