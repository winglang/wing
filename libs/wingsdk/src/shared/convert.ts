import { inflightId, normalPath } from "./misc";
import { IInflight } from "../std";

/**
 * Transform an inflight to one that is wrapped with another one.
 * The new inflight can have a different signature.
 * This is useful for converting between types like
 * IFunctionHandler and IQueueSetConsumerHandler.
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
    _id: inflightId(baseHandler),
    _toInflight() {
      return `\
new (require("${normalPath(
        newHandlerClientPath
      )}")).${newHandlerClientClassName}({ handler: ${handlerClient}, args: ${JSON.stringify(
        args
      )} })`;
    },
  };

  // TODO Remove this once inflights are no longer resources
  Object.setPrototypeOf(newHandler, Object.getPrototypeOf(baseHandler));

  return newHandler;
}
