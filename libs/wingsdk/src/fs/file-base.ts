import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { Construct } from "constructs";

/**
 * Represents a file to be synthesized in the app's output directory.
 */
export abstract class FileBase extends Construct {
  /**
   * The file's relative path to the output directory.
   */
  public readonly filePath: string;

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
}
