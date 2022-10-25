import { createReactQueryHooks } from "@trpc/react";

import { Router } from "electron/main/router/index.js";

export const trpc = createReactQueryHooks<Router>();
