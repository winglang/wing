import { memo, useCallback } from "react";

import { ApiInteractionView } from "./api-interaction-view.js";
import { BucketInteractionView } from "./bucket-interaction-view.js";
import { CounterInteractionView } from "./counter-interaction-view.js";
import { EndpointInteractionView } from "./endpoint-interaction-view.js";
import { FunctionInteractionView } from "./function-interaction-view.js";
import { QueueInteractionView } from "./queue-interaction-view.js";
import { ScheduleInteractionView } from "./schedule-interaction-view.js";
import { TopicInteractionView } from "./topic-interaction-view.js";
import { UnsupportedInteractionView } from "./unsupported-interaction-view.js";
import { WebsiteInteractionView } from "./website-interaction-view.js";

export interface ResourceViewProps {
  resourceType: string;
  resourcePath: string;
}

export const ResourceInteractionView = memo(
  ({ resourceType, resourcePath }: ResourceViewProps) => {
    const getResourceView = useCallback(() => {
      switch (resourceType) {
        case "@winglang/sdk.cloud.Queue": {
          return <QueueInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Function": {
          return <FunctionInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Bucket": {
          return <BucketInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Counter": {
          return <CounterInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Api": {
          return <ApiInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Topic": {
          return <TopicInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Schedule": {
          return <ScheduleInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Website": {
          return <WebsiteInteractionView resourcePath={resourcePath} />;
        }
        case "@winglang/sdk.cloud.Endpoint": {
          return <EndpointInteractionView resourcePath={resourcePath} />;
        }
        default: {
          return <UnsupportedInteractionView resourceType={resourceType} />;
        }
      }
    }, [resourcePath, resourceType]);

    return (
      <div data-testid={`resource-interaction:${resourcePath}`}>
        {getResourceView()}
      </div>
    );
  },
);
