import { z } from "zod";

import {
  createProcedure,
  createRouter,
  environmentIdShape,
} from "../utils/createRouter.js";

export const createEnvironmentsRouter = () => {
  return createRouter({
    "environments.activate": createProcedure
      .input(
        z.object({
          environmentId: environmentIdShape,
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const environments = ctx.getEnvironmentsManager();
        await environments.activateEnvironment(input.environmentId);
        return {
          environmentId: input.environmentId,
        };
      }),
    "environments.listEnvironments": createProcedure.query(async ({ ctx }) => {
      const tests = ctx.getTestRunner();
      const environmentsManager = ctx.getEnvironmentsManager();
      return {
        // environments: await environmentsManager.listEnvironments(tests),
        environments: [],
      };
    }),
  });
};
