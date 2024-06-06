import { platform, std } from "@winglang/sdk";
import type { Construct } from "@winglang/sdk/lib/core/types";

/**
 * Properties for a Wing app.
 */
export interface AppProps {
  /**
   * The name and id of the app.
   * @default "main"
   */
  name?: string;
}

/**
 * Create a Wing app.
 *
 * ```ts
 * import { main, cloud } from "@wingcloud/framework";
 *
 * main((root) => {
 *   new cloud.Bucket(root, "Bucket");
 * });
 * ```
 *
 * Tests can be added using the second argument:
 *
 * ```ts
 * import { main, cloud } from "@wingcloud/framework";
 *
 * main((root, test) => {
 *   new cloud.Bucket(root, "Bucket");
 *
 *   test("bucket holds stuff", async () => {
 *     lift({ bucket }).inflight(async ({ bucket }) => {
 *       await bucket.put("key", "value");
 *     });
 *   });
 *
 * });
 * ```
 *
 * @param fn Define your application using the provided root construct.
 *           Note that this function may be called multiple times when used with `wing test`.
 */
export function main(
  fn: (
    root: Construct,
    test: (
      name: string,
      handler: std.ITestHandler,
      props?: std.TestProps
    ) => void
  ) => void,
  props: AppProps = {}
) {
  // check if we have everything we need
  const requiredEnvVars = [
    "WING_PLATFORMS",
    "WING_SYNTH_DIR",
    "WING_SOURCE_DIR",
    "WING_IS_TEST",
  ];
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar] === undefined) {
      throw new Error(`\
Missing environment variable: ${envVar}
This is a Wing app and must be run through the Wing CLI (npm install -f winglang).`);
    }
  }

  class $Root extends std.Resource {
    constructor(scope: Construct, id: string) {
      super(scope, id);
      fn(this, (name, handler, props) => {
        new std.Test(this, name, handler, props);
      });
    }
  }

  const platformPaths = ((s) => (!s ? [] : s.split(";")))(
    process.env.WING_PLATFORMS
  );
  const outdir = process.env.WING_SYNTH_DIR;
  const name = props.name ?? "main";
  const rootConstruct = $Root;
  const isTestEnvironment = process.env.WING_IS_TEST === "true";
  const entrypointDir = process.env.WING_SOURCE_DIR!;
  const rootId = process.env.WING_ROOT_ID;

  const $PlatformManager = new platform.PlatformManager({ platformPaths });
  globalThis.$PolyconFactory = $PlatformManager.createPolyconFactory();
  const app = $PlatformManager.createApp({
    outdir,
    name,
    rootConstruct,
    isTestEnvironment,
    entrypointDir,
    rootId,
    polyconFactory: globalThis.$PolyconFactory,
  });

  app.synth();
}
