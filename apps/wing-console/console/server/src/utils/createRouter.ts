import { initTRPC } from "@trpc/server";
import { testing } from "@winglang/sdk";
import { Trace } from "@winglang/sdk/lib/std/test-runner.js";
import Emittery from "emittery";

import { Config } from "../config.js";
import { ConsoleLogger } from "../consoleLogger.js";
import { HostUtils } from "../hostUtils.js";
import { State } from "../types.js";
import { Updater } from "../updater.js";

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

export interface LayoutConfig {
  header?: {
    hide?: boolean;
    showThemeToggle?: boolean;
  };
  explorer?: {
    hide?: boolean;
  };
  testsTree?: {
    hide?: boolean;
    position?: "default" | "bottom";
  };
  logs?: {
    hide?: boolean;
    size?: "default" | "small";
  };
  statusBar?: {
    hide?: boolean;
    showThemeToggle?: boolean;
  };
  errorScreen?: {
    position?: "default" | "bottom";
    displayTitle?: boolean;
    displayLinks?: boolean;
  };
}

export interface RouterContext {
  simulator(): Promise<testing.Simulator>;
  appDetails(): Promise<{
    wingVersion: string | undefined;
  }>;
  errorMessage(): string | undefined;
  emitter: Emittery<{
    invalidateQuery: string | undefined;
    trace: Trace;
  }>;
  appState(): State;
  logger: ConsoleLogger;
  updater?: Updater;
  config?: Config;
  hostUtils?: HostUtils;
  wingfile: string;
  requireAcceptTerms?: boolean;
  layoutConfig?: LayoutConfig;
}

const t = initTRPC.context<RouterContext>().create();
export const createRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const createProcedure = t.procedure;
