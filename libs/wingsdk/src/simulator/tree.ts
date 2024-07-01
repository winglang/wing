import { ConstructTree, ConstructTreeNode } from "../core";

/**
 * Tree metadata associated with a Wing application. Provides information
 * about resources and their relationships.
 */
export class Tree {
  public constructor(private data: ConstructTree) {}

  /**
   * Returns the raw tree data.
   */
  public rawData(): ConstructTree {
    return structuredClone(this.data);
  }

  /**
   * Returns the raw data for a specific construct node.
   */
  public rawDataForNode(path: string): ConstructTreeNode | undefined {
    const parts = path.split("/");
    parts.shift();
    let curr = this.rawData().tree;
    for (const part of parts) {
      const next = curr.children?.[part];
      if (!next) {
        return undefined;
      }
      curr = next;
    }
    return curr;
  }
}
