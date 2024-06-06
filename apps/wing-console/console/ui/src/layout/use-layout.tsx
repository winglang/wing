import { useTheme } from "@wingconsole/design-system";
import type { State } from "@wingconsole/server";
import { useLoading } from "@wingconsole/use-loading";
import { useEffect, useState, useContext, useMemo, useCallback } from "react";

import { trpc } from "../services/trpc.js";
import { useExplorer } from "../services/use-explorer.js";
import { TestsContext } from "../tests-context.js";

export interface UseLayoutProps {
  cloudAppState: State;
}

export const useLayout = ({ cloudAppState }: UseLayoutProps) => {
  const { theme } = useTheme();

  const {
    items,
    selectedItems,
    setSelectedItems,
    expandedItems,
    setExpandedItems,
    expand,
    collapse,
    expandAll,
    collapseAll,
  } = useExplorer();

  const errorMessage = trpc["app.error"].useQuery();
  const { showTests } = useContext(TestsContext);

  const [selectedEdgeId, setSelectedEdgeId] = useState<string>();

  const onSelectedItemsChange = useCallback(
    (items: string[]) => {
      setSelectedEdgeId(undefined);
      setSelectedItems(items);
    },
    [setSelectedItems],
  );

  const onSelectedEdgeIdChange = useCallback(
    (edgeId: string | undefined) => {
      onSelectedItemsChange([]);
      setSelectedEdgeId(edgeId);
    },
    [onSelectedItemsChange],
  );

  const wingfile = trpc["app.wingfile"].useQuery();
  const title = useMemo(() => {
    if (!wingfile.data) {
      return "Wing Console";
    }
    return `${wingfile.data} - Wing Console`;
  }, [wingfile.data]);

  const metadata = trpc["app.nodeMetadata"].useQuery(
    {
      path: selectedItems[0],
      showTests,
    },
    {
      enabled: selectedItems.length > 0,
    },
  );

  const edgeMetadata = trpc["app.edgeMetadata"].useQuery(
    {
      edgeId: selectedEdgeId || "",
    },
    {
      enabled: !!selectedEdgeId,
    },
  );

  const restartSimulatorMutation = trpc["app.restart"].useMutation();

  const { loading, setLoading } = useLoading({
    duration: 400,
  });

  const restartSimulator = useCallback(async () => {
    setSelectedItems(["root"]);
    await restartSimulatorMutation.mutateAsync();
  }, [restartSimulatorMutation, setSelectedItems]);

  useEffect(() => {
    setLoading(
      cloudAppState === "loadingSimulator" || cloudAppState === "compiling",
    ),
      [cloudAppState, items.length];
  });

  const onResourceClick = useCallback(
    (path: string) => {
      setSelectedItems([path]);
    },
    [setSelectedItems],
  );

  return {
    items,
    selectedItems,
    setSelectedItems: onSelectedItemsChange,
    expandedItems,
    setExpandedItems,
    expand,
    collapse,
    expandAll,
    collapseAll,
    theme,
    errorMessage,
    loading,
    metadata,
    selectedEdgeId,
    setSelectedEdgeId: onSelectedEdgeIdChange,
    edgeMetadata,
    showTests,
    onResourceClick,
    title,
    wingfile,
    restartSimulator,
    restarting: restartSimulatorMutation.isLoading,
  };
};
