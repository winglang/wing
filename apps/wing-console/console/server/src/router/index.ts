import { mergeRouters, middleware } from "../utils/createRouter.js";

import { createApiRouter } from "./api.js";
import { createAppRouter } from "./app.js";
import { createBucketRouter } from "./bucket.js";
import { createConfigRouter } from "./config.js";
import { createCounterRouter } from "./counter.js";
import { createEndpointRouter } from "./endpoint.js";
import { createFileBrowserRouter } from "./file-browser.js";
import { createFunctionRouter } from "./function.js";
import { createHttpClientRouter } from "./http-client.js";
import { createQueueRouter } from "./queue.js";
import { createTestRouter } from "./test.js";
import { createTopicRouter } from "./topic.js";
import { createUiButtonRouter } from "./ui-button.js";
import { createUiFieldRouter } from "./ui-field.js";
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
    createUpdaterRouter(),
    createWebsiteRouter(),
    createConfigRouter(),
    createEndpointRouter(),
    createUiButtonRouter(),
    createUiFieldRouter(),
    createHttpClientRouter(),
    createFileBrowserRouter(),
  );

  return { router };
};

export type Router = ReturnType<typeof mergeAllRouters>["router"];
