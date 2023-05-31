import { ResourceNode } from "../../ui/detailed-node.js";
import { trpc } from "../../utils/trpc.js";

export interface BucketResourceDetailsProps {
  resource: ResourceNode;
}

export const BucketValue = ({ resource }: BucketResourceDetailsProps) => {
  const resourcePath = resource.path;
  const bucketList = trpc["bucket.list"].useQuery({ resourcePath });

  return (
    <>
      <dt className="truncate">Files</dt>
      <dd className="truncate col-span-4">
        {bucketList.data?.length}{" "}
        {bucketList.data?.length === 1 ? "file" : "files"}
      </dd>
    </>
  );
};
