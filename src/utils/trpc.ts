import { createReactQueryHooks } from "@trpc/react";

import { Router } from "../../electron/main/router/index.js";

// todo [sa] mock trpc query in case loading as a webapp
export const trpc = createReactQueryHooks<Router>();
