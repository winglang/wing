import { createTRPCProxyClient, httpLink } from "@trpc/client";
import type { Router } from "@wingconsole/server";

export type { Router } from "@wingconsole/server";

export const createTRPCClient = (url: string) => {
  return createTRPCProxyClient<Router>({
    links: [
      httpLink({
        url: `${url}/trpc`,
      }),
    ],
  });
};
