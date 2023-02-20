import { ConstructTree } from "../core";

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
    return this.data;
  }
}
