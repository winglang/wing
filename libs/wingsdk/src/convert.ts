import { Construct } from "constructs";
import {
  IResource,
  NodeJsCode,
  OperationPolicy,
  Policies,
  Resource,
} from "./core";

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
    public readonly stateful = true;
    private readonly handler: IResource;

    /** @internal */
    public readonly _policies = {
      handle: {
        handler: {
          methods: ["handle"],
        },
      },
    };

    constructor(scope: Construct, id: string, handler: IResource) {
      super(scope, id);
      this.handler = handler;
    }

    bindImpl(host: Resource, policy: OperationPolicy) {
      const baseHandlerPolicy = Policies.make(policy, this.handler, "handler");
      const baseHandlerClient = this.handler._bind(host, baseHandlerPolicy);
      return NodeJsCode.fromInline(
        `new (require("${newHandlerClientPath}")).${newHandlerClientClassName}({ handler: ${baseHandlerClient.text} })`
      );
    }
  }

  return new NewHandler(baseHandler, "FunctionHandler", baseHandler);
}
