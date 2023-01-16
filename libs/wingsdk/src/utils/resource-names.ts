import { Construct } from "constructs";

export enum CaseConventions {
  LOWERCASE = "lowercase",
  UPPERCASE = "uppercase",
}

/**
 * Options for `ResourceNames.generateName`
 */
export interface NameOptions {
  /**
   * Maximum name length must always be greater than the hash (>=8 characters)
   */
  readonly maxLen: number;
  /**
   * Regular expression that indicates which characters are valid
   */
  readonly disallowedRegEx: RegExp;
  /**
   * Word breaker
   *
   * @default "-"
   */
  readonly sep?: string;
  readonly case?: CaseConventions;
  readonly prefix?: string;
}

export class ResourceNames {
  public static generateName(resource: Construct, props: NameOptions): string {
    const sep = props.sep ?? "-";

    if (props.maxLen < 8) {
      throw new Error("maxLen must be at least 8");
    }

    let hash = resource.node.addr.substring(0, 8);
    let human = props.prefix
      ? `${props.prefix}${resource.node.id}`
      : resource.node.id;

    if (props.case == CaseConventions.LOWERCASE) {
      human = human.toLocaleLowerCase();
    }
    if (props.case == CaseConventions.UPPERCASE) {
      human = human.toLocaleUpperCase();
    }

    human = human
      .replace(props.disallowedRegEx, sep)
      .substring(0, props.maxLen - hash.length - sep.length);

    return `${human}${sep}${hash}`;
  }
}

export class ResourceNames2 {
  public static generateName(resource: Construct, props: NameOptions): string {
    const sep = props.sep ?? "-";

    if (props.maxLen < 8) {
      throw new Error("maxLen must be at least 8");
    }

    let hash = resource.node.addr.substring(0, 8);
    let human = props.prefix
      ? `${props.prefix}${resource.node.id}`
      : resource.node.id;

    if (props.case == CaseConventions.LOWERCASE) {
      human = human.toLocaleLowerCase();
    }
    if (props.case == CaseConventions.UPPERCASE) {
      human = human.toLocaleUpperCase();
    }

    human = human
      .replace(props.allowedRegEx2!, sep)
      .substring(0, props.maxLen - hash.length - sep.length);

    return `${human}${sep}${hash}`;
  }
}