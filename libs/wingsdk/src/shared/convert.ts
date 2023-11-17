import { autoId, normalPath } from "./misc";
import { IInflight } from "../std";

/**
 * Convert a resource with a single method into a resource with a different
 * single method. This is useful for converting between types like
 * IFunctionHandler and IQueueSetConsumerHandler.
 *
 * Both the input and return values of this function are expected to be
 * resources with a single method named "handle".
 */
export function convertBetweenHandlers(
  baseHandler: IInflight,
  newHandlerClientPath: string,
  newHandlerClientClassName: string,
  args: Record<string, unknown> = {}
): IInflight {
  const handlerClient = baseHandler._toInflight();
  const newHandler = {
    ...baseHandler,
    _id: "" + autoId(),
    _toInflight() {
      return `\
new (require("${normalPath(
        newHandlerClientPath
      )}")).${newHandlerClientClassName}({ handler: ${handlerClient}, args: ${JSON.stringify(
        args
      )} })`;
    },
  };

  Object.setPrototypeOf(newHandler, Object.getPrototypeOf(baseHandler));

  return newHandler;
}
