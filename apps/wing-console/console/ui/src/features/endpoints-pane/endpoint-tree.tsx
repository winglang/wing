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
  useNotifications,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useEndpointsWarning } from "../inspector-pane/resource-panes/use-endpoints-warning.js";
import { useEndpoints } from "../inspector-pane/resource-panes/use-endpoints.js";

import type { EndpointItem } from "./endpoint-item.js";
import { EndpointsWarningModal } from "./endpoints-warning-modal.js";
import { NoEndpoints } from "./no-endpoints.js";

const EndpointTreeViewItem = ({
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
          {loading && <SpinnerLoader size="xs" />}
          {!loading && (
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
          aria-disabled={loading}
          className={classNames(
            "flex gap-1 items-center",
            "justify-between group/endpoint-tree-item",
            !loading && "hover:underline text-sky-500 hover:text-sky-600",
            loading && "text-slate-400 cursor-not-allowed",
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
          disabled={loading || disabled}
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

export const EndpointTree = () => {
  const { endpointList, exposeEndpoint, hideEndpoint } = useEndpoints();
  const { requireAcceptWarning, notifyAcceptWarning } = useEndpointsWarning();
  const { showNotification } = useNotifications();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointItem>();
  const [initialNotification, setInitialNotification] = useState(true);

  const loading = useMemo(
    () => exposeEndpoint.isLoading || hideEndpoint.isLoading,
    [exposeEndpoint.isLoading, hideEndpoint.isLoading],
  );

  const onExposeEndpoint = useCallback(
    async (endpoint: EndpointItem) => {
      setSelectedEndpoint(endpoint);

      if (requireAcceptWarning.data?.requireAcceptWarning === true) {
        setShowWarningModal(true);
        return;
      }
      await exposeEndpoint.mutateAsync({ resourcePath: endpoint.id });
      showNotification(`Endpoint "${endpoint.label}" is exposed`, {
        type: "info",
      });
    },
    [exposeEndpoint, showNotification, requireAcceptWarning.data],
  );

  const onHideEndpoint = useCallback(
    async (endpoint: EndpointItem) => {
      setSelectedEndpoint(endpoint);
      await hideEndpoint.mutateAsync({ resourcePath: endpoint.id });
      showNotification(`Endpoint "${endpoint.label}" is hidden`, {
        type: "info",
      });
    },
    [hideEndpoint, showNotification],
  );

  const onAcceptWarning = useCallback(async () => {
    if (selectedEndpoint) {
      notifyAcceptWarning.mutate();
      setShowWarningModal(false);
      await onExposeEndpoint(selectedEndpoint);
      setSelectedEndpoint(undefined);
    }
  }, [notifyAcceptWarning, onExposeEndpoint, selectedEndpoint]);

  useEffect(() => {
    if (exposeEndpoint.error) {
      showNotification(exposeEndpoint.error.message, { type: "error" });
    }
  }, [exposeEndpoint.error, showNotification]);

  useEffect(() => {
    if (!initialNotification) {
      return;
    }
    if (endpointList.data) {
      const exposedEndpoints = endpointList.data
        .filter((endpoint) => endpoint.exposeStatus === "connected")
        .map((endpoint) => endpoint.label);

      if (exposedEndpoints.length === 0) {
        return;
      }

      showNotification("The following endpoints are exposed", {
        body: exposedEndpoints.map((label) => <div key={label}>{label}</div>),
        type: "info",
      });
      setInitialNotification(false);
    }
  }, [endpointList.data, showNotification, initialNotification]);

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
              {endpointList.data?.length === 0 && <NoEndpoints />}

              <TreeView>
                {endpointList.data?.map((endpoint) => (
                  <EndpointTreeViewItem
                    key={endpoint.id}
                    endpoint={endpoint}
                    loading={loading && selectedEndpoint?.id === endpoint.id}
                    disabled={loading && selectedEndpoint?.id !== endpoint.id}
                    onExposeEndpoint={() => onExposeEndpoint(endpoint)}
                    onHideEndpoint={() => onHideEndpoint(endpoint)}
                  />
                ))}
              </TreeView>
            </div>
          </ScrollableArea>
        </div>
      </div>

      <EndpointsWarningModal
        visible={showWarningModal}
        onContinue={onAcceptWarning}
        onCancel={() => setShowWarningModal(false)}
      />
    </div>
  );
};
