import { useContext } from "react";

import { AppContext } from "../../AppContext.js";
import { trpc } from "../../utils/trpc.js";
import { AttributeView } from "../AttributeView.js";
import { MetadataNode } from "../MetadataPanel.js";

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
        <AttributeView name="URL" value={schema.data?.url} />
      )}
    </>
  );
};
