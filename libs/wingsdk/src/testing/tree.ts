import { ConstructTree } from "../core";

export class Tree {
  public constructor(private data: ConstructTree) {}

  /**
   * Returns the raw tree data.
   */
  public rawData(): ConstructTree {
    return this.data;
  }
}
