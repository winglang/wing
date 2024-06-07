import { PolyconFactory } from "../../src/core";
import { App, AppProps } from "../../src/target-tf-azure";
import { Platform } from "../../src/target-tf-azure/platform";
import { mkdtemp } from "../util";

export interface AzureAppProps extends Partial<AppProps> {}

export class AzureApp extends App {
  constructor(props: AzureAppProps = {}) {
    const platform = new Platform();
    const polyconFactory = new PolyconFactory(
      [platform.newInstance.bind(platform)],
      [platform.resolveType.bind(platform)]
    );

    super({
      outdir: mkdtemp(),
      entrypointDir: __dirname,
      isTestEnvironment: false,
      rootConstruct: undefined,
      polyconFactory,
      location: "East US",
      ...props,
    });
  }
}
