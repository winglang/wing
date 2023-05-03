import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

export interface BucketMetadataProps {
  node: MetadataNode;
}

export const BucketMetadata = ({ node }: BucketMetadataProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        "px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4",
        theme.bg3,
        theme.text2,
      )}
    >
      <AttributeView name="Public" value={node.props?.public ? "Yes" : "No"} />
    </div>
  );
};
