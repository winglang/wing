import {
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  SpinnerLoader,
  TreeItem,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useMemo } from "react";

export type EndpointExposeStatus = "connected" | "disconnected" | "connecting";

export interface EndpointItem {
  id: string;
  label?: string;
  url?: string;
  localUrl?: string;
  browserSupport: boolean;
  exposeStatus: EndpointExposeStatus;
}

export const EndpointTreeItem = ({
  endpoint,
  loading,
  disabled,
  onExposeEndpoint,
  onHideEndpoint,
}: {
  endpoint: EndpointItem;
  loading: boolean;
  disabled: boolean;
  onExposeEndpoint: () => void;
  onHideEndpoint: () => void;
}) => {
  const { theme } = useTheme();

  const isLoading = useMemo(
    () => loading || endpoint.exposeStatus === "connecting",
    [loading, endpoint.exposeStatus],
  );

  const buttonLabel = useMemo(() => {
    if (endpoint.exposeStatus === "connected") {
      return loading ? "Closing" : "Close";
    }
    if (endpoint.exposeStatus === "disconnected") {
      return loading ? "Exposing" : "Expose";
    }
    if (endpoint.exposeStatus === "connecting") {
      return "Exposing";
    }
  }, [endpoint.exposeStatus, loading]);

  const endpointTitle = useMemo(() => {
    switch (endpoint.exposeStatus) {
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
  }, [endpoint.exposeStatus]);

  return (
    <div className=" group/endpoint-tree-item ">
      <TreeItem
        key={endpoint.id}
        itemId={endpoint.id}
        selectable={false}
        title={endpointTitle}
        icon={
          <div className="flex size-4 justify-center items-center">
            {isLoading && (
              <div className="relative">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75" />
                <div className="size-1.5 rounded-full bg-gray-500" />
              </div>
            )}
            {!isLoading && endpoint.exposeStatus === "connected" && (
              <div className="size-1.5 rounded-full bg-green-500" />
            )}
            {!isLoading && endpoint.exposeStatus === "disconnected" && (
              <div className="size-1.5 rounded-full bg-gray-400" />
            )}
          </div>
        }
        label={
          <div className="truncate flex justify-between items-center">
            <span className="truncate">{endpoint.label}</span>
            <a
              href={endpoint.url}
              target="_blank"
              rel="noreferrer"
              title={endpoint.url}
              aria-disabled={isLoading}
              className={classNames(
                "hidden group-hover/endpoint-tree-item:block",
                !isLoading && "text-sky-500 hover:text-sky-600",
                isLoading && "text-slate-400 cursor-not-allowed",
              )}
            >
              <ArrowTopRightOnSquareIcon className="size-4 shrink-0" />
            </a>
          </div>
        }
        secondaryLabel={
          <Button
            small
            disabled={isLoading || disabled}
            className="min-w-[4.2rem] justify-center"
            onClick={() => {
              if (endpoint.exposeStatus === "connected") {
                onHideEndpoint();
              } else {
                onExposeEndpoint();
              }
            }}
          >
            {buttonLabel}
          </Button>
        }
      />
    </div>
  );
};
