import { mergeRouters } from "../utils/createRouter.js";

import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createCounterRouter } from "./counter.js";
import { createFunctionRouter } from "./function.js";
import { createQueueRouter } from "./queue.js";
import { createTopicRouter } from "./topic.js";

export const mergeAllRouters = () => {
  const app = createAppRouter();

  const router = mergeRouters(
    app.router,
    createBucketRouter(),
    createQueueRouter(),
    createFunctionRouter(),
    createCounterRouter(),
    createTopicRouter(),
  );

  return { router };
};

export type Router = ReturnType<typeof mergeAllRouters>["router"];
