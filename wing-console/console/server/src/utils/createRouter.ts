import { initTRPC, TRPCError } from "@trpc/server";
import type { simulator } from "@winglang/sdk";
import type Emittery from "emittery";
import * as z from "zod";

import type { Config } from "../config.js";
import type { ConsoleLogger } from "../consoleLogger.js";
import type { EnvironmentsManager } from "../environments-manager.js";
import type { HostUtils } from "../hostUtils.js";
import type { ConsoleEnvironmentId } from "../types.js";
import type { State, Trace } from "../types.js";
import type { Updater } from "../updater.js";

import type { Analytics } from "./analytics.js";
import type { TestRunner } from "./test-runner/test-runner.js";

export type QueryNames = {
  query:
    | "app.error"
    | "app.logs"
    | "app.state"
    | "queue.approxSize"
    | "updater.currentStatus"
    | "config.getThemeMode"
    | "website.url"
    | undefined;
};

export type RouterEvents = {
  invalidateQuery: QueryNames;
};

export type LayoutComponentType = "explorer" | "tests" | "logs" | "endpoints";

export interface LayoutComponent {
  type: LayoutComponentType;
}

export interface LayoutPanel {
  hide?: boolean;
  components?: LayoutComponent[];
  size?: "small" | "default";
}

export interface LayoutConfig {
  leftPanel?: LayoutPanel;
  bottomPanel?: LayoutPanel;
  rightPanel?: LayoutPanel;
  statusBar?: {
    hide?: boolean;
    showThemeToggle?: boolean;
  };
  errorScreen?: {
    position?: "default" | "bottom";
    displayLinks?: boolean;
  };
  panels?: {
    rounded?: boolean;
  };
}

export interface FileLink {
  path: string;
  line?: number;
  column?: number;
}

export interface RouterMeta {
  analytics?: {
    action: string;
    resource: string;
  };
}

export interface RouterContext {
  simulator(): Promise<simulator.Simulator>;
  restartSimulator(): Promise<void>;
  appDetails(): Promise<{
    wingVersion: string | undefined;
  }>;
  errorMessage(): string | undefined;
  emitter: Emittery<{
    invalidateQuery: string | undefined;
    trace: Trace;
    openFileInEditor: FileLink;
  }>;
  appState(): State;
  logger: ConsoleLogger;
  updater?: Updater;
  config?: Config;
  hostUtils?: HostUtils;
  wingfile: string;
  requireAcceptTerms?: boolean;
  layoutConfig?: LayoutConfig;
  getSelectedNode(): string | undefined;
  setSelectedNode: (node: string) => void;
  getTestRunner(): TestRunner;
  analyticsAnonymousId?: string;
  requireSignIn?(): Promise<boolean>;
  notifySignedIn?(): Promise<void>;
  analytics?: Analytics;
  getEndpointWarningAccepted?(): Promise<boolean>;
  notifyEndpointWarningAccepted?(): Promise<void>;
  // consoleEnvironmentId: ConsoleEnvironmentId | undefined;
  getEnvironmentsManager(): EnvironmentsManager;
}

const t = initTRPC.context<RouterContext>().meta<RouterMeta>().create();
export const createRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;

const invalidateQueriesAfterMutation = middleware(async (options) => {
  const result = await options.next();

  if (options.type === "mutation") {
    options.ctx.emitter.emit("invalidateQuery", undefined);
  }

  return result;
});

const sendUserResourceInteractionAnalyticsEvent = middleware(
  async (options) => {
    const analytics = options.ctx.analytics;
    const meta = options.meta?.analytics;
    if (analytics && meta) {
      analytics.track("user_resource_interaction", {
        resource: meta.resource,
        action: meta.action,
      });
    }
    return await options.next();
  },
);

export const createProcedure = t.procedure
  .use(invalidateQueriesAfterMutation)
  .use(sendUserResourceInteractionAnalyticsEvent) as typeof t.procedure;

export const environmentIdShape = z.custom<ConsoleEnvironmentId>((value) => {
  return typeof value === "string"
    ? value === "local" || value.startsWith("local-test:")
    : false;
});

export const createEnvironmentProcedure = createProcedure
  .input(
    z.object({
      environmentId: environmentIdShape,
    }),
  )
  .use(async ({ input, ctx, next }) => {
    const environmentsManager = ctx.getEnvironmentsManager();
    return next({
      ctx: {
        async simulator() {
          try {
            return environmentsManager.getSimulatorForEnvironment(
              input.environmentId,
            );
          } catch (error) {
            throw new TRPCError({
              code: "TIMEOUT",
              message: "Environment not ready yet",
              cause: error,
            });
          }
        },
      },
    });
  });
