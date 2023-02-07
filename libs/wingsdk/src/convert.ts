import { Construct } from "constructs";
import { IResource, NodeJsCode, Resource } from "./core";
import { normalizePath } from "./util";

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
    }

    public _toInflight(): NodeJsCode {
      const handlerClient = this.handler._toInflight();
      return NodeJsCode.fromInline(
        `new (require("${normalizePath(
          newHandlerClientPath
        )}")).${newHandlerClientClassName}({ handler: ${handlerClient.text} })`
      );
    }
  }

  NewHandler._annotateInflight("handle", {
    "this.handler": { ops: ["handle"] },
  });

  return new NewHandler(scope, id, baseHandler);
}
