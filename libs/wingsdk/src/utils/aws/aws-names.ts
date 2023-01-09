import { CaseConventions, NameOptions, ResourceType } from "../resource-names";

export const awsResourceNameProps = (
  type: ResourceType
): NameOptions | undefined => {
  switch (type) {
    case ResourceType.AWS_BUCKET: {
      /**
       * AWS Bucket names must be between 3 and 63 characters.
       * You can use lowercase alphanumeric characters, dot(.) and dash (-),
       * must begin and end with alphanumeric character, can not begin
       * with 'xn--' or ending with '-s3alias' and must not contain
       * two adjacent dots.
       */
      return {
        resource: "Bucket",
        maxLen: 63,
        case: CaseConventions.LOWERCASE,
        regexMatch: /(([(.)\1+]+)[^a-z0-9\-]+)/g,
        charReplacer: "-",
        avoidStartWith: "xn--",
      };
    }
    case ResourceType.AWS_COUNTER: {
      /**
       * AWS Couter (Table) names must be between 3 and 255 characters.
       * You can use alphanumeric characters, dot(.), dash (-), and underscores (_).
       */
      return {
        resource: "Counter",
        maxLen: 255,
        regexMatch: /[^a-zA-Z0-9\_\.\-]+/g,
        charReplacer: "-",
        prefix: "wingsdk-counter",
      };
    }
    case ResourceType.AWS_FUNCTION: {
      /**
       * AWS Function names are limited to 64 characters.
       * You can use alphanumeric characters, hyphens (-), and underscores (_).
       */
      return {
        resource: "Function",
        maxLen: 64,
        regexMatch: /[^a-zA-Z0-9\:\-]+/g,
        charReplacer: "-",
      };
    }
    case ResourceType.AWS_QUEUE: {
      /**
       * AWS Queue names are limited to 80 characters.
       * You can use alphanumeric characters, hyphens (-), and underscores (_).
       */
      return {
        resource: "Queue",
        maxLen: 80,
        regexMatch: /[^a-zA-Z0-9\_\-]+/g,
        charReplacer: "-",
      };
    }
    case ResourceType.AWS_TOPIC: {
      /**
       * AWS Topic names are limited to 256 characters.
       * You can use alphanumeric characters, hyphens (-) and underscores (_).
       */
      return {
        resource: "Topic",
        maxLen: 256,
        regexMatch: /[^a-zA-Z0-9\_\-]+/g,
        charReplacer: "-",
      };
    }
  }

  return;
};
