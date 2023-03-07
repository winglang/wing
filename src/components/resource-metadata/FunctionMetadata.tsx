import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface FunctionMetadataProps {
  node: MetadataNode;
}

export const FunctionMetadata = ({ node }: FunctionMetadataProps) => {
  return (
    <>
      <AttributeView name="Entry" value={node.props?.sourceCodeFile} />
      <AttributeView
        name="Environment"
        value={JSON.stringify(node.props?.environmentVariables)}
      />
    </>
  );
};
