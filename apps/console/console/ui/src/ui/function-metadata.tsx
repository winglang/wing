import { useTheme, Attribute } from "@wingconsole/design-system";
import classNames from "classnames";

import { MetadataNode } from "./resource-metadata.js";

export interface FunctionMetadataProps {
  node: MetadataNode;
}

export const FunctionMetadata = ({ node }: FunctionMetadataProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        "px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4",
        theme.bg3,
        theme.text2,
      )}
    >
      <Attribute name="Entry" value={node.props?.sourceCodeFile} />
      <Attribute
        name="Environment"
        value={JSON.stringify(node.props?.environmentVariables)}
      />
    </div>
  );
};
