import { ResourceSchema } from "@monadahq/wing-local-schema";

export interface Node {
  id: string;
  path: string;
  type: string;
  parent: string | undefined;
  constructInfo?: Record<string, string>;
  attributes?: Record<string, any>;
  children: string[];
}

export interface NodeMap {
  [path: string]: Node;
}

function visit(
  parent: ResourceSchema | undefined,
  node: ResourceSchema,
  callback: (parent: ResourceSchema | undefined, child: ResourceSchema) => void,
) {
  callback(parent, node);

  if (node.type === "constructs.Construct") {
    for (const child of Object.values(node.children ?? {})) {
      visit(node, child, callback);
    }
  }
}

export function buildNodeMap(node: ResourceSchema): NodeMap {
  let nodeMap: NodeMap = {};

  visit(undefined, node, (parent, node) => {
    const newNode = {
      id: node.id,
      path: node.path,
      type: node.type,
      parent: parent?.path,
      children:
        node.type === "constructs.Construct"
          ? Object.values(node.children ?? {}).map((child) => child.path)
          : [],
      attributes: node.props ?? {},
    };

    if (!parent) {
      nodeMap = {
        ...nodeMap,
        [""]: newNode,
      };
    }

    nodeMap = {
      ...nodeMap,
      [node.path]: newNode,
    };
  });

  return nodeMap;
}
