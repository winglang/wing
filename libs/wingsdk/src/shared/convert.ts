import { normalPath } from "./misc";
import { closureId } from "../core";
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
  const newHandler = {
    ...baseHandler,
    _id: closureId(),
    _toInflight() {
      const handlerClient = baseHandler._toInflight();
      const newCode = `\
new (require("${normalPath(
        newHandlerClientPath
      )}")).${newHandlerClientClassName}({ handler: ${handlerClient}, args: ${JSON.stringify(
        args
      )} })`;
      return newCode;
    },
  };

  // TODO Remove this once inflights are no longer resources
  Object.setPrototypeOf(newHandler, Object.getPrototypeOf(baseHandler));

  return newHandler;
}
