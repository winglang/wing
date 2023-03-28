import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface BucketMetadataProps {
  node: MetadataNode;
}

export const BucketMetadata = ({ node }: BucketMetadataProps) => {
  return (
    <AttributeView name="Public" value={node.props?.public ? "Yes" : "No"} />
  );
};
