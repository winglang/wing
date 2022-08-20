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
import { Synthesizer } from "./synth";

export interface AppProps {
  /**
   * The path to a state file which will track all synthesized files. If a
   * statefile is not specified, we won't be able to remove extrenous files.
   */
  readonly stateFile?: string;

  /**
   * A synthesizer that handles setting up a CDK framework and registering a
   * polycon factory.
   */
  readonly synthesizer: Synthesizer;
}

export class App extends Construct {
  public readonly stateFile?: string;
  public readonly outdir: string;
  public readonly root: Construct;
  private readonly synthesizer: Synthesizer;

  constructor(props: AppProps) {
    super(undefined as any, "App");

    this.synthesizer = props.synthesizer;
    this.root = this.synthesizer.root;
    this.outdir = this.synthesizer.outdir;

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
      child.save(this.outdir);

      oldFiles.delete(filePath);
      newFiles.add(filePath);
    }

    this.saveStateFile(newFiles);

    for (const filePath of oldFiles) {
      rmSync(join(this.outdir, filePath));
    }

    this.synthesizer.synth();
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
