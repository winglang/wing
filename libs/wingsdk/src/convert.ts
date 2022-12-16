import { Construct } from "constructs";
import { IResource, NodeJsCode, Policies, Resource } from "./core";

/**
 * Both the input and return values of this function are expected to be
 * resources with a single method named "handle"
 */
export function convertBetweenHandlers(
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

    constructor(scope: Construct, id: string, handler: IResource) {
      super(scope, id);
      this.handler = handler;
    }

    bindImpl(host: Resource, ops: string[]) {
      const baseHandlerPolicy = Policies.make(ops, this._policies, "handler");
      const baseHandlerClient = this.handler._bind(host, baseHandlerPolicy);
      return NodeJsCode.fromInline(
        `new (require("${newHandlerClientPath}")).${newHandlerClientClassName}({ handler: ${baseHandlerClient.text} })`
      );
    }
  }

  return new NewHandler(baseHandler, "FunctionHandler", baseHandler);
}
