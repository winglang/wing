import { memo, useCallback, useContext } from "react";

import { trpc } from "../../trpc.js";
import { useConsoleEnvironment } from "../console-environment-context/console-environment-context.js";
import { useSelectionContext } from "../selection-context/selection-context.js";
import { TestsContext } from "../tests-pane/tests-context.js";

import { EdgeMetadata } from "./resource-panes/edge-metadata.js";
import { ResourceMetadata } from "./resource-panes/resource-metadata.js";

export const Inspector = memo(() => {
  const { expand, setSelectedItems, selectedItems, selectedEdgeId } =
    useSelectionContext();

  const { showTests } = useContext(TestsContext);

  const { consoleEnvironment } = useConsoleEnvironment();

  const metadata = trpc["app.nodeMetadata"].useQuery(
    {
      path: selectedItems[0],
      showTests,
      environmentId: consoleEnvironment,
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

  const onConnectionNodeClick = useCallback(
    (path: string) => {
      expand(path);
      setSelectedItems([path]);
    },
    [expand, setSelectedItems],
  );

  return (
    <>
      {metadata.data && (
        <ResourceMetadata
          node={metadata.data?.node}
          inbound={metadata.data?.inbound}
          outbound={metadata.data?.outbound}
          onConnectionNodeClick={onConnectionNodeClick}
        />
      )}

      {selectedEdgeId && edgeMetadata.data && (
        <EdgeMetadata
          source={edgeMetadata.data.source}
          target={edgeMetadata.data.target}
          inflights={edgeMetadata.data.inflights}
          onConnectionNodeClick={onConnectionNodeClick}
        />
      )}
    </>
  );
});
