import { IConstruct } from "constructs";
import { InflightBindings } from "../core";
import { liftObject } from "../core/internal";
import { autoId } from "../shared/misc";
import { IInflightHost, Resource } from "../std";

/**
 * Test utilities.
 * TODO: move this to `test/` - it should not be under `src/`
 */
export class Testing {
  /**
   * Make an `IFunctionHandler`, `IQueueSetConsumerHandler` or any other handler
   * on the fly. The resource will have a single method named "handle".
   *
   * The JavaScript code passed to the handler must be in the form of
   * `async handle(event) { ... }`, and all references to resources must be
   * made through `this.<resource>`.
   *
   * @param scope The scope to create the handler in.
   * @param code The code of the handler.
   * @param bindings The bindings of the handler.
   */
  public static makeHandler(
    _scope: IConstruct,
    code: string,
    bindings: InflightBindings = {}
  ): any {
    const clients: Record<string, string> = {};

    for (const [k, v] of Object.entries(bindings)) {
      clients[k] = liftObject(v.obj);
    }

    // implements IFunctionHandler
    return {
      _id: autoId(),
      _registerOnLift: (host: IInflightHost, _ops: string[]) => {
        for (const v of Object.values(bindings)) {
          Resource._registerOnLiftObject(v.obj, host, v.ops);
        }
      },
      _supportedOps: () => ["handle"],
      _toInflight: () => `new ((function(){
        return class Handler {
          constructor(clients) {
            for (const [name, client] of Object.entries(clients)) {
              this[name] = client;
            }
          }
          ${code}
        };
        })())({
        ${Object.entries(clients)
          .map(([name, client]) => `${name}: ${client}`)
          .join(",\n")}
        })`,
    };
  }
}
