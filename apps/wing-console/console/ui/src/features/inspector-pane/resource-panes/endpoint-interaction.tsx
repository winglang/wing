import { useTheme, Button, Attribute } from "@wingconsole/design-system";
import classNames from "classnames";
import { useId, useMemo } from "react";

import type { EndpointItem } from "../../endpoints-pane/endpoint-item.js";

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

  const toggleId = useId();
  const publicUrl = useMemo(() => {
    if (!endpoint) {
      return "";
    }

    if (endpoint.exposeStatus === "connected") {
      return endpoint.url;
    }

    return "<not exposed>";
  }, [endpoint]);

  return (
    <div
      className={classNames(
        "h-full flex flex-1 flex-col",
        theme.bg3,
        theme.text2,
      )}
    >
      <div className="flex flex-col gap-1">
        <Attribute name="Local URL" value={endpoint?.localUrl} noLeftPadding />

        <Attribute name="Public URL" value={publicUrl} noLeftPadding />

        <div className="flex flex-row items-center">
          <label
            htmlFor={toggleId}
            className="min-w-[100px] invisible text-slate-500 dark:text-slate-400"
          >
            Toggle exposed
          </label>

          {(endpoint?.exposeStatus === "disconnected" ||
            endpoint?.exposeStatus === "connecting") && (
            <Button
              id={toggleId}
              small
              title="Open a tunnel for this endpoint"
              disabled={endpoint.exposeStatus === "connecting"}
              className="px-0.5 h-7 content-end"
              onClick={exposeEndpoint}
            >
              {endpoint.exposeStatus === "connecting"
                ? "Exposing..."
                : "Expose"}
            </Button>
          )}

          {endpoint?.exposeStatus === "connected" && (
            <Button
              id={toggleId}
              small
              title="Close the tunnel for this endpoint"
              className="px-0.5 h-7 content-end"
              onClick={hideEndpoint}
            >
              Hide
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
