import { ResourceSchema } from "@monadahq/wing-local-schema";
import { useEffect, useState } from "react";

export interface Node {
  id: string;
  path: string;
  type: ResourceSchema["type"];
  parent: string | undefined;
  constructInfo?: Record<string, string>;
  attributes?: Record<string, any>;
  children: string[];
  schema: ResourceSchema;
}

export interface NodeRecord {
  [path: string]: Node;
}

export interface NodeMap {
  record: NodeRecord;
  find(path: string | undefined): Node | undefined;
  visitParents(path: string | undefined, callback: (node: Node) => void): void;
}

function visitResourceSchemaChildren(
  parent: ResourceSchema | undefined,
  node: ResourceSchema,
  callback: (parent: ResourceSchema | undefined, child: ResourceSchema) => void,
) {
  callback(parent, node);

  if (node.type === "constructs.Construct") {
    for (const child of Object.values(node.children ?? {})) {
      visitResourceSchemaChildren(node, child, callback);
    }
  }
}

export function buildNodeMapFromRecord(nodeRecord: NodeRecord): NodeMap {
  return {
    record: nodeRecord,
    find(path) {
      return path !== undefined ? nodeRecord[path] : undefined;
    },
    visitParents(path, callback) {
      let node = path !== undefined ? nodeRecord[path] : undefined;
      while (node) {
        callback(node);
        node = node.parent !== undefined ? nodeRecord[node.parent] : undefined;
      }
    },
  };
}

export function buildNodeMap(schema: ResourceSchema) {
  let nodeRecord: NodeRecord = {};

  visitResourceSchemaChildren(undefined, schema, (parent, node) => {
    const newNode: Node = {
      id: node.id,
      path: node.path,
      type: node.type,
      parent: parent?.path,
      children:
        node.type === "constructs.Construct"
          ? Object.values(node.children ?? {}).map((child) => child.path)
          : [],
      attributes: node.props ?? {},
      schema: node,
    };

    if (!parent) {
      nodeRecord = {
        ...nodeRecord,
        [""]: newNode,
      };
    }

    nodeRecord = {
      ...nodeRecord,
      [node.path]: newNode,
    };
  });

  return buildNodeMapFromRecord(nodeRecord);
}

export function useNodeMap(node: ResourceSchema | undefined) {
  const [nodeMap, setNodeMap] = useState<NodeMap>();

  useEffect(() => {
    setNodeMap(node ? buildNodeMap(node) : undefined);
  }, [node]);

  return nodeMap;
}
