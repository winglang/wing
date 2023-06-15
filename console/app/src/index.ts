import {
  createConsoleServer,
  CreateConsoleServerOptions,
} from "@wingconsole/server";
import express from "express";

export interface CreateConsoleAppOptions {
  wingfile: string;
  log?: CreateConsoleServerOptions["log"];
  updater?: CreateConsoleServerOptions["updater"];
  config?: CreateConsoleServerOptions["config"];
  requestedPort?: number;
  hostUtils?: CreateConsoleServerOptions["hostUtils"];
  onExpressCreated?: CreateConsoleServerOptions["onExpressCreated"];
}

export const createConsoleApp = async (options: CreateConsoleAppOptions) => {
  const server = await createConsoleServer({
    ...options,
    onExpressCreated(app) {
      // const files =
      //   process.env.NODE_ENV === "production"
      //     ? `${__dirname}/vite`
      //     : `${__dirname}/../dist/vite`;
      // app.use(express.static(files));
      app.use(express.static(`${__dirname}/vite`));
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
