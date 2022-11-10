import { Construct } from "constructs";
import { FileBase } from "./file-base";

/**
 * Props for `JsonFile`.
 */
export interface JsonFileProps {
  /**
   * The object that will be serialized into the file during synthesis.
   */
  readonly obj: any;
}

/**
 * Represents a text file that should be synthesized in the app's outdir.
 */
export class JsonFile extends FileBase {
  private readonly obj: any;

  constructor(
    scope: Construct,
    id: string,
    filePath: string,
    props: JsonFileProps
  ) {
    super(scope, id, filePath);

    this.obj = props.obj;
  }

  protected render() {
    return JSON.stringify(this.obj, undefined, 2);
  }
}
