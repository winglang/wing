import * as trpcExpress from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import type { simulator } from "@winglang/sdk";
import cors from "cors";
import type Emittery from "emittery";
import express from "express";
import getPort, { portNumbers } from "get-port";
import { WebSocketServer } from "ws";

import type { Config } from "./config.js";
import type { ConsoleLogger } from "./consoleLogger.js";
import type { HostUtils } from "./hostUtils.js";
import { mergeAllRouters } from "./router/index.js";
import type { State, Trace } from "./types.js";
import type { Updater } from "./updater.js";
import type { Analytics } from "./utils/analytics.js";
import type {
  FileLink,
  LayoutConfig,
  RouterContext,
} from "./utils/createRouter.js";
import { getWingVersion } from "./utils/getWingVersion.js";
import type { LogInterface } from "./utils/LogInterface.js";
import type { TestRunner } from "./utils/testRunner.js";

export interface CreateExpressServerOptions {
  simulatorInstance(): simulator.Simulator;
  restartSimulator(): Promise<void>;
  consoleLogger: ConsoleLogger;
  errorMessage(): string | undefined;
  emitter: Emittery<{
    invalidateQuery: string | undefined;
    trace: Trace;
    openFileInEditor: FileLink;
  }>;
  log: LogInterface;
  updater?: Updater;
  config: Config;
  requestedPort?: number;
  appState(): State;
  hostUtils?: HostUtils;
  expressApp?: express.Express;
  onExpressCreated?: (app: express.Express) => void;
  wingfile: string;
  requireAcceptTerms?: boolean;
  layoutConfig?: LayoutConfig;
  getSelectedNode: () => string | undefined;
  setSelectedNode: (node: string) => void;
  testRunner: () => TestRunner;
  analyticsAnonymousId?: string;
  analytics?: Analytics;
  requireSignIn?: () => Promise<boolean>;
  notifySignedIn?: () => Promise<void>;
  getEndpointWarningAccepted?: () => Promise<boolean>;
  notifyEndpointWarningAccepted?: () => Promise<void>;
}

export const createExpressServer = async ({
  simulatorInstance,
  restartSimulator,
  consoleLogger,
  errorMessage,
  emitter,
  log,
  updater,
  config,
  requestedPort,
  appState,
  hostUtils,
  expressApp,
  onExpressCreated,
  wingfile,
  requireAcceptTerms = false,
  layoutConfig,
  getSelectedNode,
  setSelectedNode,
  testRunner,
  analyticsAnonymousId,
  analytics,
  requireSignIn,
  notifySignedIn,
  getEndpointWarningAccepted,
  notifyEndpointWarningAccepted,
}: CreateExpressServerOptions) => {
  const app = expressApp ?? express();
  app.use(cors());

  const { router } = mergeAllRouters();
  const createContext = (): RouterContext => {
    return {
      async simulator() {
        return await simulatorInstance();
      },
      async restartSimulator() {
        return await restartSimulator();
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
      layoutConfig,
      getSelectedNode,
      setSelectedNode,
      testRunner,
      analyticsAnonymousId,
      analytics,
      requireSignIn,
      notifySignedIn,
      getEndpointWarningAccepted,
      notifyEndpointWarningAccepted,
    };
  };
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router,
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
  const handler = applyWSSHandler({
    wss,
    router,
    createContext,
  });

  process.on("SIGTERM", () => {
    handler.broadcastReconnectNotification();
    wss.close();
  });

  return { port, server };
};
