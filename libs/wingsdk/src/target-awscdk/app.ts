import { PolyconFactory } from "./factory";
import { AwsCdkApp, IApp, CdkAppProps } from "../core";

/**
 * An app that knows how to synthesize constructs into a CDK configuration
 * for AWS resources.
 */
export class App extends AwsCdkApp implements IApp {
  constructor(props: CdkAppProps = {}) {
    super({
      ...props,
      customFactory: props.customFactory ?? new PolyconFactory(),
    });
  }
}