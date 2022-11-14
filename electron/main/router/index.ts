import * as trpc from "@trpc/server";

import { LogEntry } from "../../../src/components/NodeLogs.js";
import { Simulator } from "../wingsdk.js";

import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createFunctionRouter } from "./function.js";
import { createQueueRouter } from "./queue.js";

export const mergeRouters = (options: {
  simulator: Simulator;
  logs: () => LogEntry[];
}) => {
  return trpc
    .router()
    .merge(createBucketRouter(options.simulator))
    .merge(createAppRouter(options))
    .merge(createQueueRouter(options.simulator))
    .merge(createFunctionRouter(options.simulator));
};

export type Router = ReturnType<typeof mergeRouters>;
