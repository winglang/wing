import { Construct } from "constructs";

export enum CaseConventions {
  LOWERCASE = "lowercase",
  UPPERCASE = "uppercase",
}

export interface NameOptions {
  readonly regexMatch: RegExp;
  readonly charReplacer: string;
  readonly maxLen: number;
  readonly minLen?: number;
  readonly case?: CaseConventions;
  readonly forbidenStartwith?: string;
  readonly forbidenEndwith?: string;
  readonly prefix?: string;
}

export class ResourceNames {
  public static of(resource: Construct, props: NameOptions): string {
    let hash = resource.node.addr.substring(0, 8);
    let human = props.prefix
      ? `${props.prefix}-${resource.node.id}`.substring(
          0,
          props.maxLen - hash.length - props.prefix.length - 2
        )
      : resource.node.id.substring(0, props.maxLen - hash.length - 1);

    if (props.case == CaseConventions.LOWERCASE) {
      human = human.toLocaleLowerCase();
    }
    if (props.case == CaseConventions.UPPERCASE) {
      human = human.toLocaleUpperCase();
    }

    human = human.replace(props.regexMatch, props.charReplacer);

    return `${human}${props.charReplacer}${hash}`;
  }
}
