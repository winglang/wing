import http from "node:http";

import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import express from "express";
import getPort from "get-port";
import { WebSocketServer } from "ws";

import { ConsoleLogger } from "./consoleLogger.js";
import { mergeAppRouters } from "./router/index.js";
import { createSimulator } from "./utils/createSimulator.js";
import { getWingVersion } from "./utils/getWingVersion.js";

export const createConsoleServer = async (options: {
  simulatorPromise: Promise<ReturnType<typeof createSimulator>>;
  consoleLogger: ConsoleLogger;
  cloudAppStateService: any;
  errorMessage: () => string | undefined;
}): Promise<{ port: number; server: http.Server }> => {
  const app = express();
  app.use(cors());

  const router = mergeAppRouters();
  const createContext = () => {
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

  options.consoleLogger.verbose("Looking for an open port");
  const port = await getPort();
  const server = app.listen(port);
  await new Promise<void>((resolve) => {
    server.on("listening", resolve);
  });
  options.consoleLogger.verbose(`Server is listening on port ${port}`);

  const wss = new WebSocketServer({ server });
  applyWSSHandler({
    wss,
    router,
    createContext,
  });

  return { port, server };
};
