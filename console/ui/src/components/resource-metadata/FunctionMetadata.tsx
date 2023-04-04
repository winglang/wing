import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface FunctionMetadataProps {
  node: MetadataNode;
}

export const FunctionMetadata = ({ node }: FunctionMetadataProps) => {
  return (
    <div className="px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4 bg-slate-50">
      <AttributeView name="Entry" value={node.props?.sourceCodeFile} />
      <AttributeView
        name="Environment"
        value={JSON.stringify(node.props?.environmentVariables)}
      />
    </div>
  );
};
