import type { inferRouterInputs } from "@trpc/server";
import Emittery from "emittery";
import type { Express } from "express";

import type { Config } from "./config.js";
import type { LogSource } from "./consoleLogger.js";
import { type ConsoleLogger, createConsoleLogger } from "./consoleLogger.js";
import { createExpressServer } from "./expressServer.js";
import type { HostUtils } from "./hostUtils.js";
import type { Router } from "./router/index.js";
import type { Trace } from "./types.js";
import type { State } from "./types.js";
import type { Updater } from "./updater.js";
import type { Analytics } from "./utils/analytics.js";
import { createCompiler } from "./utils/compiler.js";
import type { FileLink, LayoutConfig } from "./utils/createRouter.js";
import { formatTraceError } from "./utils/format-wing-error.js";
import type { LogInterface } from "./utils/LogInterface.js";
import { createSimulator } from "./utils/simulator.js";
import { createTestRunner } from "./utils/test-runner/test-runner.js";

export type { FileLink } from "./utils/createRouter.js";
export type { TestStatus, TestItem } from "./utils/test-runner/test-runner.js";
export type { Trace, State } from "./types.js";
export type { LogInterface } from "./utils/LogInterface.js";
export type { LogEntry, LogLevel } from "./consoleLogger.js";
export type { ExplorerItem, MapItem } from "./router/app.js";
export type { WingSimulatorSchema, BaseResourceSchema } from "./wingsdk.js";
export type { Updater, UpdaterStatus } from "./updater.js";
export type { Config } from "./config.js";
export type { Router } from "./router/index.js";
export type { HostUtils } from "./hostUtils.js";
export type { RouterContext } from "./utils/createRouter.js";
export type { RouterMeta } from "./utils/createRouter.js";
export type { MapEdge } from "./router/app.js";
export type { InternalTestResult } from "./router/test.js";
export type { Column } from "./router/table.js";
export type { NodeDisplay } from "./utils/constructTreeNodeMap.js";
export type {
  LayoutConfig,
  LayoutComponent,
  LayoutComponentType,
} from "./utils/createRouter.js";

export * from "@winglang/sdk/lib/ex/index.js";

export type RouteNames = keyof inferRouterInputs<Router> | undefined;

export { isTermsAccepted } from "./utils/terms-and-conditions.js";

export interface CreateConsoleServerOptions {
  wingfile: string;
  log: LogInterface;
  updater?: Updater;
  config: Config;
  requestedPort?: number;
  hostUtils?: HostUtils;
  onTrace?: (trace: Trace) => void;
  expressApp?: Express;
  onExpressCreated?: (app: Express) => void;
  requireAcceptTerms?: boolean;
  layoutConfig?: LayoutConfig;
  platform?: string[];
  stateDir?: string;
  analyticsAnonymousId?: string;
  analytics?: Analytics;
  requireSignIn?: () => Promise<boolean>;
  notifySignedIn?: () => Promise<void>;
  watchGlobs?: string[];
  getEndpointWarningAccepted?: () => Promise<boolean>;
  notifyEndpointWarningAccepted?: () => Promise<void>;
}

