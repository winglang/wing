import {
  createTRPCProxyClient,
  httpLink,
  createWSClient,
  splitLink,
  wsLink,
} from "@trpc/client";

import type { ExplorerItem, Router } from "@wingconsole/server";
import ws from "ws";

export interface SubscriptionOptions {
  onData: (data: any) => void;
  onError: (error: any) => void;
}

export interface Client {
  selectedNode: () => Promise<string | undefined>;
  setSelectedNode: (resourcePath: string) => Promise<void>;
  listTests: () => Promise<any[]>;
  runTest: (resourcePath: string) => Promise<any>;
  listResources: () => Promise<ExplorerItem>;
  invalidateQueries: () => Promise<void>;
  onInvalidateQuery: (options: SubscriptionOptions) => ws.Subscription;
}

export const createTRPCClient = (url: string): Client => {
  const trpcUrl = `${url}/trpc`;
  const wsClient = createWSClient({
    url: `ws:${trpcUrl}`,
  });
  const client = createTRPCProxyClient<Router>({
    links: [
      splitLink({
        condition(op) {
          return op.type === "subscription";
        },
        true: wsLink({
          client: wsClient,
        }),
        false: httpLink({
          url: trpcUrl,
        }),
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

  const onInvalidateQuery = (options: SubscriptionOptions) => {
    return client["app.invalidateQuery"].subscribe(undefined, options);
  };

  return {
    selectedNode,
    setSelectedNode,
    listTests,
    runTest,
    listResources,
    invalidateQueries,
    onInvalidateQuery,
  };
};
