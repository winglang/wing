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
    <TreeItem
      key={endpoint.id}
      itemId={endpoint.id}
      selectable={false}
      title={endpointTitle}
      icon={
        <>
          {isLoading && <SpinnerLoader size="xs" />}
          {!isLoading && (
            <>
              {endpoint.exposeStatus === "disconnected" && (
                <div className={classNames("size-4", theme.text2)}>
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
                <GlobeAltIcon className={classNames("size-4", theme.text1)} />
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
          aria-disabled={isLoading}
          className={classNames(
            "flex gap-1 items-center",
            "justify-between group/endpoint-tree-item",
            !isLoading && "hover:underline text-sky-500 hover:text-sky-600",
            isLoading && "text-slate-400 cursor-not-allowed",
          )}
        >
          <span className="truncate">{endpoint.label}</span>
          <ArrowTopRightOnSquareIcon
            className={classNames(
              "size-4 shrink-0 hidden",
              "group-hover/endpoint-tree-item:block",
            )}
          />
        </a>
      }
      secondaryLabel={
        <Button
          small
          disabled={isLoading || disabled}
          className="min-w-[5rem] justify-center"
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
  );
};
