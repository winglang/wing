import { TRPCError } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import type { UIComponent } from "@winglang/sdk/lib/core/tree.js";
import type { ResourceRunningState } from "@winglang/sdk/lib/simulator/simulator.js";
import uniqby from "lodash.uniqby";
import { z } from "zod";

import type { Trace } from "../types.js";
import type { ConstructTreeNode } from "../utils/construct-tree.js";
import type {
  Node,
  NodeDisplay,
  NodeConnection,
  ConstructTreeNodeMap,
} from "../utils/constructTreeNodeMap.js";
import { buildConstructTreeNodeMap } from "../utils/constructTreeNodeMap.js";
import type { FileLink } from "../utils/createRouter.js";
import { createProcedure, createRouter } from "../utils/createRouter.js";
import type { Simulator } from "../wingsdk.js";

import { getHierarchichalRunningState } from "./app.get-hierarchichal-running-state.js";

const isTest = /(\/test$|\/test:([^/\\])+$)/;
const isTestHandler = /(\/test$|\/test:.*\/Handler$)/;

const matchTest = (path: string) => {
  return isTest.test(path) || isTestHandler.test(path);
};

const getHierarchicalError = (
  path: string,
  nodeMap: ConstructTreeNodeMap,
): boolean => {
  const node = nodeMap.get(path);
  if (node?.resourceConfig?.attrs?.["runningState"] === "error") {
    return true;
  }
  return (
    node?.children?.some((childPath) => {
      const childNode = nodeMap.get(childPath);
      if (childNode?.resourceConfig?.attrs?.["runningState"] === "error") {
        return true;
      }
      return getHierarchicalError(childPath, nodeMap);
    }) ?? false
  );
};

export interface ExplorerItem {
  id: string;
  label: string;
  type?: string;
  childItems?: ExplorerItem[];
  display?: NodeDisplay;
  hierarchichalRunningState: ResourceRunningState;
}

