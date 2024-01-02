import { TRPCError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import uniqby from "lodash.uniqby";
import { z } from "zod";

import type { Trace } from "../types.js";
import { ConstructTreeNode } from "../utils/construct-tree.js";
import {
  Node,
  NodeDisplay,
  buildConstructTreeNodeMap,
  NodeConnection,
  ConstructTreeNodeMap,
} from "../utils/constructTreeNodeMap.js";
import {
  FileLink,
  createProcedure,
  createRouter,
} from "../utils/createRouter.js";
import {
  isTermsAccepted,
  acceptTerms,
  getLicense,
} from "../utils/terms-and-conditions.js";
import { Simulator } from "../wingsdk.js";

const isTest = /(\/test$|\/test:([^/\\])+$)/;
const isTestHandler = /(\/test$|\/test:.*\/Handler$)/;

const matchTest = (path: string) => {
  return isTest.test(path) || isTestHandler.test(path);
};

export interface ExplorerItem {
  id: string;
  label: string;
  type?: string;
  childItems?: ExplorerItem[];
  display?: NodeDisplay;
}

const shakeTree = (tree: ConstructTreeNode): ConstructTreeNode => {
  const newTree = { ...tree, children: { ...tree.children } };
  // remove node id "Default" from newTree and move children to root
  if (newTree.children.Default) {
    newTree.children = { ...newTree.children.Default.children };
  }
  return newTree;
};

export const createAppRouter = () => {
  const router = createRouter({
    "app.details": createProcedure.query(({ ctx }) => {
      return ctx.appDetails();
    }),
    "app.wingfile": createProcedure.query(({ ctx }) => {
      return ctx.wingfile.split("/").pop();
    }),
    "app.termsConfig": createProcedure.query(({ ctx }) => {
      return {
        requireAcceptTerms: ctx.requireAcceptTerms,
        accepted: isTermsAccepted(),
        license: getLicense(),
      };
    }),
    "app.acceptTerms": createProcedure.mutation(() => {
      acceptTerms(true);
    }),
    "app.layoutConfig": createProcedure.query(async ({ ctx }) => {
      return {
        config: ctx.layoutConfig,
      };
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
            includeHiddens: z.boolean().optional(),
          })
          .optional(),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = simulator.tree().rawData();
        return createExplorerItemFromConstructTreeNode(
          shakeTree(tree),
          simulator,
          input?.showTests,
          input?.includeHiddens,
        );
      }),
    "app.nodeIds": createProcedure
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
        const node = createExplorerItemFromConstructTreeNode(
          shakeTree(tree),
          simulator,
          input?.showTests,
        );

        const list = new Array<string>();
        const getNodeIds = (item: ExplorerItem) => {
          list.push(item.id);
          for (const child of item.childItems ?? []) {
            getNodeIds(child);
          }
        };
        getNodeIds(node);
        return list;
      }),
    "app.selectNode": createProcedure
      .input(
        z.object({
          resourcePath: z.string().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        ctx.setSelectedNode(input.resourcePath ?? "");
      }),
    "app.selectedNode": createProcedure.query(async ({ ctx }) => {
      return ctx.getSelectedNode();
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
        const connections = simulator.connections();
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree));

        const node = nodeMap.get(input.path);
        const children = nodeMap.getAll(node?.children ?? []);

        return children
          .filter((node) => {
            if (node.display?.hidden) {
              return false;
            }

            if (!input.showTests && matchTest(node.path)) {
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
              connections
                ?.filter(({ source, target }) => {
                  if (target !== node.path) {
                    return false;
                  }

                  const sourceNode = nodeMap.get(source);
                  if (!sourceNode) {
                    throw new Error(
                      `Could not find node for resource ${source}`,
                    );
                  }

                  const targetNode = nodeMap.get(target);
                  if (!targetNode) {
                    throw new Error(
                      `Could not find node for resource ${target}`,
                    );
                  }

                  if (
                    sourceNode.display?.hidden ||
                    targetNode.display?.hidden
                  ) {
                    return false;
                  }

                  if (
                    !input.showTests &&
                    (matchTest(sourceNode.path) || matchTest(targetNode.path))
                  ) {
                    return false;
                  }

                  return true;
                })
                .map((connection) => {
                  const node = nodeMap.get(connection.source)!;
                  return {
                    relationshipType: connection.name,
                    node: {
                      id: node.id,
                      path: node.path,
                      type: getResourceType(node, simulator),
                    },
                  };
                }) ?? [],
            outbound:
              connections
                ?.filter(({ source, target }) => {
                  if (source !== node.path) {
                    return false;
                  }

                  const sourceNode = nodeMap.get(source);
                  if (!sourceNode) {
                    throw new Error(
                      `Could not find node for resource ${source}`,
                    );
                  }

                  const targetNode = nodeMap.get(target);
                  if (!targetNode) {
                    throw new Error(
                      `Could not find node for resource ${target}`,
                    );
                  }

                  if (
                    sourceNode.display?.hidden ||
                    targetNode.display?.hidden
                  ) {
                    return false;
                  }

                  if (
                    !input.showTests &&
                    (matchTest(sourceNode.path) || matchTest(targetNode.path))
                  ) {
                    return false;
                  }

                  return true;
                })
                .map((connection) => {
                  const node = nodeMap.get(connection.target)!;
                  return {
                    relationshipType: connection.name,
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
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree));

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
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree));
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
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree));
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
        const connections = uniqby(simulator.connections(), (connection) => {
          return `${connection.source}-${connection.target}`;
        }).filter((connection) => {
          const sourceNode = nodeMap.get(connection.source);
          if (!sourceNode) {
            throw new Error(
              `Could not find node for resource ${connection.source}`,
            );
          }

          const targetNode = nodeMap.get(connection.target);
          if (!targetNode) {
            throw new Error(
              `Could not find node for resource ${connection.target}`,
            );
          }

          if (sourceNode.display?.hidden || targetNode.display?.hidden) {
            return false;
          }

          if (
            !showTests &&
            (matchTest(sourceNode.path) || matchTest(targetNode.path))
          ) {
            return false;
          }

          return true;
        });

        const config = simulator.tryGetResourceConfig(node.path);

        return {
          node: {
            id: node.id,
            path: node.path,
            display: node.display,
            type: getResourceType(node, simulator),
            props: config?.props,
            attributes: config?.attrs,
          },
          inbound: connections
            .filter(({ target }) => {
              return target === node.path;
            })
            .map((connection) => {
              const node = nodeMap.get(connection.source)!;
              return {
                id: node.id,
                path: node.path,
                type: getResourceType(node, simulator),
              };
            }),
          outbound: connections
            .filter(({ source }) => {
              return source === node.path;
            })
            .map((connection) => {
              const node = nodeMap.get(connection.target)!;
              return {
                id: node.id,
                path: node.path,
                type: getResourceType(node, simulator),
              };
            }),
        };
      }),
    "app.edgeMetadata": createProcedure
      .input(
        z.object({
          edgeId: z.string(),
          showTests: z.boolean().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { edgeId, showTests } = input;
        const simulator = await ctx.simulator();

        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree));

        const sourcePath = edgeId.split("->")[0]?.trim();
        const targetPath = edgeId.split("->")[1]?.trim();
        const sourceNode = nodeMap.get(sourcePath);
        if (!sourceNode) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Node was not found.",
          });
        }
        const connections = simulator.connections();

        const connection = connections?.find(
          (connection) =>
            sourceNode.path === connection.source &&
            connection.target === targetPath,
        );
        const targetNode = nodeMap.get(connection?.target);
        if (!targetNode) {
          throw new Error(
            `Could not find node for resource ${connection?.target}`,
          );
        }

        const inflights = sourceNode.display?.hidden
          ? []
          : connections
              ?.filter(({ source, target, name }) => {
                if (source !== sourcePath) {
                  return false;
                }

                if (target !== targetPath) {
                  return false;
                }

                if (name === "$inflight_init()") {
                  return false;
                }

                if (
                  !showTests &&
                  (matchTest(sourceNode.path) || matchTest(targetNode.path))
                ) {
                  return false;
                }

                return true;
              })
              .map((connection) => {
                return {
                  name: connection.name,
                };
              }) ?? [];

        return {
          source: {
            id: sourceNode.id,
            path: sourceNode.path,
            type: getResourceType(sourceNode, simulator),
          },
          target: {
            id: targetNode?.id ?? "",
            path: targetNode?.path ?? "",
            type: (targetNode && getResourceType(targetNode, simulator)) ?? "",
          },
          inflights,
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
        const connections = simulator.connections();
        const shakedTree = shakeTree(tree);
        const nodeMap = buildConstructTreeNodeMap(shakedTree);
        const nodes = [
          createMapNodeFromConstructTreeNode(
            shakedTree,
            simulator,
            input?.showTests,
          ),
        ];
        const edges = uniqby(
          createMapEdgesFromConnectionData(
            nodeMap,
            connections,
            input?.showTests,
          ),
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
      .mutation(async ({ ctx, input }) => {
        await ctx.hostUtils?.openExternal(input.url);
      }),
    "app.openFileInEditor": createProcedure
      .input(
        z.object({
          path: z.string(),
          line: z.number().optional(),
          column: z.number().optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.emitter.listenerCount("openFileInEditor") > 0) {
          ctx.emitter.emit("openFileInEditor", {
            path: input.path,
            line: input.line,
            column: input.column,
          });
          return;
        }
        const { default: launch } = await import("launch-editor");
        launch(`${input.path}:${input.line}:${input.column}`);
      }),

    /**
     * Warning! Subscribing to this procedure will override the default behavior of opening files in the editor
     * provided by the "app.openFileInEditor" procedure.
     * Needed to manage file opening within the vs-code extension.
     */
    "app.openFileInEditorSubscription": createProcedure.subscription(
      ({ ctx }) => {
        return observable<FileLink>((emit) => {
          ctx.emitter.on("openFileInEditor", emit.next);
          return () => {
            ctx.emitter.off("openFileInEditor", emit.next);
          };
        });
      },
    ),
  });

  return { router };
};

