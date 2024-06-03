import { AppProps, PolyconFactory } from "../../src/core";
import { App } from "../../src/target-tf-aws";
import { Platform } from "../../src/target-tf-aws/platform";
import { mkdtemp } from "../util";

export interface AwsAppProps extends Partial<AppProps> {}

export class AwsApp extends App {
  constructor(props: AwsAppProps = {}) {
    const platform = new Platform();
    const polyconFactory = new PolyconFactory(
      [platform.newInstance.bind(platform)],
      [platform.typeForFqn.bind(platform)]
    );

    super({
      outdir: mkdtemp(),
      entrypointDir: __dirname,
      isTestEnvironment: false,
      rootConstruct: undefined,
      polyconFactory,
      ...props,
    });
  }
}
