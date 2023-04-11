import { NodeDisplay } from "./constructTreeNodeMap.js";

/**
 * A node in the construct tree.
 */
export interface ConstructTreeNode {
  readonly id: string;
  readonly path: string;
  readonly children?: { [key: string]: ConstructTreeNode };
  readonly attributes?: { [key: string]: any };
  readonly display?: NodeDisplay;

  /**
   * Information on the construct class that led to this node, if available
   */
  readonly constructInfo?: ConstructInfo;
}

/**
 * The construct tree.
 */
export interface ConstructTree {
  readonly version: string;
  readonly tree: ConstructTreeNode;
}

/**
 * Source information on a construct (class fqn and version)
 */
export interface ConstructInfo {
  /**
   * Fully qualified class name.
   */
  readonly fqn: string;

  /**
   * Version of the module.
   */
  readonly version: string;
}
