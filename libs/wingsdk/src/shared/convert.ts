import { Construct } from "constructs";
import { normalPath } from "./misc";
import { Display, IInflightHost, IInflightConstruct, Resource } from "../std";

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
  baseHandler: IInflightConstruct,
  newHandlerClientPath: string,
  newHandlerClientClassName: string,
  args: Record<string, unknown> = {}
): IInflightConstruct {
  class NewHandler extends Construct {
    private readonly handler: IInflightConstruct;
    private readonly args: Record<string, unknown> = {};

    constructor(
      theScope: Construct,
      theId: string,
      handler: IInflightConstruct
    ) {
      super(theScope, theId);
      this.handler = handler;
      Display.of(this).hidden = true;
      this.args = args;
    }

    public _getInflightOps(): string[] {
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

    public _registerBind(host: IInflightHost, _ops: string[]): void {
      Resource._registerBindObject(this.handler, host, ["handle"]);
    }
  }

  return new NewHandler(scope, id, baseHandler);
}
