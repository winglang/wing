import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface BucketMetadataProps {
  node: MetadataNode;
}

export const BucketMetadata = ({ node }: BucketMetadataProps) => {
  return (
    <div className="px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4 bg-slate-50">
      <AttributeView name="Public" value={node.props?.public ? "Yes" : "No"} />
    </div>
  );
};
