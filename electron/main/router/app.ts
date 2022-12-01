import console from "electron-log";
import { z } from "zod";

import {
  buildConstructTreeNodeMap,
  Node,
} from "../utils/constructTreeNodeMap.js";
import { createRouter } from "../utils/createRouter.js";
import { ConstructTreeNode } from "../utils/createSimulator.js";
import { BaseResourceSchema, Simulator } from "../wingsdk.js";

export interface ExplorerItem {
  id: string;
  label: string;
  type?: string;
  childItems?: ExplorerItem[];
}

export const createAppRouter = () => {
  return createRouter()
    .query("app.logs", {
      async resolve({ ctx }) {
        return ctx.logs();
      },
    })
    .query("app.explorerTree", {
      async resolve({ ctx }) {
        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        return createExplorerItemFromConstructTreeNode(tree, simulator);
      },
    })
    .query("app.childRelationships", {
      input: z.object({
        path: z.string().optional(),
      }),
      async resolve({ input, ctx }) {
        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        const nodeMap = buildConstructTreeNodeMap(tree);

        const node = nodeMap.get(input.path);
        const children = nodeMap.getAll(node?.children ?? []);
        return children.map((node) => ({
          node: {
            id: node.id,
            path: node.path,
            type: getResourceType(node, simulator),
          },
          inbound:
            node.attributes?.["wing:resource:connections"]
              ?.filter(({ direction }) => direction === "inbound")
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
              ?.filter(({ direction }) => direction === "outbound")
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
      },
    })
    .query("app.nodeBreadcrumbs", {
      input: z.object({
        path: z.string().optional(),
      }),
      async resolve({ input, ctx }) {
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
      },
    })
    .query("app.node", {
      input: z.object({
        path: z.string().optional(),
      }),
      async resolve({ input, ctx }) {
        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const node = nodeMap.get(input.path);
        if (!node) {
          return;
        }

        const config = getResourceConfig(node.path, simulator);

        return {
          id: node.id,
          path: node.path,
          type: getResourceType(node, simulator),
          attributes: config?.attrs,
          props: config?.props,
        };
      },
    })
    .query("app.nodeMetadata", {
      input: z.object({
        path: z.string().optional(),
      }),
      async resolve({ input, ctx }) {
        const { path } = input;
        if (!path) {
          return;
        }

        const simulator = await ctx.simulator();
        const { tree } = await ctx.tree();
        const nodeMap = buildConstructTreeNodeMap(tree);
        const node = nodeMap.get(path);
        if (!node) {
          return;
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
              ?.filter(({ direction }) => direction === "inbound")
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
              ?.filter(({ direction }) => direction === "outbound")
              .map((connection) => {
                const node = nodeMap.get(connection.resource)!;
                return {
                  id: node.id,
                  path: node.path,
                  type: getResourceType(node, simulator),
                };
              }) ?? [],
        };
      },
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
    childItems: node.children
      ? Object.values(node.children).map((node) =>
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
    getResourceConfig(node.path, simulator)?.type ??
    node.constructInfo?.fqn ??
    "constructs.Construct"
  );
}
