import * as trpc from "@trpc/server";

import { Simulator } from "../wingsdk";

import { createAppRouter } from "./app";
import { createBucketRouter } from "./bucket";
import { createFunctionRouter } from "./function";
import { createQueueRouter } from "./queue";

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
