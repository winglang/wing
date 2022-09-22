import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code, ICapturable } from "../core";

export abstract class Resource extends Construct implements ICapturable {
  /**
   * Whether a resource is stateful, i.e. it stores information that is not
   * defined by your application.
   *
   * A non-stateful resource does not remember information about past
   * transactions or events, and can typically be replaced by a cloud provider
   * with a fresh copy without any consequences.
   */
  public abstract readonly stateful: boolean;
  /**
   * @internal
   */
  public abstract _capture(
    captureScope: IConstruct,
    metadata: CaptureMetadata
  ): Code;
}
