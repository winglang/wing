import { IConstruct } from "constructs";
import { InflightBindings } from "../core";
import { liftObject } from "../core/internal";
import { IInflightHost, IResource, Node, Resource } from "../std";

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
   * @param id The ID of the handler.
   * @param code The code of the handler.
   * @param bindings The bindings of the handler.
   */
  public static makeHandler(
    scope: IConstruct,
    id: string,
    code: string,
    bindings: InflightBindings = {}
  ): IResource {
    const clients: Record<string, string> = {};

    for (const [k, v] of Object.entries(bindings)) {
      clients[k] = liftObject(scope, v.obj);
    }

    // implements IFunctionHandler
    class Handler extends Resource {
      constructor() {
        super(scope, id);

        // pretend as if we have a field for each binding
        for (const [field, value] of Object.entries(bindings)) {
          (this as any)[field] = value.obj;
        }

        Node.of(this).title = "Inflight";
        Node.of(this).description = "An inflight resource";
        Node.of(this).hidden = true;
      }

      public _supportedOps(): string[] {
        return ["handle"];
      }

      public _toInflight(): string {
        return `new ((function(){
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
})`;
      }

      public _registerOnLift(host: IInflightHost, ops: string[]): void {
        for (const v of Object.values(bindings)) {
          Handler._registerOnLiftObject(v.obj, host, v.ops);
        }
        super._registerOnLift(host, ops);
      }
    }

    return new Handler();
  }
}
