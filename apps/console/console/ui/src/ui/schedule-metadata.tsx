import { useTheme, Attribute } from "@wingconsole/design-system";
import classNames from "classnames";

import { MetadataNode } from "./resource-metadata.js";

export interface ScheduleMetadataProps {
  node: MetadataNode;
}

export const ScheduleMetadata = ({ node }: ScheduleMetadataProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        "px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4",
        theme.bg3,
        theme.text2,
      )}
    >
      <Attribute name="Cron expression" value={node.props?.cronExpression} />
    </div>
  );
};
