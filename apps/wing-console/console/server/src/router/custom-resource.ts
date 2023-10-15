import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { buildConstructTreeNodeMap } from "../utils/constructTreeNodeMap.js";
import { createProcedure, createRouter } from "../utils/createRouter.js";

export const createCustomResourceRouter = () => {
  return createRouter({
    "custom-resource.getDisplayMetaComponents": createProcedure
      .input(
        z.object({
          resourcePath: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const node = nodeMap.get(input.resourcePath);
        if (!node) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Node was not found.",
          });
        }
        return node.display?.displayMetaComponents;
      }),
  });
};
