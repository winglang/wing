import { Attribute, Button, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export interface QueueMetadataProps {
  approxSize: number;
  timeout: number;
  onPurgeClick: () => void;
}
export const QueueMetadata = ({
  approxSize,
  timeout,
  onPurgeClick,
}: QueueMetadataProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "px-2 pt-1.5 flex flex-col gap-y-1 gap-x-4",
        theme.bg3,
        theme.text2,
      )}
    >
      <Attribute name="Timeout" value={`${timeout}s`} />
      <Attribute name="Approx size">
        <div className="flex gap-2">
          <label>{approxSize}</label>
          <Button
            small
            label="Purge"
            onClick={onPurgeClick}
            disabled={approxSize === 0}
          />
        </div>
      </Attribute>
    </div>
  );
};
