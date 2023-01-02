import { IConstruct } from "constructs";
import { Inflight, InflightBinding, IResource, NodeJsCode } from "../core";

/**
 * Test utilities.
 */
export class Testing {
  /**
   * Make an `IFunctionHandler`, `IQueueOnMessageHandler` or any other handler
   * on the fly. The resource will have a single method named "handle".
   *
   * The JavaScript code passed to the handler must be in the form of
   * `async handle(event) { ... }`, and all references to resources must be
   * made through `this.<resource>`.
   *
   * @param scope The scope to create the handler in.
   * @param id The ID of the handler.
   * @param code The code of the handler.
   * @param bindings The bindings of the handler.
   */
  public static makeHandler(
    scope: IConstruct,
    id: string,
    code: string,
    bindings?: { [key: string]: InflightBinding }
  ): IResource {
    return new Inflight(scope, id, {
      code: NodeJsCode.fromInline(code),
      bindings,
    });
  }
}
