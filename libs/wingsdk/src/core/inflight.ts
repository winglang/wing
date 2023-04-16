import { createHash } from "crypto";
import { readFileSync } from "fs";
import { basename } from "path";
import { Construct } from "constructs";
import { makeHandler } from "./internal";
import { TreeInspector } from "./tree";
import { Connection, Display, IInflightHost, IResource } from "../std/resource";
import { normalPath } from "../util";

/**
 * Reference to a piece of code.
 */
export abstract class Code {
  /**
   * The language of the code.
   */
  public abstract readonly language: Language;

  /**
   * The code.
   */
  public abstract readonly text: string;

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
    return new NodeJsCode(readFileSync(path, "utf-8"));
  }

  /**
   * Reference code directly from a string.
   */
  public static fromInline(text: string) {
    return new NodeJsCode(text);
  }

  public readonly language = Language.NODE_JS;
  public readonly text: string;

  private constructor(text: string) {
    super();
    this.text = text;
  }
}

export type InflightBindings = Record<string, InflightBinding>;

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
 */
export class Inflight extends Construct implements IResource {
  /** @internal */
  public _connections: Connection[] = []; // thrown away

  /**
   * Information on how to display a resource in the UI.
   */
  public readonly display = new Display();

  constructor(scope: Construct, id: string, props: InflightProps) {
    super(null as any, ""); // thrown away

    this.display.hidden = true;
    this.display.title = "Inflight";
    this.display.description = "An inflight resource";

    if (props.code.language !== Language.NODE_JS) {
      throw new Error("Only Node.js code is supported");
    }

    return makeHandler(scope, id, props.code.text, props.bindings, {
      hidden: this.display.hidden,
      title: this.display.title,
      description: this.display.description,
    });
  }
  /** @internal */
  public _bind(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  public _registerBind(_host: IInflightHost, _ops: string[]): void {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  public _preSynthesize(): void {
    throw new Error("Method not implemented.");
  }
  /** @internal */
  public _inspect(_inspector: TreeInspector): void {
    throw new Error("Method not implemented.");
  }
}

/**
 * An inflight binding.
 */
export interface InflightBinding {
  /**
   * The resource or capturable value.
   */
  readonly obj: any;

  /**
   * The list of operations used on the resource.
   */
  readonly ops?: string[];
}

/**
 * Utility class with functions about inflight clients.
 */
export class InflightClient {
  /**
   * Creates a `Code` instance with code for creating an inflight client.
   */
  public static for(
    dirname: string,
    filename: string,
    clientClass: string,
    args: string[]
  ): Code {
    const inflightDir = dirname;
    const inflightFile = basename(filename).split(".")[0] + ".inflight";
    return NodeJsCode.fromInline(
      `new (require("${normalPath(
        `${inflightDir}/${inflightFile}`
      )}")).${clientClass}(${args.join(", ")})`
    );
  }
  private constructor() {}
}
