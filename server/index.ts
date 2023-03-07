import Emittery from "emittery";

import { ConsoleLogger, createConsoleLogger } from "./consoleLogger.js";
import { createExpressServer } from "./expressServer.js";
import { createCloudAppState } from "./utils/cloudAppState.js";
import { RouterEvents } from "./utils/createRouter.js";
import { createWingApp } from "./utils/createWingApp.js";
import { LogInterface } from "./utils/LogInterface.js";

export interface CreateConsoleServerOptions {
  inputFile: string;
  log: LogInterface;
}

export const createConsoleServer = async ({
  inputFile,
  log,
}: CreateConsoleServerOptions) => {
  let lastErrorMessage: string = "";

  const emitter = new Emittery<RouterEvents>();

  const consoleLogger: ConsoleLogger = createConsoleLogger({
    onLog: (level, message) => {
      lastErrorMessage = "";
      if (level === "error") {
        lastErrorMessage = message;
        void emitter.emit("invalidateQuery", {
          query: "app.error",
        });
      }
      void emitter.emit("invalidateQuery", {
        query: "app.logs",
      });
    },
    log,
  });

  const cloudAppStateService = createCloudAppState({
    onChange: (state) => {
      log.info("cloud app new state was sent to renderer process", state);
      void emitter.emit("invalidateQuery", {
        query: "app.state",
      });
      if (state === "success") {
        log.info("simulator loaded, invalidate trpc queries");
        // Clear the logs.
        consoleLogger.messages = [];
        void emitter.emit("invalidateQuery", {
          query: undefined,
        });
      }
    },
    log,
  });

  const simulatorPromise = createWingApp({
    inputFile,
    sendCloudAppStateEvent: cloudAppStateService.send,
    consoleLogger,
    log,
  });

  // Create the express server and router for the simulator. Start
  // listening but don't wait for it, yet.
  log.info("Starting the dev server...");

  const { server, port } = await createExpressServer({
    cloudAppStateService,
    consoleLogger,
    simulatorPromise,
    errorMessage() {
      return lastErrorMessage;
    },
    emitter,
    log,
  });

  const simulatorPromiseResolved = await simulatorPromise;
  const simulatorInstance = await simulatorPromiseResolved.get();

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
        void emitter.emit("invalidateQuery", {
          query: "queue.approxSize",
        });
      }
    },
  });

  const close = async () => {
    try {
      await Promise.allSettled([server.close(), simulatorInstance.stop()]);
    } catch (error) {
      log.error(error);
    }
  };

  return {
    port,
    close,
  };
};
