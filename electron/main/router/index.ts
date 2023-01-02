import { mergeRouters } from "../utils/createRouter.js";

import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createCounterRouter } from "./counter.js";
import { createFunctionRouter } from "./function.js";
import { createQueueRouter } from "./queue.js";

export const mergeAppRouters = () => {
  return mergeRouters(
    createAppRouter(),
    createBucketRouter(),
    createQueueRouter(),
    createFunctionRouter(),
    createCounterRouter(),
  );
};

export type Router = ReturnType<typeof mergeAppRouters>;
