import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Construct } from "constructs";
import * as esbuild from "esbuild-wasm";
import { Polycons } from "polycons";
import { Code, IApp, Inflight, NodeJsCode, Resource } from "../core";
import { mkdtemp } from "../util";
import { Logger } from "./logger";

export const WEBAPP_TYPE = "wingsdk.cloud.WebApp";

/**
 * Props for `WebApp`.
 */
export interface WebAppProps {}

/**
 * Produces a .zip file that contains a client web application.
 */
export abstract class WebAppBase extends Resource {
  public readonly stateful = false;

  /**
   * The local path to the web application.
   */
  public readonly dist: string;

  constructor(
    scope: Construct,
    id: string,
    client: Inflight,
    props: WebAppProps = {}
  ) {
    super(scope, id);

    if (!scope) {
      this.dist = undefined as any;
      return;
    }

    props;

    const outdir = (this.node.root as IApp).outdir;

    client._bind(this, ["handle"]);

    const archive = join(outdir, "webapps", this.node.addr);
    mkdirSync(archive, { recursive: true });
    writeFileSync(
      join(archive, "index.html"),
      `<!DOCTYPE html>
      <html>
        <head>
          <title>${this.node.path}</title>
        </head>
        <body>
          <h1>${this.node.path}</h1>
          <script src="./client.js"></script>
        </body>
      </html>
    `
    );

    const bundle = readFileSync(bundleInflight(client));
    writeFileSync(
      join(archive, "client.js"),
      `
    const exports = {};

    ${bundle}

    exports.handler()
      .catch(e => console.log(e))
      .then(() => console.log("done"))
    `
    );

    this.dist = archive;
  }

  /**
   * @internal
   */
  public _toInflight(): Code {
    return NodeJsCode.fromInline("bla");
  }
}

/**
 * Represents a webapp.
 *
 * @inflight `@winglang/sdk.cloud.IWebAppClient`
 */
export class WebApp extends WebAppBase {
  constructor(
    scope: Construct,
    id: string,
    client: Inflight,
    props: WebAppProps = {}
  ) {
    super(null as any, id, client, props);
    return Polycons.newInstance(
      WEBAPP_TYPE,
      scope,
      id,
      client,
      props
    ) as WebApp;
  }

  /** @internal */
  public _toInflight(): Code {
    throw new Error("Method not implemented.");
  }
}

function bundleInflight(inflight: Inflight, logger?: Logger) {
  const inflightClient = inflight._toInflight();
  const lines = new Array<string>();

  // create a logger inflight client and attach it to `console.log`.
  // TODO: attach console.error, console.warn, once our logger supports log levels.
  if (logger) {
    const loggerClientCode = logger._toInflight();
    lines.push(`const $logger = ${loggerClientCode.text};`);
    lines.push(`console.log = (...args) => $logger.print(...args);`);
  }

  lines.push("exports.handler = async function(event) {");
  lines.push(`  return await ${inflightClient.text}.handle(event);`);
  lines.push("};");

  const tempdir = mkdtemp();
  const outfile = join(tempdir, "index.js");

  esbuild.buildSync({
    bundle: true,
    stdin: {
      contents: lines.join("\n"),
      resolveDir: tempdir,
      sourcefile: "inflight.js",
    },
    target: "node16",
    platform: "node",
    absWorkingDir: tempdir,
    outfile,
    minify: false,
    external: ["aws-sdk"],
  });

  // the bundled contains line comments with file paths, which are not useful for us, especially
  // since they may contain system-specific paths. sadly, esbuild doesn't have a way to disable
  // this, so we simply filter those out from the bundle.
  const outlines = readFileSync(outfile, "utf-8").split("\n");
  const isNotLineComment = (line: string) => !line.startsWith("//");
  writeFileSync(outfile, outlines.filter(isNotLineComment).join("\n"));

  return outfile;
}
