import { initTRPC } from "@trpc/server";
import type { simulator } from "@winglang/sdk";
import type Emittery from "emittery";

import type { Config } from "../config.js";
import type { ConsoleLogger } from "../consoleLogger.js";
import type { HostUtils } from "../hostUtils.js";
import type { State, Trace } from "../types.js";
import type { Updater } from "../updater.js";

import type { Analytics } from "./analytics.js";

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
  statusBar?: {
    hide?: boolean;
    showThemeToggle?: boolean;
  };
  errorScreen?: {
    position?: "default" | "bottom";
    displayTitle?: boolean;
    displayLinks?: boolean;
  };
  panels?: {
    rounded?: boolean;
  };
}

export type TestStatus = "pending" | "running" | "success" | "error";

export interface TestItem {
  id: string;
  label: string;
  status: TestStatus;
  time?: number;
}

export interface TestsStateManager {
  getTests: () => TestItem[];
  setTests: (tests: TestItem[]) => void;
  setTest: (test: TestItem) => void;
}

export interface FileLink {
  path: string;
  line?: number;
  column?: number;
}

export interface RouterContext {
  simulator(): Promise<simulator.Simulator>;
  testSimulator(): Promise<simulator.Simulator>;
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
  getSelectedNode: () => string | undefined;
  setSelectedNode: (node: string) => void;
  testsStateManager: () => TestsStateManager;
  analyticsAnonymousId?: string;
  requireSignIn?: () => Promise<boolean>;
  notifySignedIn?: () => Promise<void>;
  analytics?: Analytics;
}

const t = initTRPC.context<RouterContext>().create();
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

export const createProcedure = t.procedure.use(
  invalidateQueriesAfterMutation,
) as typeof t.procedure;
