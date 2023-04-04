import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface CounterMetadataProps {
  node: MetadataNode;
}

export const CounterMetadata = ({ node }: CounterMetadataProps) => {
  return (
    <div className="px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4 bg-slate-50">
      <AttributeView name="Initial value" value={node.props?.initial} />
    </div>
  );
};
