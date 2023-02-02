import { initTRPC } from "@trpc/server";

import { LogEntry } from "../consoleLogger.js";
import { Status } from "../types.js";
import { Simulator } from "../wingsdk.js";

import { ConstructTree } from "./createSimulator.js";

export interface RouterContext {
  simulator: () => Promise<Simulator>;
  tree: () => Promise<ConstructTree>;
  logs: () => LogEntry[];
  appStatus: () => Promise<{
    simulatorStatus: Status;
    compilerStatus: Status;
    wingVersion: string | undefined;
  }>;
}

const t = initTRPC.context<RouterContext>().create({});
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
