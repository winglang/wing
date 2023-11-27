import { createHash } from "crypto";
import { normalPath } from "./misc";
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
  const newCode = `\
new (require("${normalPath(
    newHandlerClientPath
  )}")).${newHandlerClientClassName}({ handler: ${handlerClient}, args: ${JSON.stringify(
    args
  )} })`;

  const newHandler = {
    ...baseHandler,
    _hash: createHash("md5").update(newCode).digest("hex"),
    _toInflight() {
      return newCode;
    },
  };

  // TODO Remove this once inflights are no longer resources
  Object.setPrototypeOf(newHandler, Object.getPrototypeOf(baseHandler));

  return newHandler;
}
