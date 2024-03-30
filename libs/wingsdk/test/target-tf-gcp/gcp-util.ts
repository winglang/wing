import { PolyconFactory } from "../../src/core";
import { App, AppProps } from "../../src/target-tf-gcp";
import { Platform } from "../../src/target-tf-gcp/platform";
import { mkdtemp } from "../util";

export interface GcpAppProps extends Partial<AppProps> {}

export class GcpApp extends App {
  private _synthesized: boolean = false;
  private functionIndex: number = 0;

  constructor(props: GcpAppProps = {}) {
    const platform = new Platform();
    const polyconFactory = new PolyconFactory([
      platform.newInstance.bind(platform),
    ]);

    super({
      outdir: mkdtemp(),
      entrypointDir: __dirname,
      isTestEnvironment: false,
      rootConstruct: undefined,
      projectId: "my-project",
      region: "us-central1",
      zone: "us-central1-a",
      polyconFactory,
      ...props,
    });
  }
}
