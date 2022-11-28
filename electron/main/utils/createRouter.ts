import * as trpc from "@trpc/server";

import { LogEntry } from "../../../src/components/NodeLogs.js";
import { Simulator } from "../wingsdk.js";

export interface RouterContext {
  simulator: () => Promise<Simulator>;
  logs: () => LogEntry[];
}

export function createRouter() {
  return trpc.router<RouterContext>();
}
