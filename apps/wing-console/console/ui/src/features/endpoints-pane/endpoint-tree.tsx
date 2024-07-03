import {
  ScrollableArea,
  Toolbar,
  TreeView,
  useNotifications,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useEndpointsWarning } from "../inspector-pane/resource-panes/use-endpoints-warning.js";
import { useEndpoints } from "../inspector-pane/resource-panes/use-endpoints.js";

import { EndpointTreeItem } from "./endpoint-tree-item.js";
import type { EndpointItem } from "./endpoint-tree-item.js";
import { EndpointsWarningModal } from "./endpoints-warning-modal.js";
import { NoEndpoints } from "./no-endpoints.js";

export const EndpointTree = () => {
  const { endpointList, exposeEndpoint, hideEndpoint } = useEndpoints();
  const { requireAcceptWarning, notifyWarningAccepted } = useEndpointsWarning();
  const { showNotification } = useNotifications();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointItem>();

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
    },
    [hideEndpoint],
  );

  const onAcceptWarning = useCallback(async () => {
    if (selectedEndpoint) {
      notifyWarningAccepted.mutate();
      setShowWarningModal(false);
      await onExposeEndpoint(selectedEndpoint);
      setSelectedEndpoint(undefined);
    }
  }, [notifyWarningAccepted, onExposeEndpoint, selectedEndpoint]);

  useEffect(() => {
    if (exposeEndpoint.error) {
      showNotification(exposeEndpoint.error.message, { type: "error" });
    }
  }, [exposeEndpoint.error, showNotification]);

  const [initialNotification, setInitialNotification] = useState(true);

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
        autoCloseDelayMs: 15_000,
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
                  <EndpointTreeItem
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
