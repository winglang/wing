import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Button, TreeItem } from "@wingconsole/design-system";
import classNames from "classnames";
import { memo, useMemo } from "react";

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

  const StatusIcon = memo(
    ({
      loading,
      status,
    }: {
      loading: boolean;
      status: EndpointExposeStatus;
    }) => {
      return (
        <div className="flex size-4 justify-center items-center">
          {loading && (
            <div className="relative">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75" />
              <div className="size-2 rounded-full bg-yellow-500" />
            </div>
          )}
          {!loading && status === "connected" && (
            <div className="size-2 rounded-full bg-green-400" />
          )}
          {!loading && status === "disconnected" && (
            <div className="size-2 rounded-full border border-gray-400" />
          )}
        </div>
      );
    },
  );

  return (
    <div className=" group/endpoint-tree-item ">
      <TreeItem
        key={endpoint.id}
        itemId={endpoint.id}
        selectable={false}
        title={endpointTitle}
        icon={
          <div className="flex size-4 justify-center items-center">
            {<StatusIcon loading={isLoading} status={endpoint.exposeStatus} />}
          </div>
        }
        label={
          <div className="truncate">
            <a
              href={endpoint.url}
              target="_blank"
              rel="noreferrer"
              title={endpoint.url}
              aria-disabled={isLoading}
              className={classNames(
                " flex justify-between items-center gap-0.5",
                !isLoading &&
                  "text-sky-500 hover:text-sky-600 dark:hover:text-sky-400",
                isLoading &&
                  "text-slate-400 dark:text-slate-500 cursor-not-allowed",
              )}
            >
              <span className="truncate">{endpoint.label}</span>
              <ArrowTopRightOnSquareIcon
                className={classNames(
                  "size-4 shrink-0",
                  "hidden",
                  !isLoading && "group-hover/endpoint-tree-item:block",
                )}
              />
            </a>
          </div>
        }
        secondaryLabel={
          <Button
            small
            disabled={isLoading || disabled}
            className="min-w-[4.3rem] justify-center"
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
