import { createRouter } from "../utils/createRouter.js";
import { WingSimulatorSchema } from "../wingsdk.js";

export const createAppRouter = () => {
  return createRouter()
    .query("app.tree", {
      async resolve({ ctx }) {
        const simulator = await ctx.simulator();
        // TODO: Ask Chris to fix the types
        return simulator.tree as WingSimulatorSchema;
      },
    })
    .query("app.logs", {
      async resolve({ ctx }) {
        return ctx.logs();
      },
    });
};
