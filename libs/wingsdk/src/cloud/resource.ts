import { Construct, IConstruct } from "constructs";
import {
  CaptureMetadata,
  Code,
  ICapturable,
  IInspectable,
  TreeInspector,
} from "../core";

/**
 * Shared behavior between all Wing SDK resources.
 */
export abstract class Resource
  extends Construct
  implements ICapturable, IInspectable
{
  private readonly _inbound = new Array<string>();
  private readonly _outbound = new Array<string>();

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
  public abstract _bind(
    captureScope: IConstruct,
    metadata: CaptureMetadata
  ): Code;

  /**
   * @internal
   */
  public _addInbound(...resources: Resource[]): void {
    this._inbound.push(...resources.map((r) => r.node.path));
  }

  /**
   * @internal
   */
  public _addOutbound(...resources: Resource[]): void {
    this._inbound.push(...resources.map((r) => r.node.path));
  }

  /**
   * @internal
   */
  public _inspect(inspector: TreeInspector): void {
    inspector.addAttribute("wing:resource:stateful", this.stateful);
    inspector.addAttribute("wing:resource:inbound", this._inbound);
    inspector.addAttribute("wing:resource:outbound", this._outbound);
  }
}
