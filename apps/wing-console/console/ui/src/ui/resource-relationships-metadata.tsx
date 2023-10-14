import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { InspectorSection, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { ConnectionsGroup, MetadataNode } from "./resource-metadata-panel.js";

export interface ResourceRelationshipsMetadataProps {
  node: MetadataNode;
  isOpen: boolean;
  onInspectorSectionToggle: (section: string) => void;
  onConnectionNodeClick?: (path: string) => void;
  connectionsGroups: ConnectionsGroup[];
}
export const ResourceRelationshipsMetadata = ({
  node,
  isOpen,
  onInspectorSectionToggle,
  onConnectionNodeClick,
  connectionsGroups,
}: ResourceRelationshipsMetadataProps) => {
  const { theme } = useTheme();

  return (
    <InspectorSection
      text="Relationships"
      open={isOpen}
      icon={ArrowPathRoundedSquareIcon}
      onClick={() => onInspectorSectionToggle("relationships")}
      headingClassName="pl-2"
    >
      <div className={classNames("border-t", theme.border4)}>
        {connectionsGroups.map((connectionGroup) => (
          <div key={connectionGroup.groupName}>
            <div className={classNames("relative", theme.bg3, theme.text1)}>
              {connectionGroup.connections.map((connection, index) => (
                <button
                  key={`${connection.path}_${index}`}
                  className={classNames(
                    theme.bg3,
                    theme.bg3Hover,
                    theme.text1,
                    "w-full flex-shrink-0 max-w-full truncate shadow-sm text-sm pl-4 pr-2 py-1 flex items-center gap-1 min-w-0",
                  )}
                  title={connection.path}
                  onClick={() => onConnectionNodeClick?.(connection.path)}
                >
                  <div
                    className={classNames(
                      "flex-0 flex-shrink-0 flex items-center gap-2 min-w-[100px]",
                      theme.text1,
                    )}
                  >
                    <div className="pl-2 flex-0 flex-shrink-0">
                      {connectionGroup.type === "inbound" ? (
                        <ArrowLeftOnRectangleIcon
                          className="w-4 h-4 rotate-180 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowRightOnRectangleIcon
                          className="w-4 h-4 text-red-500"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span
                      className={classNames("uppercase text-xs", theme.text1)}
                    >
                      {connectionGroup.type === "inbound" ? "In" : "Out"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 ml-2 5 min-w-0">
                    <div className="flex-shrink-0 -ml-1">{connection.icon}</div>
                    <div className="truncate">{connection.id}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </InspectorSection>
  );
};
