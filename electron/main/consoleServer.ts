import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import log from "electron-log";
import Emittery from "emittery";
import express from "express";
import getPort from "get-port";
import { WebSocketServer } from "ws";

import { ConsoleLogger } from "./consoleLogger.js";
import { mergeAllRouters } from "./router/index.js";
import { CloudAppStateService } from "./utils/cloudAppState.js";
import { RouterContext, RouterEvents } from "./utils/createRouter.js";
import { createSimulator } from "./utils/createSimulator.js";
import { getWingVersion } from "./utils/getWingVersion.js";

export const createConsoleServer = async (options: {
  simulatorPromise: Promise<ReturnType<typeof createSimulator>>;
  consoleLogger: ConsoleLogger;
  cloudAppStateService: CloudAppStateService;
  errorMessage: () => string | undefined;
  emitter: Emittery<RouterEvents>;
}) => {
  const app = express();
  app.use(cors());

  const { router } = mergeAllRouters();
  const createContext = (): RouterContext => {
    return {
      async simulator() {
        const sim = await options.simulatorPromise;
        return sim.get();
      },
      async tree() {
        const sim = await options.simulatorPromise;
        return sim.tree();
      },
      logs() {
        return options.consoleLogger.messages;
      },
      async appDetails() {
        return {
          wingVersion: await getWingVersion(),
        };
      },
      errorMessage() {
        return options.errorMessage();
      },
      emitter: options.emitter,
      cloudAppStateService: options.cloudAppStateService,
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
  const port = await getPort();
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

  options.cloudAppStateService.subscribe(() => {
    void options.emitter.emit("invalidateQuery", { query: "app.state" });
  });

  return { port, server };
};
