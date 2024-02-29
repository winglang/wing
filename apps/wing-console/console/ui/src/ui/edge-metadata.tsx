import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import {
  useTheme,
  InspectorSection,
  ScrollableArea,
  ResourceIcon,
  Pill,
  Tree,
  Attribute,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";

import type { MetadataNode } from "./resource-metadata.js";

export interface EdgeMetadataProps {
  source: MetadataNode;
  target: MetadataNode;
  inflights: { name: string }[];
  onConnectionNodeClick?: (path: string) => void;
}

export const EdgeMetadata = ({
  source,
  target,
  inflights,
  onConnectionNodeClick,
}: EdgeMetadataProps) => {
  const { theme } = useTheme();

  const [openInspectorSections, setOpenInspectorSections] = useState(() => [
    "properties",
  ]);

  const toggleInspectorSection = useCallback((section: string) => {
    setOpenInspectorSections(([...sections]) => {
      const index = sections.indexOf(section);
      if (index === -1) {
        sections.push(section);
        return sections;
      } else {
        sections.splice(index, 1);
        return sections;
      }
    });
  }, []);

  const entries = useMemo(() => {
    return inflights.map((inflight) => {
      return {
        id: inflight.name,
        name: inflight.name,
      };
    });
  }, [inflights]);

  return (
    <ScrollableArea
      overflowY
      className={classNames("h-full text-sm", theme.bg3, theme.text1)}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2 px-2 py-2 truncate w-1/2">
          <div className="flex-shrink-0">
            <ArrowPathRoundedSquareIcon className="w-6 h-6" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="text-sm font-medium truncate">Relationship</div>
            <div className="flex">
              <Pill>Relationship</Pill>
            </div>
          </div>
        </div>
      </div>

      <InspectorSection
        text="Properties"
        icon={ArrowsRightLeftIcon}
        open={openInspectorSections.includes("properties")}
        onClick={() => toggleInspectorSection("properties")}
        headingClassName="pl-2"
      >
        <div
          className={classNames(
            "border-t",
            theme.border4,
            "px-2 py-1.5 flex flex-col gap-y-1 gap-x-4",
            "text-slate-900 dark:text-slate-250",
          )}
        >
          <Attribute name="Source">
            <button
              className={classNames(
                theme.bg3Hover,
                theme.text1,
                "w-full max-w-full truncate text-sm flex items-center gap-1 min-w-0",
                "border border-transparent rounded",
              )}
              title={source.path}
              onClick={() => onConnectionNodeClick?.(source.path)}
            >
              <div className="flex items-center gap-1.5 ml-2 5 min-w-0">
                <div className="flex-shrink-0 -ml-1">
                  <ResourceIcon
                    className="w-4 h-4"
                    resourceType={source.type}
                    resourcePath={source.path}
                  />
                </div>
                <div className="truncate">{source.id}</div>
              </div>
            </button>
          </Attribute>
          <Attribute name="Target">
            <button
              className={classNames(
                theme.bg3Hover,
                theme.text1,
                "w-full max-w-full truncate text-sm flex items-center gap-1 min-w-0",
                "border border-transparent rounded",
              )}
              title={target.path}
              onClick={() => onConnectionNodeClick?.(target.path)}
            >
              <div className="flex items-center gap-1.5 ml-2 5 min-w-0">
                <div className="flex-shrink-0 -ml-1">
                  <ResourceIcon
                    className="w-4 h-4"
                    resourceType={target.type}
                    resourcePath={target.path}
                  />
                </div>
                <div className="truncate">{target.id}</div>
              </div>
            </button>
          </Attribute>

          <div className="border-t border-transparent">
            <Attribute name="Access" centerLabel={false}>
              <div className="w-full">
                <Tree
                  entries={entries}
                  selectedEntries={[]}
                  onSelectionChange={() => {}}
                  className="min-h-[6rem] h-48 overflow-y-auto resize-y"
                />
              </div>
            </Attribute>
          </div>
        </div>
      </InspectorSection>
      <div className={classNames(theme.border3, "border-t")}></div>
    </ScrollableArea>
  );
};
