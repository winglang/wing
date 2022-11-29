import {
  existsSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { isAbsolute, join } from "path";
import { IConstruct } from "constructs";
import { FileBase } from "../fs/filebase";
import { IApp } from "./app";

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
