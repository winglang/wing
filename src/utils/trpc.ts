import type { WingLocalRouter } from "@monadahq/wing-local-client";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<WingLocalRouter>();
