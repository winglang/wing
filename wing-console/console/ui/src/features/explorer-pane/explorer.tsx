import { memo, useCallback, useState } from "react";

import { useSelectionContext } from "../selection-context/selection-context.js";

import { MapView } from "./map-view.js";

export const Explorer = memo(() => {
  const {
    selectedItems,
    setSelectedItems,
    expand,
    collapse,
    expandedItems,
    selectedEdgeId,
    setSelectedEdgeId,
  } = useSelectionContext();

  const setSelectedItemSingle = useCallback(
    (nodeId: string | undefined) => setSelectedItems(nodeId ? [nodeId] : []),
    [setSelectedItems],
  );

  return (
    <MapView
      selectedNodeId={selectedItems[0]}
      onSelectedNodeIdChange={setSelectedItemSingle}
      selectedEdgeId={selectedEdgeId}
      onSelectedEdgeIdChange={setSelectedEdgeId}
      onExpand={expand}
      onCollapse={collapse}
      expandedItems={expandedItems}
    />
  );
});
