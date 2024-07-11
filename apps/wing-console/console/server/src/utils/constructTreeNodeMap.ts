import type { ResourceRunningState } from "@winglang/sdk/lib/simulator/simulator.js";

import type { Simulator } from "../wingsdk.js";

import type { ConstructInfo, ConstructTreeNode } from "./construct-tree.js";

export interface NodeDisplay {
  title?: string;
  description?: string;
  sourceModule?: string;
  hidden?: boolean;
  color?: string;
  icon?: string;
  expanded?: boolean;
}

export interface NodeConnection {
  source: string;
  target: string;
  name: string;
}

export interface Node {
  id: string;
  path: string;
  parent: string | undefined;
  constructInfo: ConstructInfo | undefined;
  attributes: Record<string, any> | undefined;
  children: string[];
  display?: NodeDisplay;
  runningState?: ResourceRunningState | undefined;
}

export interface ConstructTreeNodeRecord {
  [path: string]: Node;
}

export interface ConstructTreeNodeMap {
  record: ConstructTreeNodeRecord;
  get(path: string | undefined): Node | undefined;
  getAll(paths: string[]): Node[];
  visitParents(path: string | undefined, callback: (node: Node) => void): void;
}

function visitChildren(
  parent: ConstructTreeNode | undefined,
  node: ConstructTreeNode,
  callback: (
    parent: ConstructTreeNode | undefined,
    child: ConstructTreeNode,
  ) => void,
) {
  callback(parent, node);

  for (const child of Object.values(node.children ?? {})) {
    visitChildren(node, child, callback);
  }
}

export function buildNodeMapFromRecord(
  nodeRecord: ConstructTreeNodeRecord,
): ConstructTreeNodeMap {
  return {
    record: nodeRecord,
    get(path) {
      return path === undefined ? undefined : nodeRecord[path];
    },
    getAll(paths) {
      return paths
        .map((path) => this.get(path))
        .filter((node): node is Node => node !== undefined);
    },
    visitParents(path, callback) {
      let node = path === undefined ? undefined : nodeRecord[path];
      while (node) {
        callback(node);
        node = node.parent === undefined ? undefined : nodeRecord[node.parent];
      }
    },
  };
}

export function buildConstructTreeNodeMap(
  node: ConstructTreeNode,
  simulator: Simulator,
) {
  let nodeRecord: ConstructTreeNodeRecord = {};

  visitChildren(undefined, node, (parent, node) => {
    const newNode: Node = {
      id: node.id,
      path: node.path || "",
      parent: parent?.path,
      children: Object.values(node.children ?? {}).map(
        (child) => child.path ?? "",
      ),
      attributes: node.attributes,
      constructInfo: node.constructInfo,
      display: node.display,
      runningState: simulator.tryGetResourceRunningState(node.path),
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
