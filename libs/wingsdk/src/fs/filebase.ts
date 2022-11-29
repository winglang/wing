import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code, NodeJsCode } from "../core/inflight";
import { Resource } from "../core/resource";

/**
 * Represents a file to be synthesized in the app's output directory.
 */
export abstract class FileBase extends Resource {
  /**
   * The file's relative path to the output directory.
   */
  public readonly filePath: string;

  /**
   * Indicates that generated files are not stateful. They can always be
   * regenerated from their definition.
   */
  public readonly stateful = false;

  /**
   * Defines a file
   * @param scope construct scope
   * @param id construct id
   * @param filePath relative file path
   * @param props initialization props
   */
  constructor(scope: Construct, id: string, filePath: string) {
    super(scope, id);
    this.filePath = filePath;
  }

  /**
   * Render the contents of the file and save it to the user's file system.
   */
  public save(outdir: string) {
    const data = this.render();
    const outpath = join(outdir, this.filePath);
    mkdirSync(dirname(outpath), { recursive: true });
    writeFileSync(outpath, data);
  }

  /**
   * Returns the contents of the file to save.
   */
  protected abstract render(): string;

  /**
   * @internal
   */
  public _bind(captureScope: IConstruct, metadata: CaptureMetadata): Code {
    captureScope;
    metadata;
    return NodeJsCode.fromInline(JSON.stringify(this.render()));
  }
}
