import { inferRouterInputs } from "@trpc/server";
import Emittery from "emittery";

import { ConsoleLogger, createConsoleLogger } from "./consoleLogger.js";
import { createExpressServer } from "./expressServer.js";
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
export type { Router } from "./router/index.js";

type RouteNames = keyof inferRouterInputs<Router> | undefined;

export interface CreateConsoleServerOptions {
  wingfile: string;
  log: LogInterface;
  updater?: Updater;
  requestedPort?: number;
}

export const createConsoleServer = async ({
  wingfile,
  log,
  updater,
  requestedPort,
}: CreateConsoleServerOptions) => {
  const emitter = new Emittery<{
    invalidateQuery: RouteNames;
  }>();

  const invalidateQuery = async (query: RouteNames) => {
    await emitter.emit("invalidateQuery", query);
  };

  const invalidateUpdaterStatus = async () => {
    await invalidateQuery("updater.currentStatus");
  };
  updater?.addEventListener("status-change", invalidateUpdaterStatus);

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
    emitter: emitter as Emittery<{ invalidateQuery: string | undefined }>,
    log,
    updater,
    requestedPort,
    appState() {
      return appState;
    },
  });

  simulator.instance().then(async (simulatorInstance) => {
    simulatorInstance.onTrace({
      callback(event) {
        // TODO: Refactor the whole logs and events so we support all of the fields that the simulator uses.
        const message = `${
          event.data.message ?? JSON.stringify(event.data, undefined, 2)
        }`;
        if (event.type === "log") {
          consoleLogger.log(message, "simulator", {
            sourceType: event.sourceType,
            sourcePath: event.sourcePath,
          });
        } else {
          consoleLogger.verbose(message, "simulator", {
            sourceType: event.sourceType,
            sourcePath: event.sourcePath,
          });
        }
        if (event.data.status === "failure") {
          consoleLogger.error(event.data.error.message, "user", {
            sourceType: event.sourceType,
            sourcePath: event.sourcePath,
          });
        }

        if (
          event.sourceType === "wingsdk.cloud.Queue" &&
          // TODO: Change implementation after https://github.com/winglang/wing/issues/1713 is done
          event.data.message?.includes("Sending messages")
        ) {
          invalidateQuery("queue.approxSize");
        }
      },
    });
  });

  const close = async () => {
    try {
      updater?.removeEventListener("status-change", invalidateUpdaterStatus);
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
