import { IConstruct } from "constructs";
import { Logger, LoggerInflightMethods } from "../cloud/logger";
import { Code, InflightBinding, NodeJsCode } from "./inflight";
import { Resource } from "./resource";

export function makeHandler(
  scope: IConstruct,
  id: string,
  code: string,
  userBindings?: { [key: string]: InflightBinding }
): Resource {
  const bindings = {
    ...userBindings,

    // implicit binding between `$logger` and the logger registered for this scope
    $logger: {
      resource: Logger.of(scope),
      ops: [LoggerInflightMethods.PRINT],
    },
  };

  const resources = Object.fromEntries(
    Object.entries(bindings).map(([name, binding]) => [name, binding.resource])
  );

  // implements IFunctionHandler
  class Handler extends Resource {
    public readonly stateful = false;
    public readonly $resourceNames = Object.keys(bindings);

    constructor() {
      super(scope, id);
      for (const [name, resource] of Object.entries(resources)) {
        (this as any)[name] = resource;
      }
    }

    public _toInflight(): NodeJsCode {
      const clients: Record<string, Code> = {};
      for (const resource of this.$resourceNames) {
        clients[resource] = (this as any)[resource]._toInflight();
      }

      const clientMap = Object.entries(clients)
        .map(([name, client]) => `${name}: ${client.text}`)
        .join(",\n");

      return NodeJsCode.fromInline(`
        (function(clients) {
          console.log = (...args) => clients.$logger.print(...args);

          class Handler {
            constructor() {
              for (const [name, client] of Object.entries(clients)) {
                this[name] = client;
              }            
            }

            ${code}
          }

          return new Handler();
        })({${clientMap}})
      `);
    }
  }

  const annotation = Object.fromEntries(
    Object.entries(bindings ?? {}).map(([name, binding]) => [
      "this." + name,
      { ops: binding.ops },
    ])
  );
  Handler._annotateInflight("handle", annotation);

  return new Handler();
}
