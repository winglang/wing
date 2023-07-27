import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { testing } from "@winglang/sdk";
import cors from "cors";
import Emittery from "emittery";
import express from "express";
import getPort, { portNumbers } from "get-port";
import { WebSocketServer } from "ws";

import { Config } from "./config.js";
import { ConsoleLogger } from "./consoleLogger.js";
import { HostUtils } from "./hostUtils.js";
import { mergeAllRouters } from "./router/index.js";
import { State, Trace } from "./types.js";
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
  hostUtils?: HostUtils;
  onExpressCreated?: (app: express.Express) => void;
  wingfile: string;
  requireAcceptTerms?: boolean;
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
  hostUtils,
  onExpressCreated,
  wingfile,
  requireAcceptTerms = false,
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
      hostUtils,
      wingfile: wingfile ?? "",
      requireAcceptTerms,
    };
  };
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router,
      batching: { enabled: false },
      createContext,
    }),
  );

  // Allow extending the express app (after trpc is set up).
  onExpressCreated?.(app);

  const server = app.listen(
    requestedPort
      ? await getPort({
          port: portNumbers(requestedPort, requestedPort + 100),
        })
      : undefined,
  );
  await new Promise<void>((resolve) => {
    server.on("listening", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Server address is not available");
  }
  const { port } = address;
  log.info(`Server is listening on port ${port}`);

  const wss = new WebSocketServer({ server });
  applyWSSHandler({
    wss,
    router,
    createContext,
  });

  return { port, server };
};
