import { IConstruct } from "constructs";
import { InflightBindings, NodeJsCode } from "../core";
import { serializeImmutableData } from "../core/internal";
import { IInflightHost, IResource, Resource } from "../std";

/**
 * Test utilities.
 * TODO: move this to `test/` - it should not be under `src/`
 */
export class Testing {
  /**
   * Make an `IFunctionHandler`, `IQueueAddConsumerHandler` or any other handler
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
      clients[k] = serializeImmutableData(v.obj);
    }

    // implements IFunctionHandler
    class Handler extends Resource {
      constructor() {
        super(scope, id);

        // pretend as if we have a field for each binding
        for (const [field, value] of Object.entries(bindings)) {
          (this as any)[field] = value.obj;
        }

        this.display.title = "Inflight";
        this.display.description = "An inflight resource";
        this.display.hidden = true;

        this._addInflightOps("handle");
      }

      public _toInflight(): NodeJsCode {
        return NodeJsCode.fromInline(
          `new ((function(){
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
})`
        );
      }

      public _registerBind(host: IInflightHost, ops: string[]): void {
        for (const v of Object.values(bindings)) {
          this._registerBindObject(v.obj, host, v.ops);
        }
        super._registerBind(host, ops);
      }
    }

    return new Handler();
  }
}
