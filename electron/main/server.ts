import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import getPort from "get-port";

import { createContext } from "./context";
import { router } from "./router";

export async function createServer() {
  const port = await getPort();

  const app = express();
  app.use(cors());
  app.use(
    trpcExpress.createExpressMiddleware({
      router,
      createContext,
    }),
  );

  await new Promise<void>((resolve) => {
    app.listen(port, resolve);
  });

  return {
    port,
    app,
  };
}
