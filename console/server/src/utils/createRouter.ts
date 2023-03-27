import { initTRPC } from "@trpc/server";
import Emittery from "emittery";

import { LogEntry } from "../consoleLogger.js";
import { Updater } from "../updater.js";
import { Simulator } from "../wingsdk.js";

import { CloudAppStateService } from "./cloudAppState.js";
import { TestLogger } from "./testLogger.js";

export type QueryNames = {
  query:
    | "app.error"
    | "app.logs"
    | "app.state"
    | "queue.approxSize"
    | "updater.currentStatus"
    | undefined;
};

export type RouterEvents = {
  invalidateQuery: QueryNames;
};

export interface RouterContext {
  simulator: () => Promise<Simulator>;
  logs: () => LogEntry[];
  appDetails: () => Promise<{
    wingVersion: string | undefined;
  }>;
  errorMessage: () => string | undefined;
  emitter: Emittery<RouterEvents>;
  cloudAppStateService: CloudAppStateService;
  testLogger: TestLogger;
  updater?: Updater;
}

const t = initTRPC.context<RouterContext>().create();
export const createRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const createProcedure = t.procedure;
