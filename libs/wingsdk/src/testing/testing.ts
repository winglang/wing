import { IConstruct } from "constructs";
import { IFunctionHandler } from "../cloud";
import { Code, IResource, NodeJsCode, Policies, Resource } from "../core";

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
   * made through `this.clients.<resource>`.
   *
   * @param scope The scope to create the handler in.
   * @param id The ID of the handler.
   * @param code The code of the handler.
   * @param bindings The bindings of the handler.
   */
  public static makeFunctionHandler(
    scope: IConstruct,
    id: string,
    code: string,
    bindings?: { [key: string]: ResourceBinding }
  ): IResource {
    const policies = {
      handle: Object.fromEntries(
        Object.entries(bindings ?? {}).map(([name, binding]) => [
          name,
          { ops: binding.methods },
        ])
      ),
    };

    const resources = Object.fromEntries(
      Object.entries(bindings ?? {}).map(([name, binding]) => [
        name,
        binding.resource,
      ])
    );

    class Handler extends Resource implements IFunctionHandler {
      public readonly stateful = false;

      /** @internal */
      public readonly _policies = policies;

      private readonly resources: { [key: string]: IResource };

      constructor() {
        super(scope, id);
        this.resources = resources;
      }

      public _bind(host: Resource, ops: string[]): void {
        for (const [name, resource] of Object.entries(this.resources)) {
          const resourcePolicy = Policies.make(ops, this._policies, name);
          resource._bind(host, resourcePolicy);
        }
      }

      public _inflightJsClient(): NodeJsCode {
        const clients: Record<string, Code> = {};
        for (const [name, resource] of Object.entries(this.resources)) {
          clients[name] = resource._inflightJsClient();
        }
        return NodeJsCode.fromInline(
          `new ((function(){
            return class Handler {
              constructor(clients) {
                this.clients = clients;
              }
              ${code}
            };
          })())({ ${Object.entries(clients)
            .map(([name, client]) => `${name}: ${client.text}`)
            .join(", ")} })`
        );
      }
    }

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
