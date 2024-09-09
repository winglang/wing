import * as reflect from "jsii-reflect";
import { MarkdownDocument } from "../render/markdown-doc";
import { Transpile } from "../transpile/transpile";

/**
 * Render the user defined readme of a jsii library.
 */
export class Readme {
  private readonly readme?: string;

  constructor(
    transpile: Transpile,
    assembly: reflect.Assembly,
    submodule?: reflect.Submodule
  ) {
    const readme = submodule ? submodule.readme : assembly.readme;
    this.readme = readme ? transpile.readme(readme.markdown) : undefined;
  }

  /**
   * Generate markdown.
   */
  public render(): MarkdownDocument {
    if (!this.readme) {
      return MarkdownDocument.EMPTY;
    }

    const md = new MarkdownDocument();
    if (this.readme) {
      md.lines(this.readme);
    }
    return md;
  }
}
