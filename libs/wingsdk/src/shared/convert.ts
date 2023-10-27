import { Construct } from "constructs";
import { normalPath } from "./misc";
import { IInflightHost, IResource, Node, Resource } from "../std";

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
      Node.of(this).hidden = true;
      this.args = args;
    }

    public _supportedOps(): string[] {
      return ["handle"];
    }

    public _toInflight(): string {
      const handlerClient = this.handler._toInflight();
      return `new (require("${normalPath(
        newHandlerClientPath
      )}")).${newHandlerClientClassName}({ handler: ${handlerClient}, args: ${JSON.stringify(
        this.args
      )} })`;
    }

    public _registerOnLift(host: IInflightHost, ops: string[]): void {
      NewHandler._registerOnLiftObject(this.handler, host, ["handle"]);
      super._registerOnLift(host, ops);
    }
  }

  return new NewHandler(scope, id, baseHandler);
}
