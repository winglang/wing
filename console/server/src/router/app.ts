import { TRPCError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Trace } from "@winglang/sdk/lib/cloud/test-runner.js";
import uniqby from "lodash.uniqby";
import { z } from "zod";

import { ConstructTreeNode } from "../utils/construct-tree.js";
import {
  Node,
  NodeDisplay,
  buildConstructTreeNodeMap,
  NodeConnection,
  ConstructTreeNodeMap,
} from "../utils/constructTreeNodeMap.js";
import { createProcedure, createRouter } from "../utils/createRouter.js";
import { Simulator } from "../wingsdk.js";

const isTest = /(\/test$|\/test:([^/\\])+$)/;

export interface ExplorerItem {
  id: string;
  label: string;
  type?: string;
  childItems?: ExplorerItem[];
  display?: NodeDisplay;
}

export const createAppRouter = () => {
  const router = createRouter({
    "app.details": createProcedure.query(({ ctx }) => {
      return ctx.appDetails();
    }),
    "app.logs": createProcedure
      .input(
        z.object({
          filters: z.object({
            level: z.object({
              verbose: z.boolean(),
              info: z.boolean(),
              warn: z.boolean(),
              error: z.boolean(),
            }),
            timestamp: z.number(),
            text: z.string(),
          }),
        }),
      )
      .query(async ({ ctx, input }) => {
        return ctx.logger.messages.filter(
          (entry) =>
            input.filters.level[entry.level] &&
            entry.timestamp &&
            entry.timestamp >= input.filters.timestamp &&
            (!input.filters.text ||
              `${entry.message}${entry.ctx?.sourcePath}`
                .toLowerCase()
                .includes(input.filters.text.toLowerCase())),
        );
      }),
    "app.error": createProcedure.query(({ ctx }) => {
      return ctx.errorMessage();
    }),
    "app.explorerTree": createProcedure
      .input(
        z
          .object({
            showTests: z.boolean().optional(),
          })
          .optional(),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();

        const { tree } = simulator.tree().rawData();
        return createExplorerItemFromConstructTreeNode(
          tree,
          simulator,
          input?.showTests,
        );
      }),
    "app.childRelationships": createProcedure
      .input(
        z.object({
          path: z.string().optional(),
          showTests: z.boolean().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(tree);

        const node = nodeMap.get(input.path);
        const children = nodeMap.getAll(node?.children ?? []);

        return children
          .filter((node) => {
            if (node.display?.hidden) {
              return false;
            }

            if (!input.showTests && isTest.test(node.path)) {
              return false;
            }

            return true;
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
                    return false;
                  }

                  const node = nodeMap.get(resource);
                  if (!node) {
                    throw new Error(
                      `Could not find node for resource ${resource}`,
                    );
                  }

                  if (node.display?.hidden) {
                    return false;
                  }

                  if (!input.showTests && isTest.test(node.path)) {
                    return false;
                  }

                  return true;
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
                    return false;
                  }

                  const node = nodeMap.get(resource);
                  if (!node) {
                    throw new Error(
                      `Could not find node for resource ${resource}`,
                    );
                  }

                  if (node.display?.hidden) {
                    return false;
                  }

                  if (!input.showTests && isTest.test(node.path)) {
                    return false;
                  }

                  return true;
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
    "app.nodeBreadcrumbs": createProcedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = simulator.tree().rawData();
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
    "app.node": createProcedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const node = nodeMap.get(input.path);
        if (!node) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Node was not found.",
          });
        }

        const config = simulator.tryGetResourceConfig(node.path);

        return {
          id: node.id,
          path: node.path,
          type: getResourceType(node, simulator),
          attributes: config?.attrs,
          props: config?.props,
        };
      }),
    "app.nodeMetadata": createProcedure
      .input(
        z.object({
          path: z.string().optional(),
          showTests: z.boolean().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { path, showTests } = input;
        if (!path) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Path was not found.",
          });
        }

        const simulator = await ctx.simulator();

        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const node = nodeMap.get(path);
        if (!node) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Node was not found.",
          });
        }

        // TODO - remove once SDK will solve duplicate connections
        // Since connections may be duplicated, we need to filter them out. While deduplicating,
        // we keep only one connection per resource and direction (because the SDK currently has
        // no way to distinguish between multiple connections to the same resource).
        // Also, we need to filter out connections to hidden nodes.
        const connections = uniqby(
          node.attributes?.["wing:resource:connections"] ?? [],
          (connection) => {
            return `${connection.direction}-${connection.resource}`;
          },
        ).filter((connection) => {
          const node = nodeMap.get(connection.resource);
          if (!node) {
            throw new Error(
              `Could not find node for resource ${connection.resource}`,
            );
          }

          if (node.display?.hidden) {
            return false;
          }

          if (!showTests && isTest.test(node.path)) {
            return false;
          }

          return true;
        });

        const config = simulator.tryGetResourceConfig(node.path);

        return {
          node: {
            id: node.id,
            path: node.path,
            type: getResourceType(node, simulator),
            props: config?.props,
            attributes: config?.attrs,
          },
          inbound: connections
            .filter(({ direction }) => {
              return direction === "inbound";
            })
            .map((connection) => {
              const node = nodeMap.get(connection.resource)!;
              return {
                id: node.id,
                path: node.path,
                type: getResourceType(node, simulator),
              };
            }),
          outbound: connections
            .filter(({ direction }) => {
              return direction === "outbound";
            })
            .map((connection) => {
              const node = nodeMap.get(connection.resource)!;
              return {
                id: node.id,
                path: node.path,
                type: getResourceType(node, simulator),
              };
            }),
        };
      }),
    "app.invalidateQuery": createProcedure.subscription(({ ctx }) => {
      return observable<string | undefined>((emit) => {
        ctx.emitter.on("invalidateQuery", emit.next);
        return () => {
          ctx.emitter.off("invalidateQuery", emit.next);
        };
      });
    }),
    "app.traces": createProcedure.subscription(({ ctx }) => {
      return observable<Trace>((emit) => {
        ctx.emitter.on("trace", emit.next);
        return () => {
          ctx.emitter.off("trace", emit.next);
        };
      });
    }),
    "app.map": createProcedure
      .input(
        z
          .object({
            showTests: z.boolean().optional(),
          })
          .optional(),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();

        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const nodes = [
          createMapNodeFromConstructTreeNode(tree, simulator, input?.showTests),
        ];
        const edges = uniqby(
          createMapEdgeFromConstructTreeNode(tree, nodeMap, input?.showTests),
          (edge) => edge.id,
        );

        return {
          nodes,
          edges,
        };
      }),
    "app.state": createProcedure.query(async ({ ctx }) => {
      return ctx.appState();
    }),
    "app.openExternal": createProcedure
      .input(
        z.object({
          url: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        // TODO
        // await shell.openExternal(input.url);
      }),
  });

  return { router };
};

