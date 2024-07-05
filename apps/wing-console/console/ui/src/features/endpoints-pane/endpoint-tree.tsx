import {
  ScrollableArea,
  Toolbar,
  TreeView,
  useNotifications,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { useEndpointsWarning } from "../inspector-pane/resource-panes/use-endpoints-warning.js";
import { useEndpoints } from "../inspector-pane/resource-panes/use-endpoints.js";

import { EndpointTreeItem } from "./endpoint-tree-item.js";
import type { EndpointItem } from "./endpoint-tree-item.js";
import { EndpointsWarningModal } from "./endpoints-warning-modal.js";
import { NoEndpoints } from "./no-endpoints.js";

export const EndpointTree = () => {
  const { endpointList, exposeEndpoint, hideEndpoint } = useEndpoints();
  const { warningAccepted, notifyWarningAccepted } = useEndpointsWarning();
  const { showNotification } = useNotifications();

  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(true);
  useEffect(() => {
    if (warningAccepted.data?.warningAccepted === true) {
      setShowWarningModal(false);
    }
  }, [warningAccepted.data]);

  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointItem>();

  const loading = useMemo(
    () => exposeEndpoint.isLoading || hideEndpoint.isLoading,
    [exposeEndpoint.isLoading, hideEndpoint.isLoading],
  );

  const expose = useCallback(
    async (endpoint: EndpointItem) => {
      await exposeEndpoint.mutateAsync({ resourcePath: endpoint.id });
      showNotification(`${endpoint.label}`, {
        type: "info",
        body: "The endpoint is now exposed.",
      });
    },
    [exposeEndpoint, showNotification],
  );

  const onExposeEndpoint = useCallback(
    async (endpoint: EndpointItem) => {
      setSelectedEndpoint(endpoint);

      if (showWarningModal) {
        setWarningModalVisible(true);
        return;
      }
      expose(endpoint);
    },
    [showWarningModal, expose],
  );

  const onHideEndpoint = useCallback(
    async (endpoint: EndpointItem) => {
      setSelectedEndpoint(endpoint);
      await hideEndpoint.mutateAsync({ resourcePath: endpoint.id });
    },
    [hideEndpoint],
  );

  const onAcceptWarning = useCallback(async () => {
    if (!selectedEndpoint) {
      return;
    }
    notifyWarningAccepted.mutate();
    setShowWarningModal(false);
    setWarningModalVisible(false);
    expose(selectedEndpoint);
  }, [notifyWarningAccepted, expose, selectedEndpoint]);

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
      setInitialNotification(false);

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
    }
  }, [endpointList.data, showNotification, initialNotification]);

  const { theme } = useTheme();

  const endpointsSortedList = useMemo(() => {
    if (!endpointList.data) {
      return [];
    }
    return [...endpointList.data].sort(
      (a, b) =>
        a.exposeStatus.localeCompare(b.exposeStatus) ||
        a.label.localeCompare(b.label),
    );
  }, [endpointList.data]);

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
              {endpointsSortedList.length === 0 && <NoEndpoints />}

              <TreeView>
                {endpointsSortedList.map((endpoint) => (
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
        visible={warningModalVisible}
        onExpose={onAcceptWarning}
        onCancel={() => setWarningModalVisible(false)}
      />
    </div>
  );
};
