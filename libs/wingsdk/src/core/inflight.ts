import { createHash } from "crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, join, resolve } from "path";
import { IConstruct } from "constructs";
import * as esbuild from "esbuild-wasm";
import { PREBUNDLE_SYMBOL } from "./internal";
import { Resource } from "./resource";

/**
 * Represents a policy containing information about a set of resources and the
 * methods that can be called on them.
 */
export class Policy {
  private _policy: PolicyFragment | undefined;
  private readonly _children: Map<string, Policy>;

  constructor(fragments: { [path: string]: PolicyFragment } = {}) {
    this._children = new Map();
    for (const [path, fragment] of Object.entries(fragments)) {
      this.add(path, fragment);
    }
  }

  /**
   * Find the policy relevant for a named resource, or return an
   * empty policy instance if there is no policy for it.
   */
  public lookup(path: string): Policy {
    if (path.startsWith("this.")) {
      path = path.substring(5);
    }
    const parts = path.split(".");
    let curr: Policy = this;
    for (const part of parts) {
      if (!curr._children.has(part)) {
        return new Policy();
      }
      curr = curr._children.get(part)!;
    }
    return curr;
  }

  public calls(method: string): boolean {
    if (this._policy?.methods?.includes(method)) {
      return true;
    }
    return false;
  }

  private add(path: string, fragment: PolicyFragment) {
    const parts = path.split(".");
    let curr: Policy = this;
    for (const part of parts) {
      if (!curr._children.has(part)) {
        const policies = new Policy();
        curr._children.set(part, policies);
      }
      curr = curr._children.get(part)!;
    }
    if (curr._policy) {
      throw new Error(
        `A policy fragment for ${path} already exists, found ${JSON.stringify(
          curr._policy
        )}`
      );
    }
    curr._policy = fragment;
  }

  public toJSON(): any {
    return {
      policy: this._policy,
      children: Object.fromEntries(
        Array.from(this._children.entries()).map(([k, v]): any => [
          k,
          v.toJSON(),
        ])
      ),
    };
  }
}

export interface PolicyFragment {
  readonly methods?: string[];
}

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
  _bind(host: Resource, policies: Policy): Code;
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
   * Binding information. During runtime, a map containing all bound resources
   * will be passed as the first argument of the entrypoint function.
   *
   * Each key here will be the key for the final value in the map.
   *
   * @default - no bindings
   */
  readonly bindings?: { [name: string]: ICapturableConstruct };

  readonly policies?: { [name: string]: PolicyFragment };
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
   * Binding information. During runtime, a map containing all bound values
   * will be passed as the first argument of the entrypoint function.
   *
   * Each key here will be the key for the final value in the map.
   */
  public readonly bindings: { [name: string]: ICapturableConstruct };

  private readonly policies: Policy;

  constructor(props: InflightProps) {
    this.code = props.code;
    this.entrypoint = props.entrypoint;
    this.bindings = props.bindings ?? {};
    this.policies = new Policy(props.policies ?? {});
  }

  /**
   * Bundle this inflight process so that it can be used in the inflight host.
   *
   * Returns the path to a JavaScript file that has been rewritten to include
   * all dependencies and bound resources. The file is isolated in its own
   * directory so that it can be zipped up and uploaded to cloud providers.
   *
   * High level implementation:
   * 1. Read the file (let's say its path is path/to/foo.js)
   * 2. Create a new javascript file named path/to/foo.prebundle.js, including a
   *    map of all resource clients, a new handler that calls the original
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
    for (const [name, client] of Object.entries(options.resourceClients)) {
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
   * Resolve this Inflight's bindings into a map of resource clients.
   */
  public makeClients(host: Resource): Record<string, Code> {
    const clients: Record<string, Code> = {};
    for (const [name, binding] of Object.entries(this.bindings)) {
      clients[name] = binding._bind(host, this.policies.lookup(name));
    }
    return clients;
  }
}

/**
 * Options for `Inflight.bundle`.
 */
export interface InflightBundleOptions {
  /**
   * Associate the inflight bundle with a given host resource.
   */
  readonly host?: IConstruct;

  /**
   * A map of resource clients that can be bundled with the Inflight's code.
   */
  readonly resourceClients: Record<string, Code>;

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