function createExplorerItemFromConstructTreeNode(
  node: ConstructTreeNode,
  simulator: Simulator,
  showTests = false,
  includeHiddens = false,
): ExplorerItem {
  const label =
    node.display?.sourceModule === "@winglang/sdk" && node.display?.title
      ? node.display?.title
      : node.id;

  return {
    id: node.path,
    label,
    type: getResourceType(node, simulator),
    display: node.display,
    childItems: node.children
      ? Object.values(node.children)
          .filter((node) => {
            return (
              (includeHiddens || !node.display?.hidden) &&
              (showTests || !matchTest(node.path))
            );
          })
          .map((node) =>
            createExplorerItemFromConstructTreeNode(
              node,
              simulator,
              showTests,
              includeHiddens,
            ),
          )
      : undefined,
  };
}

export interface MapNode {
  id: string;
  data: {
    label?: string;
    type?: string;
    path?: string;
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
      path: node.path,
      display: node.display,
    },
    children: node.children
      ? Object.values(node.children)
          .filter((node) => {
            if (node.display?.hidden) {
              return false;
            }

            if (!showTests && matchTest(node.path)) {
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

export interface MapEdge {
  id: string;
  source: string;
  target: string;
}

function createMapEdgesFromConnectionData(
  nodeMap: ConstructTreeNodeMap,
  connections: NodeConnection[],
  showTests = false,
): MapEdge[] {
  return [
    ...connections
      .filter(({ source, target }) => {
        const sourceNode = nodeMap.get(source);
        if (!sourceNode) {
          throw new Error(`Could not find node for resource ${source}`);
        }

        const targetNode = nodeMap.get(target);
        if (!targetNode) {
          throw new Error(`Could not find node for resource ${target}`);
        }

        // Hide connections that go from a parent to its direct child (eg, API to an endpoint, queue to a consumer).
        if (targetNode.parent === sourceNode.path) {
          return false;
        }

        // Hide connections that go from a node to a parent.
        if (sourceNode.path.startsWith(`${targetNode.path}/`)) {
          return false;
        }

        if (sourceNode.display?.hidden || targetNode.display?.hidden) {
          return false;
        }

        if (
          !showTests &&
          (matchTest(sourceNode.path) || matchTest(targetNode.path))
        ) {
          return false;
        }

        // Remove redundant connections to a parent resource if there's already a connection to a child resource.
        if (
          connections.some((connection) => {
            if (
              connection.source === source &&
              connection.target.startsWith(`${target}/`)
            ) {
              return true;
            }
          })
        ) {
          return false;
        }

        return true;
      })
      ?.map((connection: NodeConnection) => {
        return {
          id: `${connection.source} -> ${connection.target}`,
          source: connection.source,
          target: connection.target,
        };
      }),
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
