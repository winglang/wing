import {
  TRPCLink,
  transformRPCResponse,
  TRPCAbortError,
  TRPCClientError,
} from "@trpc/client";

import { Router } from "../../electron/main/router/index.js";

export function ipcLink(): TRPCLink<Router> {
  return (runtime) => {
    return ({ op, prev, onDestroy }) => {
      const promise = (window as any).electronTRPC.rpc(op);
      let isDone = false;

      const prevOnce: typeof prev = (result) => {
        if (isDone) {
          return;
        }
        isDone = true;
        prev(result);
      };

      onDestroy(() => {
        prevOnce(TRPCClientError.from(new TRPCAbortError(), { isDone: true }));
      });

      promise
        .then((envelope: any) => {
          const response = transformRPCResponse({ envelope, runtime });
          prevOnce(response);
        })
        .catch((error: any) => {
          prevOnce(TRPCClientError.from(error));
        });
    };
  };
}
