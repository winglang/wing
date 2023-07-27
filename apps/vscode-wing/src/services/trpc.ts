import {
  createTRPCProxyClient,
  httpLink,
  createWSClient,
  splitLink,
  wsLink,
} from "@trpc/client";

import type { ExplorerItem, Router } from "@wingconsole/server";
import { TestItem } from "../TestsExplorerProvider";

export interface SubscriptionOptions {
  onData: (data: any) => void;
  onError: (error: any) => void;
}

export interface Client {
  selectedNode: () => Promise<string | undefined>;
  setSelectedNode: (resourcePath: string) => Promise<void>;
  listTests: () => Promise<TestItem[]>;
  runTest: (resourcePath: string) => Promise<any>;
  listResources: () => Promise<ExplorerItem>;
  onInvalidateQuery: (options: SubscriptionOptions) => void;
  close: () => void;
}

export const createTRPCClient = (host: string): Client => {
  const url = `${host}/trpc`;

  const wsClient = createWSClient({
    url: `ws://${url}`,
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
          url: `http://${url}`,
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

  const listTests = (): Promise<TestItem[]> => {
    return client["test.list"].query().then((res: any) =>
      res.map((test: any) => {
        return {
          id: test.id,
          label: test.label,
          status: "pending",
          time: 0,
        };
      })
    );
  };

  const runTest = (resourcePath: string) => {
    return client["test.run"].mutate({
      resourcePath,
    });
  };

  const listResources = () => {
    return client["app.explorerTree"].query();
  };

  const onInvalidateQuery = (options: SubscriptionOptions) => {
    return client["app.invalidateQuery"].subscribe(undefined, options);
  };

  const close = () => {
    wsClient.close();
  };

  return {
    selectedNode,
    setSelectedNode,
    listTests,
    runTest,
    listResources,
    onInvalidateQuery,
    close,
  };
};
