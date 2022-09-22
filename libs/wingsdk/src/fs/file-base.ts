import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { Construct } from "constructs";

export abstract class FileBase extends Construct {
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
