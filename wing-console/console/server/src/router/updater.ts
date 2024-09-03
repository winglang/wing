import { createProcedure, createRouter } from "../utils/createRouter.js";

export const createUpdaterRouter = () => {
  return createRouter({
    "updater.enabled": createProcedure.query(async ({ ctx }) => {
      return {
        enabled: ctx.updater !== undefined,
      };
    }),
    "updater.currentStatus": createProcedure.query(async ({ ctx }) => {
      return {
        status: ctx.updater?.status(),
      };
    }),
    "updater.checkForUpdates": createProcedure.mutation(async ({ ctx }) => {
      await ctx.updater?.checkForUpdates();
    }),
    "updater.quitAndInstall": createProcedure.mutation(async ({ ctx }) => {
      ctx.updater?.quitAndInstall();
    }),
  });
};
