import { Construct } from "constructs";
import { IResource, NodeJsCode, Resource } from "./core";
import { normalPath } from "./util";

/**
 * Convert a resource with a single method into a resource with a different
 * single method. This is useful for converting between types like
 * IFunctionHandler and IQueueOnMessageHandler.
 *
 * Both the input and return values of this function are expected to be
 * resources with a single method named "handle".
 */
export function convertBetweenHandlers(
  scope: Construct,
  id: string,
  baseHandler: IResource,
  newHandlerClientPath: string,
  newHandlerClientClassName: string
): IResource {
  class NewHandler extends Resource {
    public readonly stateful = false;
    private readonly handler: IResource;

    constructor(theScope: Construct, theId: string, handler: IResource) {
      super(theScope, theId);
      this.handler = handler;
      this.inflights.add("handle", { ref: "this.handler", op: "handle" });
    }

    public _toInflight(): NodeJsCode {
      const handlerClient = this.handler._toInflight();
      return NodeJsCode.fromInline(
        `new (require("${normalPath(
          newHandlerClientPath
        )}")).${newHandlerClientClassName}({ handler: ${handlerClient.text} })`
      );
    }
  }

  return new NewHandler(scope, id, baseHandler);
}
