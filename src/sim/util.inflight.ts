import { createTRPCClient } from "@trpc/client";

export interface WingLocalClientOptions {
  /**
   * HTTP URL of API.
   */
  url: string;

  /**
   * Implementation of fetch.
   */
  fetch?: typeof fetch;
}

export function createWingLocalClient(options: WingLocalClientOptions) {
  const client = createTRPCClient(options);
  return client;
}
