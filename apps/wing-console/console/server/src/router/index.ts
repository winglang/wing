import { mergeRouters, middleware } from "../utils/createRouter.js";

import { createApiRouter } from "./api.js";
import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createConfigRouter } from "./config.js";
import { createCounterRouter } from "./counter.js";
import { createDynamodbTableRouter } from "./dynamodb-table.js";
import { createFunctionRouter } from "./function.js";
import { createQueueRouter } from "./queue.js";
import { createRedisRouter } from "./redis.js";
import { createTableRouter } from "./table.js";
import { createTestRouter } from "./test.js";
import { createTopicRouter } from "./topic.js";
import { createUpdaterRouter } from "./updater.js";
import { createWebsiteRouter } from "./website.js";

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
    createTableRouter(),
    createUpdaterRouter(),
    createRedisRouter(),
    createWebsiteRouter(),
    createConfigRouter(),
    createDynamodbTableRouter(),
  );

  return { router };
};

export type Router = ReturnType<typeof mergeAllRouters>["router"];
