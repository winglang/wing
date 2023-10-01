import { ApiInteractionView } from "./api-interaction-view.js";
import { BucketInteractionView } from "./bucket-interaction-view.js";
import { CounterInteractionView } from "./counter-interaction-view.js";
import { DynamodbTableInteractionView } from "./dynamodb-table-interaction-view.js";
import { FunctionInteractionView } from "./function-interaction-view.js";
import { QueueInteractionView } from "./queue-interaction-view.js";
import { RedisInteractionView } from "./redis-interaction-view.js";
import { ScheduleInteractionView } from "./schedule-interaction-view.js";
import { TableInteractionView } from "./table-interaction-view.js";
import { TopicInteractionView } from "./topic-interaction-view.js";
import { UnsupportedInteractionView } from "./unsupported-interaction-view.js";
import { WebsiteInteractionView } from "./website-interaction-view.js";

export interface ResourceViewProps {
  resourceType: string;
  resourcePath: string;
}
export const ResourceInteractionView = ({
  resourceType,
  resourcePath,
}: ResourceViewProps) => {
  const getResourceView = () => {
    switch (resourceType) {
      case "wingsdk.cloud.Queue": {
        return <QueueInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Function": {
        return <FunctionInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Bucket": {
        return <BucketInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Counter": {
        return <CounterInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Api": {
        return <ApiInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Topic": {
        return <TopicInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Table": {
        return <TableInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Schedule": {
        return <ScheduleInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.redis.Redis": {
        return <RedisInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Website": {
        return <WebsiteInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.ex.DynamodbTable": {
        return <DynamodbTableInteractionView resourcePath={resourcePath} />;
      }
      default: {
        return <UnsupportedInteractionView resourceType={resourceType} />;
      }
    }
  };

  return (
    <div data-testid={`resource-interaction:${resourcePath}`}>
      {getResourceView()}
    </div>
  );
};
