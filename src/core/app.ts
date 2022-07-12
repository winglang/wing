import {
  existsSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { isAbsolute, join } from "path";
import { Construct, IConstruct } from "constructs";
import { FileBase } from "../fs";

export interface AppProps {
  /**
   * The path to a state file which will track all synthesized files. If a
   * statefile is not specified, we won't be able to remove extrenous files.
   */
  readonly stateFile?: string;

  /**
   * The root output directory of the app.
   * @default "."
   */
  readonly outdir?: string;
}

export class App extends Construct {
  public readonly stateFile?: string;
  public readonly outdir: string;

  constructor(props: AppProps = {}) {
    super(undefined as any, "App");

    this.outdir = props.outdir ?? ".";

    if (props.stateFile) {
      this.stateFile = isAbsolute(props.stateFile)
        ? props.stateFile
        : join(this.outdir, props.stateFile);
    }
  }

  public synth() {
    const oldFiles = this.readStateFile();
    const newFiles = new Set<string>();
    const isFile = (c: IConstruct): c is FileBase => c instanceof FileBase;

    for (const child of this.node.findAll().filter(isFile)) {
      const filePath = child.filePath;
      console.error(`${filePath}: updated`);
      child.save(this.outdir);

      oldFiles.delete(filePath);
      newFiles.add(filePath);
    }

    this.saveStateFile(newFiles);

    for (const filePath of oldFiles) {
      console.error(`${filePath}: deleted`);
      rmSync(join(this.outdir, filePath));
    }
  }

  /**
   * If a state file is defined, reads it and returns the list of files that
   * this app manages.
   */
  private readStateFile(): Set<string> {
    if (!this.stateFile) {
      return new Set();
    }

    if (!existsSync(this.stateFile)) {
      return new Set();
    }
    const files = readFileSync(this.stateFile, "utf-8").split("\n");
    return new Set(files);
  }

  /**
   * If a state file is defined, stores the list of files under management in that file.
   * @param files List of file paths (relative)
   */
  private saveStateFile(files: Set<string>) {
    if (!this.stateFile) {
      return;
    }
    if (files.size === 0) {
      if (existsSync(this.stateFile)) {
        unlinkSync(this.stateFile);
      }
      return;
    }
    writeFileSync(this.stateFile, Array.from(files).join("\n"));
  }
}
