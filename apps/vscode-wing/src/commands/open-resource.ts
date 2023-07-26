import { Client } from "../services/trpc";

export const openResource = (client: Client) => {
  const run = async (resourcePath: string) => {
    await client.setSelectedNode(resourcePath);
    await client.invalidateQueries();
  };
  return {
    run,
  };
};
