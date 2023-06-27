import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathRoundedSquareIcon,
  ArrowRightIcon,
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
            <div className="text-sm font-medium truncate">{source.id}</div>
            <div className="flex">
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
            <div className="text-sm font-medium truncate">{target.id}</div>
            <div className="flex">
              <Pill>{target.type}</Pill>
            </div>
          </div>
        </div>
      </div>

      <InspectorSection
        text="Inflights"
        icon={CubeTransparentIcon}
        open={openInspectorSections.includes("inflights")}
        onClick={() => toggleInspectorSection("inflights")}
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
            {inflights.map((inflight) => (
              <Attribute
                key={inflight.name}
                name="Name"
                value={inflight.name}
              />
            ))}
          </div>
        </div>
      </InspectorSection>
    </ScrollableArea>
  );
};
