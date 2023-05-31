import { BucketView } from "../components/resource-views/BucketView.js";
import { FunctionView } from "../components/resource-views/FunctionView.js";
import { QueueView } from "../components/resource-views/QueueView.js";
import { RedisView } from "../components/resource-views/RedisView.js";
import { TopicView } from "../components/resource-views/TopicView.js";
import { UnsupportedView } from "../components/resource-views/UnsupportedView.js";

import { ApiView } from "./api-view.js";
import { CounterInteractionView } from "./counter-interaction-view.js";
import { ScheduleInteractionView } from "./schedule-interaction-view.js";
import { TableInteractionView } from "./table-interaction-view.js";

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
        return <QueueView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Function": {
        return <FunctionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Bucket": {
        return <BucketView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Counter": {
        return <CounterInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Api": {
        return <ApiView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Topic": {
        return <TopicView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Table": {
        return <TableInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.cloud.Schedule": {
        return <ScheduleInteractionView resourcePath={resourcePath} />;
      }
      case "wingsdk.redis.Redis": {
        return <RedisView resourcePath={resourcePath} />;
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

  return getResourceView();
};
