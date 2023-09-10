import * as cloud from "../cloud";
import { IGcpFunction } from "../shared-gcp/function";

/**
 * GCP implementation of `cloud.Function`.
 *
 * @inflight `@winglang/sdk.cloud.IFunctionClient`
 */
export class Function extends cloud.Function implements IGcpFunction {
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}
