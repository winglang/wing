import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { isAbsolute, dirname, join } from "path";
import { Construct, IConstruct } from "constructs";
import { IApp } from "./app";
import { CaptureMetadata, Code, NodeJsCode } from "./inflight";
import { Resource } from "./resource";

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

/**
 * Props for `Files`.
 */
export interface FilesProps {
  /**
   * The app with files to synthesize.
   */
  readonly app: IApp;

  /**
   * The path to a state file which will track all synthesized files. If a
   * statefile is not specified, we won't be able to remove extraneous files.
   * @default - no state file
   */
  readonly stateFile?: string;
}

/**
 * Handles the synthesis of files.
 */
export class Files {
  /**
   * The path to a state file which will track all synthesized files.
   */
  public readonly stateFile?: string;
  private readonly app: IApp;
  constructor(props: FilesProps) {
    this.app = props.app;
    if (props.stateFile) {
      this.stateFile = isAbsolute(props.stateFile)
        ? props.stateFile
        : join(this.app.outdir, props.stateFile);
    }
  }

  /**
   * Synthesize the app into the output directory. The artifact produced
   * depends on what synthesizer was used.
   *
   * @param outdir The output directory, if not specified, the app's outdir will be used.
   */
  public synth(outdir?: string) {
    const oldFiles = this.readStateFile();
    const newFiles = new Set<string>();
    const isFile = (c: IConstruct): c is FileBase => c instanceof FileBase;
    if (!outdir) {
      outdir = this.app.outdir;
    }

    for (const child of this.app.node.findAll().filter(isFile)) {
      const filePath = child.filePath;
      child.save(outdir);

      oldFiles.delete(filePath);
      newFiles.add(filePath);
    }

    this.saveStateFile(newFiles);

    for (const filePath of oldFiles) {
      rmSync(join(outdir, filePath));
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
