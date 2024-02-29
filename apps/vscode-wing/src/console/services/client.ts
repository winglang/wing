import {
  createTRPCProxyClient,
  httpLink,
  createWSClient,
  splitLink,
  wsLink,
} from "@trpc/client";

import type { ExplorerItem, Router, LogEntry } from "@wingconsole/server";

import { EndpointItem } from "../explorer-providers/EndpointsExplorerProvider";
import { TestItem } from "../explorer-providers/TestsExplorerProvider";

export interface SubscriptionOptions {
  onData: (data: any) => void;
  onError: (error: any) => void;
}

export interface Client {
  url: string;
  getLogs: ({ time }: { time?: number }) => Promise<LogEntry[]>;
  selectedNode: () => Promise<string | undefined>;
  setSelectedNode: (resourcePath: string) => Promise<void>;
  listTests: () => Promise<TestItem[]>;
  runTest: (resourcePath: string) => Promise<any>;
  runAllTests: () => Promise<any>;
  listResources: () => Promise<ExplorerItem>;
  listEndpoints: () => Promise<EndpointItem[]>;
  onInvalidateQuery: (options: SubscriptionOptions) => void;
  onOpenFileInEditor: (options: SubscriptionOptions) => void;
  close: () => void;
}

export const createClient = (host: string): Client => {
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

  const getLogs = ({ time }: { time?: number }) => {
    return client["app.logs"].query({
      filters: {
        level: {
          verbose: true,
          info: true,
          warn: true,
          error: true,
        },
        text: "",
        timestamp: time || 0,
      },
    });
  };

  const selectedNode = () => {
    return client["app.selectedNode"].query();
  };

  const setSelectedNode = (resourcePath: string) => {
    return client["app.selectNode"].mutate({
      resourcePath,
    });
  };

  const listTests = (): Promise<TestItem[]> => {
    return client["test.list"].query();
  };

  const runTest = (resourcePath: string) => {
    return client["test.run"].mutate({
      resourcePath,
    });
  };

  const runAllTests = () => {
    return client["test.runAll"].mutate();
  };

  const listResources = () => {
    return client["app.explorerTree"].query();
  };

  const listEndpoints = (): Promise<EndpointItem[]> => {
    return client["endpoint.list"].query();
  };

  const onInvalidateQuery = (options: SubscriptionOptions) => {
    return client["app.invalidateQuery"].subscribe(undefined, options);
  };

  const onOpenFileInEditor = (options: SubscriptionOptions) => {
    return client["app.openFileInEditorSubscription"].subscribe(
      undefined,
      options,
    );
  };

  const close = () => {
    wsClient.close();
  };

  return {
    url,
    getLogs,
    selectedNode,
    setSelectedNode,
    listTests,
    runTest,
    runAllTests,
    listResources,
    listEndpoints,
    onInvalidateQuery,
    onOpenFileInEditor,
    close,
  };
};
