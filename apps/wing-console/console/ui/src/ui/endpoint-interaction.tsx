import { useTheme, Button, Attribute } from "@wingconsole/design-system";
import classNames from "classnames";
import { useId, useMemo } from "react";

import type { EndpointItem } from "../shared/endpoint-item.js";

export interface EndpointInteractionProps {
  endpoint: EndpointItem | undefined;
  exposeEndpoint: () => void;
  hideEndpoint: () => void;
}

export const EndpointInteraction = ({
  endpoint,
  exposeEndpoint,
  hideEndpoint,
}: EndpointInteractionProps) => {
  const { theme } = useTheme();

  const actualValueElementId = useId();
  if (!endpoint) {
    return;
  }

  return (
    <div
      className={classNames(
        "h-full flex flex-1 flex-col py-1",
        theme.bg3,
        theme.text2,
      )}
    >
      <div className="flex flex-col items-start">
        <Attribute name="URL" value={endpoint.url} noLeftPadding />

        <Attribute
          name="Status"
          value={
            endpoint.exposeStatus === "connected" ? "Exposed" : "Not Exposed"
          }
          noLeftPadding
          className="my-1"
        />

        <div
          className={classNames("w-full my-2 flex gap-2 min-w-0 justify-end")}
        >
          {(endpoint.exposeStatus === "disconnected" ||
            endpoint.exposeStatus === "connecting") && (
            <Button
              small
              title="Open a tunnel for this enpoint"
              disabled={endpoint.exposeStatus === "connecting"}
              className="px-0.5 h-7 content-end"
              onClick={exposeEndpoint}
            >
              Expose
            </Button>
          )}
          {endpoint.exposeStatus === "connected" && (
            <Button
              small
              title="Close the tunnel for this endpoint"
              className="px-0.5 h-7 content-end"
              onClick={hideEndpoint}
            >
              Hide Endpoint
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
