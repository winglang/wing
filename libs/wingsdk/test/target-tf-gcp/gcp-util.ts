import { ClassFactory } from "../../src/core";
import { App, AppProps } from "../../src/target-tf-gcp";
import { Platform } from "../../src/target-tf-gcp/platform";
import { mkdtemp } from "../util";

export interface GcpAppProps extends Partial<AppProps> {}

export class GcpApp extends App {
  constructor(props: GcpAppProps = {}) {
    const platform = new Platform();
    const classFactory = new ClassFactory(
      [platform.newInstance.bind(platform)],
      [platform.resolveType.bind(platform)]
    );

    super({
      outdir: mkdtemp(),
      entrypointDir: __dirname,
      isTestEnvironment: false,
      rootConstruct: undefined,
      projectId: "my-project",
      region: "us-central1",
      zone: "us-central1-a",
      classFactory,
      ...props,
    });
  }
}
