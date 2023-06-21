import { z } from "zod";

import { createProcedure, createRouter } from "../utils/createRouter.js";

export const createConfigRouter = () => {
  return createRouter({
    "config.getThemeMode": createProcedure.query(async ({ ctx }) => {
      return { mode: ctx?.config?.get("themeMode") };
    }),
    "config.setThemeMode": createProcedure
      .input(
        z.object({
          mode: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        ctx?.config?.set("themeMode", input.mode);
      }),
  });
};
