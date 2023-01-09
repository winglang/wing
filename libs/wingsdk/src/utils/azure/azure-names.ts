import { CaseConventions, NameOptions, ResourceType } from "../resource-names";

export const azureResourceNameProps = (
  type: ResourceType
): NameOptions | undefined => {
  switch (type) {
    case ResourceType.AZURE_BUCKET: {
      /**
       * Azure Bucket names must be between 3 and 24 characters.
       * You can only use lowercase alphanumeric charactes
       */
      return {
        resource: "Bucket",
        maxLen: 24,
        case: CaseConventions.LOWERCASE,
        regexMatch: /[^a-z0-9]+/g,
        charReplacer: "",
      };
    }
  }

  return;
};