export const createConsoleServer = async ({
  wingfile,
  log,
  updater,
  config,
  requestedPort,
  hostUtils,
  onTrace,
  expressApp,
  onExpressCreated,
  requireAcceptTerms,
  layoutConfig,
  platform,
  stateDir,
  analyticsAnonymousId,
  analytics,
  requireSignIn,
  notifySignedIn,
  watchGlobs,
  getEndpointWarningAccepted,
  notifyEndpointWarningAccepted,
}: CreateConsoleServerOptions) => {
  const emitter = new Emittery<{
    invalidateQuery: RouteNames;
    trace: Trace;
    openFileInEditor: FileLink;
  }>();

  const invalidateQuery = async (query: RouteNames) => {
    await emitter.emit("invalidateQuery", query);
  };

  const invalidateUpdaterStatus = async () => {
    await invalidateQuery("updater.currentStatus");
  };
  updater?.addEventListener("status-change", invalidateUpdaterStatus);

  const invalidateConfig = async () => {
    await invalidateQuery("config.getThemeMode");
  };
  config?.addEventListener("config-change", invalidateConfig);

  const consoleLogger: ConsoleLogger = createConsoleLogger({
    onLog: (level, message) => {
      invalidateQuery("app.logs");
    },
    log,
  });

  const compiler = createCompiler({
    wingfile,
    platform,
    testing: false,
    stateDir,
    watchGlobs,
  });
  let isStarting = false;
  let isStopping = false;

  const simulator = createSimulator({
    stateDir,
  });
  if (onTrace) {
    simulator.on("trace", onTrace);
  }
  simulator.on("resourceLifecycleEvent", async (event) => {
    await Promise.all([
      invalidateQuery("app.map"),
      invalidateQuery("app.explorerTree"),
      invalidateQuery("app.nodeMetadata"),
    ]);
  });
  compiler.on("compiled", ({ simfile }) => {
    if (!isStarting) {
      simulator.start(simfile);
      isStarting = true;
    }
  });

  const testRunner = createTestRunner({
    wingfile,
    watchGlobs,
    platform,
    logger: consoleLogger,
  });
  testRunner.onTestsChange(async () => {
    invalidateQuery("test.list");
    invalidateQuery("test.status");
  });

  let lastErrorMessage = "";
  let selectedNode = "";

  let appState: State = "compiling";
  compiler.on("compiling", () => {
    lastErrorMessage = "";
    appState = "compiling";
    invalidateQuery("app.state");
    invalidateQuery("app.error");
  });
  compiler.on("error", (error) => {
    lastErrorMessage = error.message;
    appState = "error";
    invalidateQuery("app.state");
    invalidateQuery("app.error");
  });
  simulator.on("starting", () => {
    appState = "loadingSimulator";
    invalidateQuery("app.state");
  });
  simulator.on("started", () => {
    appState = "success";

    testRunner.initialize();
    invalidateQuery(undefined);
    isStarting = false;
  });
  simulator.on("error", (error) => {
    lastErrorMessage = error.message;
    appState = "error";
    invalidateQuery("app.state");
    invalidateQuery("app.error");
    isStarting = false;
  });
  simulator.on("trace", async (trace) => {
    // TODO: Refactor the whole logs and events so we support all of the fields that the simulator uses.
    const message = `${
      trace.data.message ?? JSON.stringify(trace.data, undefined, 2)
    }`;

    const source = logSourceFromTraceType(trace);

    switch (trace.level) {
      case "verbose": {
        consoleLogger.verbose(message, source, {
          sourceType: trace.sourceType,
          sourcePath: trace.sourcePath,
        });
        break;
      }

      case "info": {
        consoleLogger.log(message, source, {
          sourceType: trace.sourceType,
          sourcePath: trace.sourcePath,
        });
        break;
      }

      case "warning": {
        consoleLogger.warning(message, source, {
          sourceType: trace.sourceType,
          sourcePath: trace.sourcePath,
        });
        break;
      }

      case "error": {
        const output = trace.data.error
          ? await formatTraceError(trace.data.error)
          : message;

        consoleLogger.error(output, source, {
          sourceType: trace.sourceType,
          sourcePath: trace.sourcePath,
        });
      }
    }

    if (
      trace.sourceType === "@winglang/sdk.cloud.Queue" &&
      // TODO: Change implementation after https://github.com/winglang/wing/issues/1713 is done
      trace.data.message?.includes("Sending messages")
    ) {
      invalidateQuery("queue.approxSize");
    }

    emitter.emit("trace", trace);
  });

  // Create the express server and router for the simulator. Start
  // listening but don't wait for it, yet.
  log.info("Starting the dev server...");

  const { server, port } = await createExpressServer({
    consoleLogger,
    simulatorInstance() {
      return simulator.instance();
    },
    getTestRunner: () => {
      return testRunner;
    },
    restartSimulator() {
      return simulator.reload();
    },
    errorMessage() {
      return lastErrorMessage;
    },
    emitter: emitter as Emittery<{
      invalidateQuery: string | undefined;
      trace: Trace;
      openFileInEditor: FileLink;
    }>,
    log,
    updater,
    config,
    requestedPort,
    appState() {
      return appState;
    },
    hostUtils,
    expressApp,
    onExpressCreated,
    wingfile,
    requireAcceptTerms,
    layoutConfig,
    getSelectedNode: () => {
      return selectedNode;
    },
    setSelectedNode: (node: string) => {
      selectedNode = node;
    },
    analyticsAnonymousId,
    analytics,
    requireSignIn,
    notifySignedIn,
    getEndpointWarningAccepted,
    notifyEndpointWarningAccepted,
  });

  const close = async (callback?: () => void) => {
    if (isStopping) {
      return;
    }
    try {
      isStopping = true;
      updater?.removeEventListener("status-change", invalidateUpdaterStatus);
      config?.removeEventListener("config-change", invalidateConfig);
      await Promise.allSettled([
        server.closeAllConnections(),
        server.close(),
        compiler.stop(),
        simulator.stop(),
        testRunner.stop(),
      ]);
    } catch (error) {
      log.error(error);
    } finally {
      if (typeof callback === "function") callback();
    }
  };

  return {
    port,
    close,
  };
};

function logSourceFromTraceType(trace: Trace): LogSource {
  switch (trace.type) {
    case "simulator": {
      return "simulator";
    }

    case "resource": {
      return "compiler";
    }
  }

  return "user";
}
