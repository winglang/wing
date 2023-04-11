import { initTRPC } from "@trpc/server";
import { testing } from "@winglang/sdk";
import Emittery from "emittery";

import { ConsoleLogger } from "../consoleLogger.js";
import { State } from "../types.js";
import { Updater } from "../updater.js";

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
  simulator(): Promise<testing.Simulator>;
  appDetails(): Promise<{
    wingVersion: string | undefined;
  }>;
  errorMessage(): string | undefined;
  emitter: Emittery<{ invalidateQuery: string | undefined }>;
  appState(): State;
  logger: ConsoleLogger;
  updater?: Updater;
}

const t = initTRPC.context<RouterContext>().create();
export const createRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const createProcedure = t.procedure;
