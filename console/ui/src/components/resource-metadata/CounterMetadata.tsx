import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface CounterMetadataProps {
  node: MetadataNode;
}

export const CounterMetadata = ({ node }: CounterMetadataProps) => {
  return <AttributeView name="Initial value" value={node.props?.initial} />;
};
