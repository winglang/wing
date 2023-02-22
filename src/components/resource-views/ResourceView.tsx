import { BucketView } from "./BucketView.js";
import { CounterView } from "./CounterView.js";
import { FunctionView } from "./FunctionView.js";
import { QueueView } from "./QueueView.js";
import { UnsupportedView } from "./UnsupportedView.js";

export interface ResourceViewProps {
  resourceType: string;
  resourcePath: string;
}
export const ResourceView = ({
  resourceType,
  resourcePath,
}: ResourceViewProps) => {
  const getResourceView = () => {
    switch (resourceType) {
      case "wingsdk.cloud.Queue": {
        return <QueueView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Function": {
        return <FunctionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Bucket": {
        return <BucketView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Counter": {
        return <CounterView resourcePath={resourcePath} />;
      }
      default: {
        return (
          <UnsupportedView
            resourcePath={resourcePath}
            resourceType={resourceType}
          />
        );
      }
    }
  };

  return <div className="flex-1 flex w-full">{getResourceView()}</div>;
};
