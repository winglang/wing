import { useEffect, useState } from "react";

import { BaseResourceSchema } from "../../electron/main/wingsdk.js";

export interface Node {
  id: string;
  path: string;
  type: BaseResourceSchema["type"];
  parent: string | undefined;
  constructInfo?: Record<string, string>;
  attributes?: Record<string, any>;
  children: string[];
  inbound: string[];
  outbound: string[];
  schema: BaseResourceSchema;
}

export interface NodeRecord {
  [path: string]: Node;
}

export interface NodeMap {
  record: NodeRecord;
  find(path: string | undefined): Node | undefined;
  visitParents(path: string | undefined, callback: (node: Node) => void): void;
}

function visitBaseResourceSchemaChildren(
  parent: BaseResourceSchema | undefined,
  node: BaseResourceSchema,
  callback: (
    parent: BaseResourceSchema | undefined,
    child: BaseResourceSchema,
  ) => void,
) {
  callback(parent, node);

  for (const child of Object.values(node.children ?? {})) {
    visitBaseResourceSchemaChildren(node, child, callback);
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

export function buildNodeMap(schema: BaseResourceSchema) {
  let nodeRecord: NodeRecord = {};

  visitBaseResourceSchemaChildren(undefined, schema, (parent, node) => {
    const newNode: Node = {
      id: node.path || "",
      path: node.path || "",
      type: node.type,
      parent: parent?.path,
      children: Object.values(node.children ?? {}).map(
        (child) => child.path ?? "",
      ),
      attributes: node.props ?? {},
      outbound: node.outbound ?? [],
      inbound: node.inbound ?? [],
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
      [node.path || ""]: newNode,
    };
  });

  return buildNodeMapFromRecord(nodeRecord);
}

export function useNodeMap(node: BaseResourceSchema | undefined) {
  const [nodeMap, setNodeMap] = useState<NodeMap>();

  useEffect(() => {
    setNodeMap(node ? buildNodeMap(node) : undefined);
  }, [node]);

  return nodeMap;
}
