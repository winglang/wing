import { PolyconFactory } from "./factory";
import { CdkApp, IApp, AppProps } from "../core";

/**
 * An app that knows how to synthesize constructs into a CDK configuration
 * for AWS resources.
 */
export class App extends CdkApp implements IApp {
  constructor(props: AppProps = {}) {
    super({
      ...props,
      customFactory: props.customFactory ?? new PolyconFactory(),
    });
  }
}