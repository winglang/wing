import { mergeRouters } from "../utils/createRouter.js";

import { createApiRouter } from "./api.js";
import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createCounterRouter } from "./counter.js";
import { createFunctionRouter } from "./function.js";
import { createQueueRouter } from "./queue.js";
import { createTestRouter } from "./test.js";
import { createTopicRouter } from "./topic.js";
import { createUpdaterRouter } from "./updater.js";

export const mergeAllRouters = () => {
  const app = createAppRouter();

  const router = mergeRouters(
    app.router,
    createBucketRouter(),
    createQueueRouter(),
    createFunctionRouter(),
    createCounterRouter(),
    createTestRouter(),
    createTopicRouter(),
    createApiRouter(),
    createUpdaterRouter(),
  );

  return { router };
};

export type Router = ReturnType<typeof mergeAllRouters>["router"];
