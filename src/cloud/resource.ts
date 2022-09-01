import { Construct, IConstruct } from "constructs";
import { CaptureMetadata, Code, ICapturable } from "../core";

export interface IResource {
  /**
   * Whether a resource is stateful, i.e. it stores information that is not
   * defined by your application.
   *
   * A non-stateful resource does not remember information about past
   * transactions or events, and can typically be replaced by a cloud provider
   * with a fresh copy without any consequences.
   */
  readonly stateful: boolean;
}

export abstract class Resource
  extends Construct
  implements IResource, ICapturable
{
  public abstract readonly stateful: boolean;
  public abstract capture(
    captureScope: IConstruct,
    metadata: CaptureMetadata
  ): Code;
}
