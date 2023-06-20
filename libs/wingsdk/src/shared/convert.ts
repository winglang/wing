import { Construct } from "constructs";
import { normalPath } from "./misc";
import { NodeJsCode } from "../core";
import { IInflightHost, IResource, Resource } from "../std";

/**
 * Convert a resource with a single method into a resource with a different
 * single method. This is useful for converting between types like
 * IFunctionHandler and IQueueSetConsumerHandler.
 *
 * Both the input and return values of this function are expected to be
 * resources with a single method named "handle".
 */
export function convertBetweenHandlers(
  scope: Construct,
  id: string,
  baseHandler: IResource,
  newHandlerClientPath: string,
  newHandlerClientClassName: string,
  args: Record<string, unknown> = {}
): IResource {
  class NewHandler extends Resource {
    private readonly handler: IResource;
    private readonly args: Record<string, unknown> = {};

    constructor(theScope: Construct, theId: string, handler: IResource) {
      super(theScope, theId);
      this.handler = handler;
      this.display.hidden = true;
      this._addInflightOps("handle");
      this.args = args;
    }

    public _toInflight(): NodeJsCode {
      const handlerClient = this.handler._toInflight();
      return NodeJsCode.fromInline(
        `new (require("${normalPath(
          newHandlerClientPath
        )}")).${newHandlerClientClassName}({ handler: ${
          handlerClient.text
        }, args: ${JSON.stringify(this.args)} })`
      );
    }

    public _registerBind(host: IInflightHost, ops: string[]): void {
      NewHandler._registerBindObject(this.handler, host, ["handle"]);
      super._registerBind(host, ops);
    }
  }

  return new NewHandler(scope, id, baseHandler);
}
