import * as trpc from "@trpc/server";

import { LogEntry } from "../consoleLogger.js";
import { Simulator } from "../wingsdk.js";

import { ConstructTree } from "./createSimulator.js";

export interface RouterContext {
  simulator: () => Promise<Simulator>;
  tree: () => Promise<ConstructTree>;
  logs: () => LogEntry[];
}

export function createRouter() {
  return trpc.router<RouterContext>();
}