function createExplorerItemFromConstructTreeNode(
  node: ConstructTreeNode,
  simulator: Simulator,
  showTests = false,
): ExplorerItem {
  return {
    id: node.path,
    label: node.id,
    type: getResourceType(node, simulator),
    display: node.display,
    childItems: node.children
      ? Object.values(node.children)
          .filter((node) => {
            return (
              !node.display?.hidden && (showTests || !isTest.test(node.path))
            );
          })
          .map((node) =>
            createExplorerItemFromConstructTreeNode(node, simulator),
          )
      : undefined,
  };
}

interface MapNode {
  id: string;
  data: {
    label?: string;
    type?: string;
    display?: NodeDisplay;
  };
  children?: MapNode[];
}

function createMapNodeFromConstructTreeNode(
  node: ConstructTreeNode,
  simulator: Simulator,
  showTests = false,
): MapNode {
  return {
    id: node.path,
    data: {
      label: node.id,
      type: getResourceType(node, simulator),
      display: node.display,
    },
    children: node.children
      ? Object.values(node.children)
          .filter((node) => {
            if (node.display?.hidden) {
              return false;
            }

            if (!showTests && isTest.test(node.path)) {
              return false;
            }

            return true;
          })
          .map((node) =>
            createMapNodeFromConstructTreeNode(node, simulator, showTests),
          )
      : undefined,
  };
}

interface MapEdge {
  id: string;
  source: string;
  target: string;
}

function createMapEdgeFromConstructTreeNode(
  node: ConstructTreeNode,
  nodeMap: ConstructTreeNodeMap,
  showTests = false,
): MapEdge[] {
  if (node.display?.hidden || (!showTests && isTest.test(node.path))) {
    return [];
  }

  return [
    ...(node.attributes?.["wing:resource:connections"]
      ?.filter(({ direction, resource }: NodeConnection) => {
        const node = nodeMap.get(resource);
        if (!node) {
          throw new Error(`Could not find node for resource ${resource}`);
        }

        const shouldRemove =
          node.display?.hidden || (!showTests && isTest.test(node.path));
        if (direction === "inbound" && !shouldRemove) {
          return true;
        }
      })
      ?.map((connection: NodeConnection) => {
        return {
          id: `${connection.resource} -> ${node.path}`,
          source: connection.resource,
          target: node.path,
        };
      }) ?? []),
    ...(Object.values(node.children ?? {})?.map((child) =>
      createMapEdgeFromConstructTreeNode(child, nodeMap, showTests),
    ) ?? []),
  ].flat();
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
    simulator.tryGetResourceConfig(node.path)?.type ??
    node.constructInfo?.fqn ??
    "constructs.Construct"
  );
}
