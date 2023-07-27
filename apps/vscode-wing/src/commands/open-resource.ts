import { Client } from "../services/trpc";

export const openResource = async (client: Client, resourcePath: string) => {
  await client.setSelectedNode(resourcePath);
};
