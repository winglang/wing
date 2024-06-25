import {
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ScrollableArea,
  SpinnerLoader,
  Toolbar,
  TreeItem,
  TreeView,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

import type { EndpointItem } from "./endpoint-item.js";
import { NoEndpoints } from "./no-endpoints.js";

export interface EndpointTreeProps {
  endpointList: EndpointItem[];
  exposeEndpoint: (resourcePath: string) => void;
  hideEndpoint: (resourcePath: string) => void;
}

const getEndpointTitle = (exposeStatus: EndpointItem["exposeStatus"]) => {
  switch (exposeStatus) {
    case "disconnected": {
      return "Endpoint is not exposed";
    }
    case "connecting": {
      return "Connecting";
    }
    case "connected": {
      return "Endpoint is exposed";
    }
  }
};

export const EndpointTree = ({
  endpointList,
  exposeEndpoint,
  hideEndpoint,
}: EndpointTreeProps) => {
  const { theme } = useTheme();

  // list or map of endpoint ids that are currently being hidden
  const [hidingEndpoint, setHidingEndpoint] = useState<string[]>();

  const onHideEndpoint = useCallback(
    (endpointId: string) => {
      setHidingEndpoint((previousHidingEndpoint) => {
        return previousHidingEndpoint?.includes(endpointId)
          ? previousHidingEndpoint.filter((id) => id !== endpointId)
          : [...(previousHidingEndpoint || []), endpointId];
      });
      hideEndpoint(endpointId);
    },
    [hideEndpoint],
  );

  useEffect(() => {
    const isHidingEndpointDisconnected =
      hidingEndpoint &&
      endpointList.find(
        (endpoint) =>
          endpoint.exposeStatus === "disconnected" &&
          hidingEndpoint.includes(endpoint.id),
      );
    if (isHidingEndpointDisconnected) {
      setHidingEndpoint(undefined);
    }
  }, [endpointList, hidingEndpoint]);

  const isLoading = useCallback(
    (endpoint: EndpointItem) => {
      return (
        endpoint.exposeStatus === "connecting" ||
        hidingEndpoint?.includes(endpoint.id)
      );
    },
    [hidingEndpoint],
  );

  return (
    <div
      className={classNames("w-full h-full flex flex-col", theme.bg3)}
      data-testid="endpoint-tree-menu"
    >
      <Toolbar title="Endpoints"></Toolbar>

      <div className="relative grow">
        <div className="absolute inset-0">
          <ScrollableArea
            overflowY
            className={classNames(
              "h-full w-full text-sm flex flex-col gap-1",
              theme.bg3,
              theme.text2,
            )}
          >
            <div className="flex flex-col">
              {endpointList.length === 0 && <NoEndpoints />}
              <TreeView>
                {endpointList.map((endpoint) => (
                  <TreeItem
                    key={endpoint.id}
                    itemId={endpoint.id}
                    selectable={false}
                    title={getEndpointTitle(endpoint.exposeStatus)}
                    icon={
                      <>
                        {isLoading(endpoint) && <SpinnerLoader size="xs" />}
                        {!isLoading(endpoint) && (
                          <>
                            {endpoint.exposeStatus === "disconnected" && (
                              <div
                                className={classNames("size-4", theme.text1)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                  />

                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3l18 18"
                                  />
                                </svg>
                              </div>
                            )}

                            {endpoint.exposeStatus === "connected" && (
                              <GlobeAltIcon
                                className={classNames("size-4", theme.text1)}
                              />
                            )}
                          </>
                        )}
                      </>
                    }
                    label={
                      <a
                        href={endpoint.url}
                        target="_blank"
                        rel="noreferrer"
                        title={endpoint.url}
                        aria-disabled={isLoading(endpoint)}
                        className={classNames(
                          "flex gap-1 items-center",
                          "justify-between group",
                          !isLoading(endpoint) &&
                            "hover:underline text-sky-500 hover:text-sky-600",
                          isLoading(endpoint) &&
                            "text-slate-400 cursor-not-allowed",
                        )}
                      >
                        <span className="truncate">{endpoint.label}</span>
                        <ArrowTopRightOnSquareIcon className="size-4 shrink-0 hidden group-hover:block" />
                      </a>
                    }
                    secondaryLabel={
                      <>
                        {(endpoint.exposeStatus === "disconnected" ||
                          endpoint.exposeStatus === "connecting") && (
                          <Button
                            small
                            transparent
                            disabled={isLoading(endpoint)}
                            onClick={() => {
                              exposeEndpoint(endpoint.id);
                            }}
                          >
                            Open
                          </Button>
                        )}
                        {endpoint.exposeStatus === "connected" && (
                          <Button
                            small
                            disabled={isLoading(endpoint)}
                            onClick={() => {
                              onHideEndpoint(endpoint.id);
                            }}
                          >
                            Close
                          </Button>
                        )}
                      </>
                    }
                  />
                ))}
              </TreeView>
            </div>
          </ScrollableArea>
        </div>
      </div>
    </div>
  );
};
