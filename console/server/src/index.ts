import { inferRouterInputs } from "@trpc/server";
import { Trace } from "@winglang/sdk/lib/cloud/test-runner.js";
import Emittery from "emittery";

import { Config } from "./config.js";
import { ConsoleLogger, createConsoleLogger } from "./consoleLogger.js";
import { createExpressServer } from "./expressServer.js";
import { HostUtils } from "./hostUtils.js";
import { Router } from "./router/index.js";
import { State } from "./types.js";
import { Updater } from "./updater.js";
import { createCompiler } from "./utils/compiler.js";
import { LogInterface } from "./utils/LogInterface.js";
import { createSimulator } from "./utils/simulator.js";

export type { LogEntry, LogLevel } from "./consoleLogger.js";
export type { ExplorerItem } from "./router/app.js";
export type { State } from "./types.js";
export type { WingSimulatorSchema, BaseResourceSchema } from "./wingsdk.js";
export type { Updater, UpdaterStatus } from "./updater.js";
export type { Config } from "./config.js";
export type { Router } from "./router/index.js";

type RouteNames = keyof inferRouterInputs<Router> | undefined;

export interface CreateConsoleServerOptions {
  wingfile: string;
  log: LogInterface;
  updater?: Updater;
  config: Config;
  requestedPort?: number;
  hostUtils?: HostUtils;
}

export const createConsoleServer = async ({
  wingfile,
  log,
  updater,
  config,
  requestedPort,
  hostUtils,
}: CreateConsoleServerOptions) => {
  const emitter = new Emittery<{
    invalidateQuery: RouteNames;
    trace: Trace;
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

  const compiler = createCompiler(wingfile);
  const simulator = createSimulator();
  compiler.on("compiled", ({ simfile }) => {
    simulator.start(simfile);
  });

  let lastErrorMessage = "";
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
    invalidateQuery(undefined);
  });
  simulator.on("error", (error) => {
    lastErrorMessage = error.message;
    appState = "error";
    invalidateQuery("app.state");
    invalidateQuery("app.error");
  });
  simulator.on("trace", (trace) => {
    // TODO: Refactor the whole logs and events so we support all of the fields that the simulator uses.
    const message = `${
      trace.data.message ?? JSON.stringify(trace.data, undefined, 2)
    }`;
    if (trace.type === "log") {
      consoleLogger.log(message, "simulator", {
        sourceType: trace.sourceType,
        sourcePath: trace.sourcePath,
      });
    } else {
      consoleLogger.verbose(message, "simulator", {
        sourceType: trace.sourceType,
        sourcePath: trace.sourcePath,
      });
    }
    if (trace.data.status === "failure") {
      consoleLogger.error(trace.data.error.message, "user", {
        sourceType: trace.sourceType,
        sourcePath: trace.sourcePath,
      });
    }

    if (
      trace.sourceType === "wingsdk.cloud.Queue" &&
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
    errorMessage() {
      return lastErrorMessage;
    },
    emitter: emitter as Emittery<{
      invalidateQuery: string | undefined;
      trace: Trace;
    }>,
    log,
    updater,
    config,
    requestedPort,
    appState() {
      return appState;
    },
    hostUtils,
  });

  const close = async () => {
    try {
      updater?.removeEventListener("status-change", invalidateUpdaterStatus);
      config?.removeEventListener("config-change", invalidateConfig);
      await Promise.allSettled([
        server.close(),
        compiler.stop(),
        simulator.stop(),
      ]);
    } catch (error) {
      log.error(error);
    }
  };

  return {
    port,
    close,
  };
};
