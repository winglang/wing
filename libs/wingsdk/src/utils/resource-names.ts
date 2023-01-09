import { Construct } from "constructs";
import { awsResourceNameProps } from "./aws/aws-names";
import { azureResourceNameProps } from "./azure/azure-names";

export enum CaseConventions {
  LOWERCASE = "lowercase",
  UPPERCASE = "uppercase",
}

export interface NameOptions {
  readonly resource: string;
  readonly regexMatch: RegExp;
  readonly charReplacer: string;
  readonly maxLen: number;
  readonly minLen?: number;
  readonly case?: CaseConventions;
  readonly avoidStartWith?: string;
  readonly prefix?: string;
}

export enum ResourceType {
  AWS_BUCKET = "aws-bucket",
  AWS_COUNTER = "aws-counter",
  AWS_FUNCTION = "aws-function",
  AWS_QUEUE = "aws-queue",
  AWS_TOPIC = "aws-topic",

  AZURE_BUCKET = "azure-bucket",
}

export class ResourceNames {
  public static of(resource: Construct, type: ResourceType): string {
    const opt = resourceNameProps(type);

    let name = `${resource.node.id}-${resource.node.addr}`;

    if (opt!.avoidStartWith && name.startsWith(`${opt!.avoidStartWith}`)) {
      throw new Error(
        `${opt!.resource} names can not begin with ${opt!.avoidStartWith}`
      );
    }

    if (opt!.prefix) {
      name = `${opt!.prefix}-${name}`;
    }

    if (opt!.case == CaseConventions.LOWERCASE) {
      name = name.toLocaleLowerCase();
    }
    if (opt!.case == CaseConventions.UPPERCASE) {
      name = name.toLocaleUpperCase();
    }

    return name
      .replace(opt!.regexMatch, opt!.charReplacer)
      .substring(0, opt!.maxLen);
  }
}

function resourceNameProps(type: ResourceType): NameOptions | undefined {
  switch (type) {
    case ResourceType.AWS_BUCKET:
    case ResourceType.AWS_COUNTER:
    case ResourceType.AWS_FUNCTION:
    case ResourceType.AWS_QUEUE:
    case ResourceType.AWS_TOPIC:
      return awsResourceNameProps(type);

    case ResourceType.AZURE_BUCKET:
      return azureResourceNameProps(type);
  }
}
