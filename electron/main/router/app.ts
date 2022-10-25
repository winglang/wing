import * as trpc from "@trpc/server";

import { Simulator, WingSimulatorSchema } from "../wingsdk";

export const createAppRouter = (simulator: Simulator) => {
  return trpc.router().query("app.tree", {
    async resolve() {
      // TODO: Ask Chris to fix the types
      return simulator.tree as WingSimulatorSchema;
    },
  });
};
