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
   * Maximum length for the generated name. The length must at least the length
   * of the hash (8 characters).
   * @default - no maximum length
   */
  readonly maxLen?: number;

  /**
   * Regular expression that indicates which characters are invalid. Each group
   * of characters will be replaced with `sep`.
   */
  readonly disallowedRegex: RegExp;

  /**
   * Word breaker
   * @default "-"
   */
  readonly sep?: string;

  /**
   * Convert the generated name to all uppercase or all lowercase.
   * @default - apply no case conversion
   */
  readonly case?: CaseConventions;

  /**
   * Apply a predefined prefix to the generated name
   * @default - no prefix
   */
  readonly prefix?: string;

  /**
   * Apply a predefined suffix to the generated name
   * @default - no suffix
   */
  readonly suffix?: string;

  /**
   * Include a hash of the resource's address in the generated name.
   *
   * This should only be disabled if the resource's name is guaranteed to be
   * app-unique, or if some other source of randomness will be appended to the
   * name.
   *
   * @default true
   */
  readonly includeHash?: boolean;
}

export class ResourceNames {
  public static generateName(resource: Construct, props: NameOptions): string {
    const sep = props.sep ?? "-";
    const maxLen = props.maxLen;

    if (maxLen && maxLen < 8) {
      throw new Error("maxLen must be at least 8");
    }

    let name = resource.node.id;

    name = applyCaseConversion(name, props.case);

    if (props.prefix) {
      name = `${props.prefix}${name}`;
    }

    let includeHash = props.includeHash ?? true;
    let hash = includeHash ? sep + resource.node.addr.substring(0, 8) : "";
    let suffix = props.suffix ?? "";

    name = name.replace(props.disallowedRegex, sep);

    // TODO: allow customizing where we "trim" the name, e.g.
    // 1. trim from the end
    // 2. trim from the beginning
    // 3. trim from the middle
    if (maxLen) {
      name = name.substring(0, maxLen - hash.length - suffix.length);
    }

    name = `${name}${hash}${suffix}`;

    // apply case conversion again in case the prefix, suffix, or hash is not
    // case-conformant
    name = applyCaseConversion(name, props.case);

    return name;
  }
}

function applyCaseConversion(name: string, caseConventions?: CaseConventions) {
  if (caseConventions === CaseConventions.LOWERCASE) {
    return name.toLocaleLowerCase();
  }
  if (caseConventions === CaseConventions.UPPERCASE) {
    return name.toLocaleUpperCase();
  }
  return name;
}
