import * as trpc from "@trpc/server";

import { Simulator } from "../wingsdk.js";

import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createFunctionRouter } from "./function.js";
import { createQueueRouter } from "./queue.js";

export const mergeRouters = (simulator: Simulator) => {
  const bucketRouter = createBucketRouter(simulator);
  const appRouter = createAppRouter(simulator);
  const queueRouter = createQueueRouter(simulator);
  const functionRouter = createFunctionRouter(simulator);
  return trpc
    .router()
    .merge(bucketRouter)
    .merge(appRouter)
    .merge(queueRouter)
    .merge(functionRouter);
};

export type Router = ReturnType<typeof mergeRouters>;
