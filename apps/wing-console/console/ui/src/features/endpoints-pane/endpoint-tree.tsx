import {
  GlobeAltIcon,
  LinkIcon,
  ShareIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  ScrollableArea,
  SpinnerIcon,
  SpinnerLoader,
  Toolbar,
  TreeItem,
  TreeView,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";

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
                        {endpoint.exposeStatus === "disconnected" && (
                          <EyeSlashIcon
                            className={classNames("size-4", theme.text1)}
                          />
                        )}
                        {endpoint.exposeStatus === "connecting" && (
                          <SpinnerLoader size="xs" />
                        )}
                        {endpoint.exposeStatus === "connected" && (
                          <GlobeAltIcon
                            className={classNames("size-4", theme.text1)}
                          />
                        )}
                      </>
                    }
                    label={
                      <a
                        href={endpoint.url}
                        target="_blank"
                        rel="noreferrer"
                        title={endpoint.url}
                        aria-disabled={endpoint.exposeStatus === "connecting"}
                        className={classNames(
                          endpoint.exposeStatus !== "connecting" &&
                            "hover:underline text-sky-500 hover:text-sky-600",
                          endpoint.exposeStatus === "connecting" &&
                            "text-slate-400 cursor-not-allowed",
                        )}
                      >
                        {endpoint.label}
                      </a>
                    }
                    secondaryLabel={
                      <>
                        {(endpoint.exposeStatus === "disconnected" ||
                          endpoint.exposeStatus === "connecting") && (
                          <Button
                            small
                            transparent
                            disabled={endpoint.exposeStatus === "connecting"}
                            onClick={() => {
                              exposeEndpoint(endpoint.id);
                            }}
                          >
                            Open
                          </Button>
                        )}
                        {endpoint.exposeStatus == "connected" && (
                          <Button
                            small
                            onClick={() => {
                              hideEndpoint(endpoint.id);
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
