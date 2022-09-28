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

/**
 * Props for `App`.
 */
export interface AppProps {
  /**
   * The path to a state file which will track all synthesized files. If a
   * statefile is not specified, we won't be able to remove extrenous files.
   * @default - no state file
   */
  readonly stateFile?: string;

  /**
   * A synthesizer that handles setting up a CDK framework and registering a
   * polycon factory.
   */
  readonly synthesizer: Synthesizer;
}

/**
 * The root construct for all Wing applications.
 */
export class App extends Construct {
  /**
   * The path to a state file which will track all synthesized files.
   */
  public readonly stateFile?: string;

  /**
   * Directory where all artifacts will be synthesized to.
   */
  public readonly outdir: string;

  /**
   * The root construct which all constructs should be added to. This is
   * exposed for compatibility with different CDK frameworks that require
   * creating their own `App` construct with a different root.
   */
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

  /**
   * Synthesize the app into the output directory. The artifact produced
   * depends on what synthesizer was used.
   */
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
