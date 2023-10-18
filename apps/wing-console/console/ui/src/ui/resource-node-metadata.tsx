import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import {
  Attribute,
  InspectorSection,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";

import { MetadataNode } from "./resource-metadata-panel.js";

export interface ResourceNodeMetadataProps {
  node: MetadataNode;
  isOpen: boolean;
  onInspectorSectionToggle: (section: string) => void;
}
export const ResourceNodeMetadata = ({
  node,
  onInspectorSectionToggle,
  isOpen,
}: ResourceNodeMetadataProps) => {
  const { theme } = useTheme();

  return (
    <InspectorSection
      text="Node"
      icon={CubeTransparentIcon}
      open={isOpen}
      onClick={() => onInspectorSectionToggle("node")}
      headingClassName="pl-2"
    >
      <div className={classNames("border-t", theme.border4)}>
        <div
          className={classNames(
            "px-2 py-1.5 flex flex-col gap-y-1 gap-x-4",
            theme.bg3,
            theme.text1,
          )}
        >
          <Attribute name="ID" value={node.id} />
          <Attribute name="Path" value={node.path} />
          <Attribute name="Type" value={node.type} />
        </div>
      </div>
    </InspectorSection>
  );
};
