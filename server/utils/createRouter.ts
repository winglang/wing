import { initTRPC } from "@trpc/server";
import Emittery from "emittery";

import { LogEntry } from "../consoleLogger.js";
import { Simulator } from "../wingsdk.js";

import { CloudAppStateService } from "./cloudAppState.js";
import { ConstructTree } from "./createSimulator.js";

export type QueryNames = {
  query:
    | "app.error"
    | "app.logs"
    | "app.state"
    | "queue.approxSize"
    | undefined;
};

export type RouterEvents = {
  invalidateQuery: QueryNames;
};

export interface RouterContext {
  simulator: () => Promise<Simulator>;
  tree: () => Promise<ConstructTree>;
  logs: () => LogEntry[];
  appDetails: () => Promise<{
    wingVersion: string | undefined;
  }>;
  errorMessage: () => string | undefined;
  emitter: Emittery<RouterEvents>;
  cloudAppStateService: CloudAppStateService;
}

const t = initTRPC.context<RouterContext>().create();
export const createRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const createProcedure = t.procedure;
