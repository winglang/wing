import { createRouter } from "../context";

import { bucketRouter } from "./bucket";

export const router = createRouter().merge(bucketRouter);

export type Router = typeof router;