export interface MapItem extends ConstructTreeNode {
  hierarchichalRunningState: ResourceRunningState;
  children?: Record<string, MapItem>;
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
    "app.layoutConfig": createProcedure.query(async ({ ctx }) => {
      return {
        config: ctx.layoutConfig,
      };
    }),
    "app.reset": createProcedure.mutation(async ({ ctx }) => {
      ctx.logger.verbose("Resetting simulator...", "console", {
        messageType: "info",
      });
      await ctx.restartSimulator();
      ctx.logger.verbose("Simulator reset.", "console", {
        messageType: "info",
      });
    }),
    "app.logsFilters": createProcedure.query(async ({ ctx }) => {
      const simulator = await ctx.simulator();

      const resources = simulator.listResources().map((resourceId) => {
        const config = simulator.tryGetResourceConfig(resourceId);
        return {
          id: resourceId,
          type: config?.type,
        };
      });

      return {
        resources,
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
            resourceIds: z.array(z.string()),
            resourceTypes: z.array(z.string()),
          }),
        }),
      )
      .query(async ({ ctx, input }) => {
        const filters = input.filters;
        const lowerCaseText = filters.text?.toLowerCase();
        let noVerboseLogsCount = 0;

        const filteredLogs = ctx.logger.messages.filter((entry) => {
          if (entry.level !== "verbose") {
            noVerboseLogsCount++;
          }

          // Filter by timestamp
          if (entry.timestamp && entry.timestamp < filters.timestamp) {
            return false;
          }
          // Filter by level
          if (!filters.level[entry.level]) {
            return false;
          }
          // Filter by resourceIds
          if (
            filters.resourceIds.length > 0 &&
            (!entry.ctx?.sourcePath ||
              !filters.resourceIds.includes(entry.ctx.sourcePath))
          ) {
            return false;
          }
          // Filter by resourceTypes
          if (
            filters.resourceTypes.length > 0 &&
            (!entry.ctx?.sourceType ||
              !filters.resourceTypes.includes(entry.ctx.sourceType))
          ) {
            return false;
          }
          // Filter by text
          if (
            lowerCaseText &&
            !`${entry.message}${entry.ctx?.sourcePath}`
              .toLowerCase()
              .includes(lowerCaseText)
          ) {
            return false;
          }
          return true;
        });

        return {
          logs: filteredLogs,
          hiddenLogs: noVerboseLogsCount - filteredLogs.length,
        };
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
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree), simulator);
        return createExplorerItemFromConstructTreeNode(
          shakeTree(tree),
          simulator,
          nodeMap,
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
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree), simulator);
        const node = createExplorerItemFromConstructTreeNode(
          shakeTree(tree),
          simulator,
          nodeMap,
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
    "app.nodeBreadcrumbs": createProcedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const simulator = await ctx.simulator();
        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree), simulator);

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
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree), simulator);
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
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree), simulator);
        const node = nodeMap.get(path);
        if (!node) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Node was not found for path ${path}`,
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
          return connectionsBasicFilter(connection, nodeMap, !!showTests);
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
            hierarchichalRunningState: getHierarchichalRunningState(
              node.path,
              nodeMap,
            ),
          },
          inbound: connections
            .filter(({ target }) => {
              return isFoundInPath(node, nodeMap, target, true);
            })
            .map((connection) => {
              const node = nodeMap.get(connection.source)!;
              const attachToParent = node?.display?.hidden && node?.parent;
              const sourceNode = attachToParent
                ? nodeMap.get(node.parent)!
                : node;

              return {
                id: sourceNode.id,
                path: sourceNode.path,
                type: getResourceType(sourceNode, simulator),
                display: sourceNode.display,
              };
            })
            .filter(({ path }) => {
              return path !== node.path;
            }),
          outbound: connections
            .filter(({ source }) => {
              return isFoundInPath(node, nodeMap, source, true);
            })
            .map((connection) => {
              const node = nodeMap.get(connection.target)!;
              const attachToParent = node?.display?.hidden && node?.parent;
              const targetNode = attachToParent
                ? nodeMap.get(node.parent)!
                : node;

              return {
                id: targetNode.id,
                path: targetNode.path,
                type: getResourceType(targetNode, simulator),
                display: targetNode.display,
              };
            })
            .filter(({ path }) => {
              return path !== node.path;
            }),
        };
      }),
    "app.edgeMetadata": createProcedure
      .input(
        z.object({
          edgeId: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { edgeId } = input;
        const simulator = await ctx.simulator();

        const { tree } = simulator.tree().rawData();
        const nodeMap = buildConstructTreeNodeMap(shakeTree(tree), simulator);

        let [, sourcePath, _sourceInflight, , targetPath, targetInflight] =
          edgeId.match(/^(.+?)#(.*?)#(.*?)#(.+?)#(.*?)#(.*?)$/i) ?? [];

        targetPath = targetPath?.startsWith("#")
          ? targetPath.slice(1)
          : targetPath;

        const sourceNode = nodeMap.get(sourcePath);
        if (!sourceNode) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Could not find node for resource ${sourcePath}`,
          });
        }

        const targetNode = nodeMap.get(targetPath);
        if (!targetNode) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Could not find node for resource ${targetPath}`,
          });
        }

        return {
          source: {
            id: sourceNode.id,
            path: sourceNode.path,
            type: getResourceType(sourceNode, simulator),
            display: sourceNode.display,
          },
          target: {
            id: targetNode?.id ?? "",
            path: targetNode?.path ?? "",
            type: (targetNode && getResourceType(targetNode, simulator)) ?? "",
            display: targetNode.display,
          },
          inflights: targetInflight
            ? [
                {
                  name: targetInflight,
                },
              ]
            : [],
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
    "app.map": createProcedure.query(async ({ ctx }) => {
      const simulator = await ctx.simulator();

      const { tree } = simulator.tree().rawData();
      const connections = simulator.connections();
      const nodeMap = buildConstructTreeNodeMap(shakeTree(tree), simulator);

      const enrichTreeNode = (node: ConstructTreeNode): MapItem => {
        const children: Record<string, MapItem> | undefined = node.children
          ? {}
          : undefined;
        if (children) {
          for (const [childId, child] of Object.entries(node.children ?? {})) {
            children[childId] = enrichTreeNode(child);
          }
        }
        return {
          ...node,
          hierarchichalRunningState: getHierarchichalRunningState(
            node.path,
            nodeMap,
          ),
          children,
        } as MapItem;
      };

      return {
        tree: enrichTreeNode(tree),
        connections,
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

    "app.getResourceUI": createProcedure
      .input(
        z.object({
          resourcePath: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const simulator = await ctx.simulator();
        const ui = simulator.getResourceUI(input.resourcePath);
        return ui as Array<UIComponent>;
      }),

    "app.analytics": createProcedure.query(async ({ ctx }) => {
      const requireSignIn = (await ctx.requireSignIn?.()) ?? false;
      if (requireSignIn) {
        ctx.analytics?.track("console_sign_in_shown");
      }
      return {
        anonymousId: ctx.analyticsAnonymousId,
        requireSignIn,
      };
    }),

    "app.analytics.signInClicked": createProcedure.mutation(async ({ ctx }) => {
      ctx.analytics?.track("console_sign_in_clicked");
      return {};
    }),

    "app.analytics.notifySignedIn": createProcedure.mutation(
      async ({ ctx }) => {
        ctx.analytics?.track("console_sign_in_completed");
        await ctx.notifySignedIn?.();
      },
    ),

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
  nodeMap: ConstructTreeNodeMap,
  showTests = false,
  includeHiddens = false,
): ExplorerItem {
  const cloudResourceType = node.constructInfo?.fqn?.split(".").at(-1);

  const label =
    node.display?.title === cloudResourceType
      ? node.id
      : node.display?.title ?? node.id;

  return {
    id: node.path,
    label,
    type: getResourceType(node, simulator),
    display: node.display,
    hierarchichalRunningState: getHierarchichalRunningState(node.path, nodeMap),
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
              nodeMap,
              showTests,
              includeHiddens,
            ),
          )
      : undefined,
  };
}

export interface MapEdge {
  id: string;
  source: string;
  target: string;
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

const connectionsBasicFilter = (
  connection: NodeConnection,
  nodeMap: ConstructTreeNodeMap,
  showTests: boolean,
) => {
  const sourceNode = nodeMap.get(connection.source);
  if (!sourceNode) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Could not find node for resource ${connection.source}`,
    });
  }

  const targetNode = nodeMap.get(connection.target);
  if (!targetNode) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Could not find node for resource ${connection.target}`,
    });
  }

  // Hide self loops.
  if (sourceNode.path === targetNode.path) {
    return false;
  }

  // Hide connections that go from a node to a parent.
  if (sourceNode.path.startsWith(`${targetNode.path}/`)) {
    return false;
  }

  if (targetNode.display?.hidden && targetNode.parent === "root") {
    return false;
  }

  if (
    !showTests &&
    (matchTest(sourceNode.path) || matchTest(targetNode.path))
  ) {
    return false;
  }

  return true;
};

const isFoundInPath = (
  node: Node,
  nodeMap: ConstructTreeNodeMap,
  pathToFind: string,
  tryHiddenChildren = true,
) => {
  const possiblePaths = [
    node.path,
    ...(tryHiddenChildren
      ? node.children.map((c) => {
          const child = nodeMap.get(c);
          return (child?.display?.hidden && child?.path) ?? "";
        })
      : []),
  ];
  return possiblePaths.includes(pathToFind);
};

const getVisualNodePath = (
  originalNodePath: string,
  nodeMap: ConstructTreeNodeMap,
): string => {
  const originalNode = nodeMap.get(originalNodePath);
  const attachToParent = originalNode?.display?.hidden && originalNode.parent;
  return attachToParent ? originalNode.parent! : originalNodePath;
};
