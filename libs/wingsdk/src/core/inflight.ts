import { Construct } from "constructs";
import { createHash } from "crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, join } from "path";
import { makeHandler } from "./internal";
import { Connection, Display, IInflightHost, IResource } from "./resource";
import { TreeInspector } from "./tree";

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
 * Props for `Inflight`.
 */
export interface InflightProps {
  /**
   * Reference to the inflight code. Only JavaScript code is currently
   * supported.
   *
   * The JavaScript code needs be in the form `async handle(event) { ... }`, and
   * all references to resources must be made through `this.<resource>`.
   */
  readonly code: Code;

  /**
   * Data and resource binding information.
   * @default - no bindings
   */
  readonly bindings?: InflightBindings;
}

/**
 * Represents a unit of application code that can be executed by a cloud
 * resource. In practice, it's a resource with one inflight method named
 * "handle".
 *
 * @deprecated use an interface modeling the specific inflight behavior
 * such as `cloud.IFunctionHandler`
 */
export class Inflight extends Construct implements IResource {
  /** @internal */
  public _connections: Connection[] = []; // thrown away

  /**
   * Information on how to display a resource in the UI.
   */
  public readonly display = new Display({ hidden: true });

  constructor(scope: Construct, id: string, props: InflightProps) {
    super(null as any, ""); // thrown away

    if (props.code.language !== Language.NODE_JS) {
      throw new Error("Only Node.js code is supported");
    }

    return makeHandler(scope, id, props.code.text, props.bindings ?? {});
  }
  /** @internal */
  public _bind(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  public _inspect(_inspector: TreeInspector): void {
    throw new Error("Method not implemented.");
  }
}

/**
 * A resource binding.
 */
export interface InflightResourceBinding {
  /**
   * The resource.
   */
  readonly resource: IResource;

  /**
   * The list of operations used on the resource.
   */
  readonly ops: string[];
}

/**
 * Inflight bindings.
 */
export interface InflightBindings {
  /**
   * Resources being referenced by the inflight (key is the symbol).
   */
  readonly resources?: Record<string, InflightResourceBinding>;

  /**
   * Immutable data being referenced by the inflight (key is the symbol);
   */
  readonly data?: Record<string, any>;
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
