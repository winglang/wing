import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { testing } from "@winglang/sdk";
import { Trace } from "@winglang/sdk/lib/cloud/index.js";
import cors from "cors";
import Emittery from "emittery";
import express from "express";
import getPort from "get-port";
import { WebSocketServer } from "ws";

import { Config } from "./config.js";
import { ConsoleLogger } from "./consoleLogger.js";
import { mergeAllRouters } from "./router/index.js";
import { State } from "./types.js";
import { Updater } from "./updater.js";
import { RouterContext } from "./utils/createRouter.js";
import { getWingVersion } from "./utils/getWingVersion.js";
import { LogInterface } from "./utils/LogInterface.js";

export interface CreateExpressServerOptions {
  simulatorInstance(): Promise<testing.Simulator>;
  consoleLogger: ConsoleLogger;
  errorMessage(): string | undefined;
  emitter: Emittery<{
    invalidateQuery: string | undefined;
    trace: Trace;
  }>;
  log: LogInterface;
  updater?: Updater;
  config: Config;
  requestedPort?: number;
  appState(): State;
}

export const createExpressServer = async ({
  simulatorInstance,
  consoleLogger,
  errorMessage,
  emitter,
  log,
  updater,
  config,
  requestedPort,
  appState,
}: CreateExpressServerOptions) => {
  const app = express();
  app.use(cors());

  const { router } = mergeAllRouters();
  const createContext = (): RouterContext => {
    return {
      async simulator() {
        return await simulatorInstance();
      },
      async appDetails() {
        return {
          wingVersion: await getWingVersion(),
        };
      },
      errorMessage() {
        return errorMessage();
      },
      logger: consoleLogger,
      emitter,
      updater,
      config,
      appState,
    };
  };
  app.use(
    "/",
    trpcExpress.createExpressMiddleware({
      router,
      batching: { enabled: false },
      createContext,
    }),
  );
  log.info("Looking for an open port");
  const port = await getPort({ port: requestedPort });
  const server = app.listen(port);
  await new Promise<void>((resolve) => {
    server.on("listening", resolve);
  });
  log.info(`Server is listening on port ${port}`);

  const wss = new WebSocketServer({ server });
  applyWSSHandler({
    wss,
    router,
    createContext,
  });

  return { port, server };
};
