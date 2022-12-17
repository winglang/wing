import { IConstruct } from "constructs";
import { IFunctionHandler } from "../cloud";
import { Code, IResource, NodeJsCode, Resource } from "../core";

/**
 * Test utilities.
 */
export class Testing {
  /**
   * Make an `IFunctionHandler`, `IQueueOnMessageHandler` or any other handler
   * on the fly.
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
    bindings?: { [key: string]: ResourceBinding }
  ): IResource {
    const resources = Object.fromEntries(
      Object.entries(bindings ?? {}).map(([name, binding]) => [
        name,
        binding.resource,
      ])
    );

    class Handler extends Resource implements IFunctionHandler {
      public readonly stateful = false;

      public readonly $resourceNames = Object.keys(bindings ?? {});

      constructor() {
        super(scope, id);
        for (const [name, resource] of Object.entries(resources)) {
          (this as any)[name] = resource;
        }
      }

      public _inflightJsClient(): NodeJsCode {
        const clients: Record<string, Code> = {};
        for (const resource of this.$resourceNames) {
          clients[resource] = (this as any)[resource]._inflightJsClient();
        }
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
    .map(([name, client]) => `${name}: ${client.text}`)
    .join(",\n")}
})`
        );
      }
    }

    const policy = Object.fromEntries(
      Object.entries(bindings ?? {}).map(([name, binding]) => [
        "this." + name,
        { ops: binding.methods },
      ])
    );
    Resource._annotateInflight(Handler, "handle", policy);

    return new Handler();
  }
}

/**
 * A resource binding.
 */
export interface ResourceBinding {
  /**
   * The resource.
   */
  readonly resource: IResource;

  /**
   * The list of methods used on the resource.
   */
  readonly methods: string[];
}
