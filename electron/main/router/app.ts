import * as trpc from "@trpc/server";

import { LogEntry } from "../../../src/components/NodeLogs.js";
import { Simulator, WingSimulatorSchema } from "../wingsdk.js";

export const createAppRouter = (options: {
  simulator: Simulator;
  logs: () => LogEntry[];
}) => {
  return trpc
    .router()
    .query("app.tree", {
      async resolve() {
        // TODO: Ask Chris to fix the types
        return options.simulator.tree as WingSimulatorSchema;
      },
    })
    .query("app.logs", {
      async resolve() {
        return options.logs();
      },
    });
};
