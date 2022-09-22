import { Construct } from "constructs";
import { FileBase } from "./file-base";

export interface TextFileProps {
  readonly lines?: string[];
}

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

  public addLine(line: string) {
    this.lines.push(line);
  }

  protected render() {
    return this.lines.join("\n");
  }
}
