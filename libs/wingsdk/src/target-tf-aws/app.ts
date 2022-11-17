import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { IPolyconFactory, Polycons } from "@winglang/polycons";
import { IApp, CdktfApp, CdktfAppProps } from "../core";
import { PolyconFactory } from "./factory";

/**
 * Props for `App`.
 */
export interface AppProps extends CdktfAppProps {
  /**
   * A custom factory to resolve polycons.
   * @default - use the default polycon factory included in the Wing SDK
   */
  readonly customFactory?: IPolyconFactory;
}

/**
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for AWS resources.
 */
export class App extends CdktfApp implements IApp {
  constructor(props: AppProps = {}) {
    super(props);
    Polycons.register(this, props.customFactory ?? new PolyconFactory());
    new AwsProvider(this, "aws", {});
  }
}
