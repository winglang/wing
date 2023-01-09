export enum CaseConventions {
  LOWERCASE = "lowercase",
  UPPERCASE = "uppercase",
}

export interface NameOptions {
  readonly resource?: string;
  readonly regexMatch: RegExp;
  readonly charReplacer: string;
  readonly maxLen: number;
  readonly minLen?: number;
  readonly case?: CaseConventions;
  readonly avoidStartWith?: string;
  readonly prefix?: string;
}

export class ResourceNames {
  public static of(name: string, props: NameOptions): string {
    if (props.avoidStartWith && name.startsWith(`${props.avoidStartWith}`)) {
      throw new Error(`Names can not begin with ${props.avoidStartWith}`);
    }

    if (props.prefix) {
      name = `${props.prefix}-${name}`;
    }

    if (props.case == CaseConventions.LOWERCASE) {
      name = name.toLocaleLowerCase();
    }
    if (props.case == CaseConventions.UPPERCASE) {
      name = name.toLocaleUpperCase();
    }

    return name
      .replace(props.regexMatch, props.charReplacer)
      .substring(0, props.maxLen);
  }
}
