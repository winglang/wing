import { createReactQueryHooks } from "@trpc/react";

import { Router } from "electron/main/router";

export const trpc = createReactQueryHooks<Router>();
