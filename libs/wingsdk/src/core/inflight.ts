import { createHash } from "crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, join, resolve } from "path";
import { IConstruct } from "constructs";
import * as esbuild from "esbuild-wasm";
import { PREBUNDLE_SYMBOL } from "./internal";
import { Resource } from "./resource";

export interface Policies {
  [path: string]: Policy | undefined;
}

export interface Policy {
  /**
   * Which methods are called on the resource.
   */
  readonly methods: string[];
}

/**
 * Represents something that is capturable by an Inflight.
 */
export interface ICapturable {
  /**
   * Captures the resource so that it can be referenced inside an Inflight
   * executed in the given scope.
   *
   * @internal
   */
  _bind(host: Resource, policies: Policies): Code;
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
 * Options for `Inflight`.
 */
export interface InflightProps {
  /**
   * Reference to code containing the entrypoint function.
   */
  readonly code: Code;

  /**
   * Name of the exported function to run.
   *
   * @example "exports.handler"
   */
  readonly entrypoint: string;

  /**
   * Capture information. During runtime, a map containing all captured resources
   * will be passed as the first argument of the entrypoint function.
   *
   * Each key here will be the key for the final value in the map.
   * @default - No captures
   */
  readonly captures?: { [name: string]: ICapturableConstruct };

  readonly policies?: Policies;
}

/**
 * Represents a unit of application code that can be executed by a cloud
 * resource.
 */
export class Inflight {
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
  public readonly captures: { [name: string]: ICapturableConstruct };

  public readonly policies: Policies;

  constructor(props: InflightProps) {
    this.code = props.code;
    this.entrypoint = props.entrypoint;
    this.captures = props.captures ?? {};
    this.policies = props.policies ?? {};
  }

  /**
   * Bundle this inflight process so that it can be used in the given capture
   * scope.
   *
   * Returns the path to a JavaScript file that has been rewritten to include
   * all dependencies and captured values or clients. The file is isolated in
   * its own directory so that it can be zipped up and uploaded to cloud
   * providers.
   *
   * High level implementation:
   * 1. Read the file (let's say its path is path/to/foo.js)
   * 2. Create a new javascript file named path/to/foo.prebundle.js, including a
   *    map of all capture clients, a new handler that calls the original
   *    handler with the clients passed in, and a copy of the user's code from
   *    path/to/foo.js.
   * 3. Use esbuild to bundle all dependencies, outputting the result to
   *    path/to/foo.js.bundle/index.js.
   */
  public bundle(options: InflightBundleOptions): Code {
    const lines = new Array<string>();

    const originalCode = this.code;

    const absolutePath = resolve(originalCode.path);
    const workdir = dirname(absolutePath);

    lines.push("const $cap = {};");
    for (const [name, client] of Object.entries(options.captureClients)) {
      lines.push(`$cap["${name}"] = ${client.text};`);
    }
    lines.push();
    lines.push(originalCode.text);
    lines.push();
    lines.push("exports.handler = async function(event) {");
    lines.push(`  return await ${this.entrypoint}($cap, event);`);
    lines.push("};");

    const contents = lines.join("\n");

    // expose the inflight code before esbuild inlines dependencies, for unit
    // testing purposes... ugly
    if (options.host) {
      (options.host as any)[PREBUNDLE_SYMBOL] = NodeJsCode.fromInline(contents);
    }

    const tempdir = mkdtemp("wingsdk.");
    const outfile = join(tempdir, "index.js");

    esbuild.buildSync({
      bundle: true,
      stdin: {
        contents,
        resolveDir: workdir,
        sourcefile: "original.js",
      },
      target: "node16",
      platform: "node",
      absWorkingDir: workdir,
      outfile,
      minify: false,
      external: options.external ?? [],
    });

    return NodeJsCode.fromFile(outfile);
  }

  /**
   * Resolve this inflight's captured objects into a map of clients that be
   * safely referenced at runtime.
   */
  public makeClients(host: Resource): Record<string, Code> {
    const clients: Record<string, Code> = {};
    for (const [name, capture] of Object.entries(this.captures)) {
      clients[name] = capture._bind(host, this.policies);
    }
    return clients;
  }
}

/**
 * Options for `Inflight.bundle`.
 */
export interface InflightBundleOptions {
  /**
   * Associate the inflight bundle with a given capture scope.
   */
  readonly host?: IConstruct;
  /**
   * A map of capture clients that can be bundled with the Inflight's code.
   */
  readonly captureClients: Record<string, Code>;
  /**
   * List of dependencies to exclude from the bundle.
   */
  readonly external?: string[];
}

function mkdtemp(prefix: string): string {
  return mkdtempSync(join(tmpdir(), prefix));
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
