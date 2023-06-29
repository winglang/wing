import Conf from "conf";
import { nanoid } from "nanoid";

/**
 * Returns the anonymous ID of the user, or generates a new one if it doesn't exist.
 */
export const getAnonymousId = (): string => {
  const conf = new Conf({
    projectName: "@wingconsole/app",
  });

  let anonymousId = conf.get("anonymousId") as string | undefined;
  if (anonymousId) {
    return anonymousId;
  }

  anonymousId = nanoid();
  conf.set("anonymousId", anonymousId);
  return anonymousId;
};
