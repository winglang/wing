import { Construct, IConstruct } from "constructs";
import { IResource, NodeJsCode, Policies, Resource } from "./core";

/**
 * Convert a resource with a single method into a resource with a different
 * single method. This is useful for converting between types like
 * IFunctionHandler and IQueueOnMessageHandler.
 *
 * Both the input and return values of this function are expected to be
 * resources with a single method named "handle".
 */
export function convertBetweenHandlers(
  scope: IConstruct,
  id: string,
  baseHandler: IResource,
  newHandlerClientPath: string,
  newHandlerClientClassName: string
): Resource {
  class NewHandler extends Resource {
    public readonly stateful = false;
    private readonly handler: IResource;

    /** @internal */
    public readonly _policies = {
      handle: {
        handler: {
          ops: ["handle"],
        },
      },
    };

    constructor(theScope: Construct, theId: string, handler: IResource) {
      super(theScope, theId);
      this.handler = handler;
    }

    public _bind(host: Resource, ops: string[]): void {
      const baseHandlerPolicy = Policies.make(ops, this._policies, "handler");
      this.handler._bind(host, baseHandlerPolicy);
      super._bind(host, ops);
    }

    public _inflightJsClient(): NodeJsCode {
      const handlerClient = this.handler._inflightJsClient();
      return NodeJsCode.fromInline(
        `new (require("${newHandlerClientPath}")).${newHandlerClientClassName}({ handler: ${handlerClient.text} })`
      );
    }
  }

  return new NewHandler(scope, id, baseHandler);
}
