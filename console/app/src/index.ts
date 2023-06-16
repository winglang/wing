import {
  createConsoleServer,
  CreateConsoleServerOptions,
  LogInterface,
  Updater,
  Config,
  HostUtils,
  Trace,
} from "@wingconsole/server";
import express from "express";

export type {
  LogInterface,
  Updater,
  Config,
  HostUtils,
  UpdaterStatus,
  Trace,
} from "@wingconsole/server";

export interface CreateConsoleAppOptions {
  wingfile: string;
  log?: LogInterface;
  updater?: Updater;
  config?: Config;
  requestedPort?: number;
  hostUtils?: HostUtils;
  onTrace?: (trace: Trace) => void;
  onExpressCreated?: CreateConsoleServerOptions["onExpressCreated"];
}

const staticDir = `${__dirname}/vite`;

export const createConsoleApp = async (options: CreateConsoleAppOptions) => {
  const server = await createConsoleServer({
    ...options,
    onExpressCreated(app) {
      app.use(express.static(staticDir));
      options.onExpressCreated?.(app);
    },
    log: options.log ?? {
      info() {},
      error: console.error,
      verbose() {},
    },
    config: options.config ?? {
      addEventListener(event, listener) {},
      removeEventListener(event, listener) {},
      get(key) {
        return undefined as any;
      },
      set(key, value) {},
    },
  });
  return server;
};
