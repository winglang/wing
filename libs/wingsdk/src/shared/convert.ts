import { Construct } from "constructs";
import { normalPath } from "./misc";
import { IResource } from "../std";

/**
 * Convert a resource with a single method into a resource with a different
 * single method. This is useful for converting between types like
 * IFunctionHandler and IQueueSetConsumerHandler.
 *
 * Both the input and return values of this function are expected to be
 * resources with a single method named "handle".
 */
export function convertBetweenHandlers(
  _scope: Construct,
  _id: string,
  baseHandler: any,
  newHandlerClientPath: string,
  newHandlerClientClassName: string,
  args: Record<string, unknown> = {}
): IResource {
  return {
    ...baseHandler,
    _toInflight(): string {
      const handlerClient = baseHandler._toInflight();
      return `new (require("${normalPath(
        newHandlerClientPath
      )}")).${newHandlerClientClassName}({ handler: ${handlerClient}, args: ${JSON.stringify(
        args
      )} })`;
    },
  };
}
