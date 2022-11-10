import { Construct } from "constructs";
import { FileBase } from "./file-base";

/**
 * Props for `TextFile`.
 */
export interface TextFileProps {
  /**
   * The lines of text that will be serialized into the file during synthesis.
   * They will be joined with newline characters.
   *
   * @default []
   */
  readonly lines?: string[];
}

/**
 * Represents a text file that should be synthesized in the app's outdir.
 */
export class TextFile extends FileBase {
  private readonly lines: string[];

  constructor(
    scope: Construct,
    id: string,
    filePath: string,
    props?: TextFileProps
  ) {
    super(scope, id, filePath);

    this.lines = props?.lines ?? [];
  }

  /**
   * Append a line to the text file's contents.
   */
  public addLine(line: string) {
    this.lines.push(line);
  }

  protected render() {
    return this.lines.join("\n");
  }
}
