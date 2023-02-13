import { TRPCError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { z } from "zod";

import {
  Node,
  NodeDisplay,
  buildConstructTreeNodeMap,
} from "../utils/constructTreeNodeMap.js";
import { publicProcedure, router } from "../utils/createRouter.js";
import { ConstructTreeNode } from "../utils/createSimulator.js";
import { BaseResourceSchema, Simulator } from "../wingsdk.js";

export interface ExplorerItem {
  id: string;
  label: string;
  type?: string;
  childItems?: ExplorerItem[];
  display?: NodeDisplay;
}

export const createAppRouter = () => {
  return router({
    "app.details": publicProcedure.query(({ ctx }) => {
      return ctx.appDetails();
    }),
    "app.logs": publicProcedure
      .input(
        z.object({
          filters: z.object({
            level: z.object({
              verbose: z.boolean(),
              info: z.boolean(),
              warn: z.boolean(),
              error: z.boolean(),
            }),
            source: z.object({
              compiler: z.boolean(),
              console: z.boolean(),
              simulator: z.boolean(),
            }),
            timestamp: z.number(),
            text: z.string(),
          }),
        }),
      )
      .query(async ({ ctx, input }) => {
        return ctx
          .logs()
          .filter(
            (entry) =>
              input.filters.level[entry.level] &&
              input.filters.source[entry.source] &&
              entry.timestamp >= input.filters.timestamp &&
              (!input.filters.text ||
                entry.message
                  .toLowerCase()
                  .includes(input.filters.text.toLowerCase())),
          );
      }),
    "app.error": publicProcedure.query(({ ctx }) => {
      return ctx.errorMessage();
    }),
    "app.explorerTree": publicProcedure.query(async ({ ctx }) => {
      const simulator = await ctx.simulator();
      const { tree } = await ctx.tree();
      return createExplorerItemFromConstructTreeNode(tree, simulator);
    }),
    "app.childRelationships": publicProcedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        const nodeMap = buildConstructTreeNodeMap(tree);

        const node = nodeMap.get(input.path);
        const children = nodeMap.getAll(node?.children ?? []);
        return children
          .filter((node) => {
            return !node.display?.hidden;
          })
          .map((node) => ({
            node: {
              id: node.id,
              path: node.path,
              type: getResourceType(node, simulator),
              display: node.display,
            },
            inbound:
              node.attributes?.["wing:resource:connections"]
                ?.filter(({ direction, resource }) => {
                  if (direction !== "inbound") {
                    return;
                  }
                  const node = nodeMap.get(resource)!;
                  return !node.display?.hidden;
                })
                .map((connection) => {
                  const node = nodeMap.get(connection.resource)!;
                  return {
                    relationshipType: connection.relationship,
                    node: {
                      id: node.id,
                      path: node.path,
                      type: getResourceType(node, simulator),
                    },
                  };
                }) ?? [],
            outbound:
              node.attributes?.["wing:resource:connections"]
                ?.filter(({ direction, resource }) => {
                  if (direction !== "outbound") {
                    return;
                  }
                  const node = nodeMap.get(resource)!;
                  return !node.display?.hidden;
                })
                .map((connection) => {
                  const node = nodeMap.get(connection.resource)!;
                  return {
                    relationshipType: connection.relationship,
                    node: {
                      id: node.id,
                      path: node.path,
                      type: getResourceType(node, simulator),
                    },
                  };
                }) ?? [],
          }));
      }),
    "app.nodeBreadcrumbs": publicProcedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        const nodeMap = buildConstructTreeNodeMap(tree);

        let breadcrumbs: Array<{
          id: string;
          path: string;
          type: string | undefined;
        }> = [];
        nodeMap?.visitParents(input.path, (node) => {
          breadcrumbs = [
            {
              id: node.id,
              path: node.path,
              type: getResourceType(node, simulator),
            },
            ...breadcrumbs,
          ];
        });
        return breadcrumbs;
      }),
    "app.node": publicProcedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const node = nodeMap.get(input.path);
        if (!node) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Node was not found.",
          });
        }

        const config = getResourceConfig(node.path, simulator);

        return {
          id: node.id,
          path: node.path,
          type: getResourceType(node, simulator),
          attributes: config?.attrs,
          props: config?.props,
        };
      }),
    "app.nodeMetadata": publicProcedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { path } = input;
        if (!path) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Path was not found.",
          });
        }

        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const node = nodeMap.get(path);
        if (!node) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Node was not found.",
          });
        }

        const config = getResourceConfig(path, simulator);

        return {
          node: {
            id: node.id,
            path: node.path,
            type: getResourceType(node, simulator),
            props: config?.props,
          },
          inbound:
            node.attributes?.["wing:resource:connections"]
              ?.filter(({ direction, resource }) => {
                if (direction !== "inbound") {
                  return;
                }
                const node = nodeMap.get(resource)!;
                return !node.display?.hidden;
              })
              .map((connection) => {
                const node = nodeMap.get(connection.resource)!;
                return {
                  id: node.id,
                  path: node.path,
                  type: getResourceType(node, simulator),
                };
              }) ?? [],
          outbound:
            node.attributes?.["wing:resource:connections"]
              ?.filter(({ direction, resource }) => {
                if (direction !== "outbound") {
                  return;
                }
                const node = nodeMap.get(resource)!;
                return !node.display?.hidden;
              })
              .map((connection) => {
                const node = nodeMap.get(connection.resource)!;
                return {
                  id: node.id,
                  path: node.path,
                  type: getResourceType(node, simulator),
                };
              }) ?? [],
        };
      }),
    // TODO: Implement and use this subscription to invalidate from the backend to the frontend.
    "app.invalidateQueries": publicProcedure.subscription(() => {
      return observable<{ randomNumber: number }>((emit) => {
        // const timer = setInterval(() => {
        //   emit.next({ randomNumber: Math.random() });
        // }, 1000);
        // return () => {
        //   clearInterval(timer);
        // };
      });
    }),
  });
};

function createExplorerItemFromConstructTreeNode(
  node: ConstructTreeNode,
  simulator: Simulator,
): ExplorerItem {
  return {
    id: node.path,
    label: node.id,
    type: getResourceType(node, simulator),
    display: node.display,
    childItems: node.children
      ? Object.values(node.children)
          .filter((node) => {
            return !node.display?.hidden;
          })
          .map((node) =>
            createExplorerItemFromConstructTreeNode(node, simulator),
          )
      : undefined,
  };
}

/**
 * Return the config for a specific resource, or undefined if it doesn't exist.ç
 */
function getResourceConfig(
  path: string,
  simulator: Simulator,
): BaseResourceSchema | undefined {
  try {
    return simulator.getResourceConfig(path);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith("Resource ") &&
      error.message.endsWith(" not found.")
    ) {
      // Just ignore this error.
    } else {
      throw error;
    }
  }
}

function getResourceType(
  node: Node | ConstructTreeNode,
  simulator: Simulator,
): string {
  return (
    // WARNING: This is for test purposes only.
    // There's no way to reflect custom resource types in the simulator, so
    // we use a fake wing:console:type attribute. We should remove it at some
    // point.
    node.attributes?.["wing:console:type"] ??
    getResourceConfig(node.path, simulator)?.type ??
    node.constructInfo?.fqn ??
    "constructs.Construct"
  );
}
