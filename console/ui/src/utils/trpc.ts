import { createTRPCReact } from "@trpc/react-query";
import type { Router } from "@wingconsole/server";

export const trpc = createTRPCReact<Router>({
  unstable_overrides: {
    useMutation: {
      /**
       * This function is called whenever a `.useMutation` succeeds
       **/
      async onSuccess(options) {
        /**
         * @note that order here matters:
         * The order here allows route changes in `onSuccess` without
         * having a flash of content change whilst redirecting.
         **/
        // Calls the `onSuccess` defined in the `useQuery()`-options:
        await options.originalFn();
        // Invalidate all queries in the react-query cache:
        await options.queryClient.invalidateQueries();
      },
    },
  },
});
