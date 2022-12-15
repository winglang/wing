import { createHash } from "crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, join } from "path";
import { IConstruct } from "constructs";
import { OperationPolicy } from "./policies";
import { Resource } from "./resource";

/**
 * Represents something that is capturable by an Inflight.
 */
export interface ICapturable {
  /**
   * Binds the resource to the host so that it can be used by inflight code.
   * Returns a reference to the code that can be used to instantiate the
   * resource in the inflight code.
   *
   * @internal
   */
  _bind(host: Resource, policies: OperationPolicy): Code;
}

/**
 * Represents a construct that is capturable by an Inflight.
 */
export interface ICapturableConstruct extends ICapturable, IConstruct {}

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

  /**
   * Generate a hash of the code contents.
   */
  public get hash(): string {
    return createHash("sha512").update(this.text).digest("hex");
  }
}

/**
 * The language of a piece of code.
 */
export enum Language {
  /** Node.js */
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
    // TODO: can we use a relative path here?
    // TODO: can we avoid writing to file until actually necessary?
    // TODO: can we share the temp dir between Code objects?
    const tempdir = mkdtempSync(join(tmpdir(), "wingsdk."));
    const file = join(tempdir, "index.js");
    writeFileSync(file, text);
    return new NodeJsCode(file);
  }

  public readonly language = Language.NODE_JS;
  public readonly path: string;

  private constructor(path: string) {
    super();
    this.path = path;
  }
}

/**
 * A resource that is used by an Inflight and the methods that are called on it.
 */
export interface InflightBinding {
  /**
   * The resource that is used by the Inflight.
   */
  readonly resource: ICapturableConstruct;

  /**
   * The methods that are called on the resource.
   */
  readonly methods: string[];
}

/**
 * Utility class with functions about inflight clients.
 */
export class InflightClient {
  /**
   * Creates a `Code` instance with code for creating an inflight client.
   */
  public static for(
    filename: string,
    clientClass: string,
    args: string[]
  ): Code {
    const inflightDir = dirname(filename);
    const inflightFile = basename(filename).split(".")[0] + ".inflight";
    return NodeJsCode.fromInline(
      `new (require("${require.resolve(
        `${inflightDir}/${inflightFile}`
      )}")).${clientClass}(${args.join(", ")})`
    );
  }
  private constructor() {}
}
