import { createRouter } from "../utils/createRouter.js";

import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createFunctionRouter } from "./function.js";
import { createQueueRouter } from "./queue.js";

export const mergeRouters = () => {
  return createRouter()
    .merge(createBucketRouter())
    .merge(createAppRouter())
    .merge(createQueueRouter())
    .merge(createFunctionRouter());
};

export type Router = ReturnType<typeof mergeRouters>;
