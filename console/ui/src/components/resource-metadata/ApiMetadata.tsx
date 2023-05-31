import { Attribute } from "@wingconsole/design-system";
import { useContext } from "react";

import { AppContext } from "../../AppContext.js";
import { MetadataNode } from "../../ui/resource-metadata.js";
import { trpc } from "../../utils/trpc.js";

export interface ApiMetadataProps {
  node: MetadataNode;
}

export const ApiMetadata = ({ node }: ApiMetadataProps) => {
  const schema = trpc["api.schema"].useQuery({
    resourcePath: node.path,
  });
  const { appMode } = useContext(AppContext);

  return (
    <>
      {appMode !== "webapp" && (
        <Attribute name="URL" value={schema.data?.url} />
      )}
    </>
  );
};
