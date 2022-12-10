import { Code, NodeJsCode } from "./inflight";
import { PREBUNDLE_SYMBOL } from "./internal";
import { Resource } from "./resource";

/**
 * Testing utilities.
 */
export class Testing {
  /**
   * Obtain a reference to the prebundled Code for a given host resource.
   */
  public static inspectPrebundledCode(host: Resource): Code {
    const prebundle = (host as any)[PREBUNDLE_SYMBOL];
    if (!prebundle) {
      throw new Error("No prebundled code found on this resource.");
    }

    // TODO This is a hack. Our path for inflight requires should be relative
    return NodeJsCode.fromInline(removeAbsolutePath(prebundle.text));
  }
}

function removeAbsolutePath(text: string) {
  const regex = /"\/.+?\/libs\/wingsdk\/(.+?)"/g;

  // replace first group with static text
  return text.replace(regex, '"[REDACTED]/wingsdk/$1"');
}
