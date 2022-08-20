import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

/**
 * Capture information. A capture is a reference from a Process to a
 * construction-time object or value.
 */
export interface Capture {
  /**
   * The captured object
   */
  readonly obj: any;

  /**
   * Which methods are called on the captured object
   */
  readonly methods?: string[];
}

/**
 * Represents something that is capturable.
 */
export interface ICapturable {
  /**
   * Captures the resource for a given consumer so that it can be used
   * in a Process.
   */
  capture(consumer: any, capture: Capture): Code;
}

/**
 * Reference to a piece of code.
 */
export abstract class Code {
  /**
   * The language of the code.
   */
  public abstract readonly language: Language;

  /**
   * A path to the code in the user's file system that can be referenced
   * for bundling purposes.
   */
  public abstract readonly path: string;

  /**
   * The code contents.
   */
  public get text(): string {
    return readFileSync(this.path, "utf-8");
  }
}

/**
 * The language of a piece of code.
 */
export enum Language {
  NODE_JS = "nodejs",
}

/**
 * Reference to a piece of Node.js code.
 */
export class NodeJsCode extends Code {
  /**
   * Reference code from a file path.
   */
  public static fromFile(path: string) {
    return new NodeJsCode(path);
  }

  /**
   * Reference code directly from a string.
   */
  public static fromInline(text: string) {
    const tempdir = mkdtempSync(join(tmpdir(), "polycons-"));
    const file = join(tempdir, "index.js");
    writeFileSync(file, text);
    return new NodeJsCode(file);
  }

  public readonly language = Language.NODE_JS;

  private constructor(public readonly path: string) {
    super();
  }
}

/**
 * Options for `Process`.
 */
export interface ProcessProps {
  /**
   * Reference to code containing the entrypoint function.
   */
  readonly code: Code;
  /**
   * Name of the exported function which will be run.
   */
  readonly entrypoint: string;
  /**
   * Capture information. During runtime, a map containing all captured values
   * will be passed as the first argument of the entrypoint function.
   *
   * Each key here will be the key for the final value in the map.
   */
  readonly captures?: { [name: string]: Capture };
}

/**
 * Runtime code with a named entrypoint. Typically this represents code
 * that exists to be run outside of the scope of a `constructs` application.
 */
export class Process {
  /**
   * Reference to code containing the entrypoint function.
   */
  public readonly code: Code;
  /**
   * Name of the exported function which will be run.
   */
  public readonly entrypoint: string;
  /**
   * Capture information. During runtime, a map containing all captured values
   * will be passed as the first argument of the entrypoint function.
   *
   * Each key here will be the key for the final value in the map.
   */
  public readonly captures: { [name: string]: Capture };

  constructor(props: ProcessProps) {
    this.code = props.code;
    this.entrypoint = props.entrypoint;
    this.captures = props.captures ?? {};
  }
}
