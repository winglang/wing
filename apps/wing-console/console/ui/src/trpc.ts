import { createTRPCReact } from "@trpc/react-query";
import type { Router } from "@wingconsole/server";

export type { Router } from "@wingconsole/server";

export const trpc = createTRPCReact<Router>();
