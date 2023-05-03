import { createProcedure, createRouter } from "../utils/createRouter.js";

export const createConfigRouter = () => {
  return createRouter({
    "config.getThemeMode": createProcedure.query(async ({ ctx }) => {
      return { mode: ctx?.config?.get("themeMode") };
    }),
  });
};
