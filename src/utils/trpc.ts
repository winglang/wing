import { createReactQueryHooks } from "@trpc/react";

import type { WingLocalRouter } from "@monadahq/wing-local-client";

export const trpc = createReactQueryHooks<WingLocalRouter>();
