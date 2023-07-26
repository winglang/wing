import { createTRPCProxyClient, httpLink } from "@trpc/client";

import type { Router } from "@wingconsole/server";

export interface Client {
  selectedNode: () => Promise<string>;
  setSelectedNode: (resourcePath: string) => Promise<void>;
  listTests: () => Promise<any[]>;
  runTest: (resourcePath: string) => Promise<any>;
  listResources: () => Promise<any[]>;
  invalidateQueries: () => Promise<void>;
}

export const createTRPCClient = (url: string): Client => {
  const client = createTRPCProxyClient<Router>({
    links: [
      httpLink({
        url: `${url}/trpc`,
      }),
    ],
  });

  const selectedNode = () => {
    return client["app.selectedNode"].query();
  };

  const setSelectedNode = (resourcePath: string) => {
    return client["app.selectNode"].mutate({
      resourcePath,
    });
  };

  const listTests = () => {
    return client["test.list"].query();
  };

  const runTest = (resourcePath: string) => {
    return client["test.run"].mutate({
      resourcePath,
    });
  };

  const listResources = () => {
    return client["app.explorerTree"].query();
  };

  const invalidateQueries = () => {
    return client["app.invalidateQueries"].mutate();
  };

  return {
    selectedNode,
    setSelectedNode,
    listTests,
    runTest,
    listResources,
    invalidateQueries,
  };
};
