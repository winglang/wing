import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import {
  useTheme,
  InspectorSection,
  Attribute,
  ScrollableArea,
  ResourceIcon,
  Pill,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useState } from "react";
import { MetadataNode } from "./resource-metadata";

export interface EdgeMetadataProps {
  source: MetadataNode;
  target: MetadataNode;
  inflights: { name: string }[];
}

export const EdgeMetadata = ({
  source,
  target,
  inflights,
}: EdgeMetadataProps) => {
  const { theme } = useTheme();

  const [openInspectorSections, setOpenInspectorSections] = useState(() => [
    "inflights",
  ]);

  const toggleInspectorSection = (section: string) => {
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
  };

  return (
    <ScrollableArea
      overflowY
      className={classNames("h-full text-sm", theme.bg3, theme.text1)}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2 px-2 py-2 truncate w-1/2">
          <div className="flex-shrink-0">
            <ResourceIcon
              className="w-6 h-6"
              resourceType={source.type}
              resourcePath={source.path}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="text-sm font-medium truncate" title={source.id}>
              {source.id}
            </div>
            <div className="flex" title={source.type}>
              <Pill>{source.type}</Pill>
            </div>
          </div>
        </div>

        <div className="items-center flex">
          <ArrowRightIcon className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-2 px-2 py-2 truncate w-1/2">
          <div className="flex grow" />
          <div className="flex-shrink-0">
            <ResourceIcon
              className="w-6 h-6"
              resourceType={target.type}
              resourcePath={target.path}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="text-sm font-medium truncate" title={target.id}>
              {target.id}
            </div>
            <div className="flex" title={target.type}>
              <Pill>{target.type}</Pill>
            </div>
          </div>
        </div>
      </div>

      <InspectorSection
        text="Inflights"
        icon={ArrowsRightLeftIcon}
        open={openInspectorSections.includes("inflights")}
        onClick={() => toggleInspectorSection("inflights")}
        headingClassName="pl-2"
      >
        <div className={classNames("border-t", theme.border4)}>
          {inflights.map((inflight) => (
            <div
              className={classNames(
                theme.bg3,
                theme.bg3Hover,
                theme.text1,
                "w-full flex-shrink-0 max-w-full truncate text-sm pl-4 pr-2 py-1 flex items-center gap-1 min-w-0",
              )}
            >
              <div className="flex items-center gap-1.5 ml-2.5 min-w-0 truncate">
                {inflight.name}
              </div>
            </div>
          ))}
        </div>
      </InspectorSection>
    </ScrollableArea>
  );
};
