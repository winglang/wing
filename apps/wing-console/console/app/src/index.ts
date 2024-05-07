import type {
  CreateConsoleServerOptions,
  LogInterface,
  Updater,
  Config,
  HostUtils,
  Trace,
  LayoutConfig,
} from "@wingconsole/server";
import { createConsoleServer, isTermsAccepted } from "@wingconsole/server";
import express from "express";

import { createAnalytics } from "./analytics.js";
import { AnalyticsStorage } from "./storage.js";

export type {
  LogInterface,
  Updater,
  Config,
  HostUtils,
  UpdaterStatus,
  Trace,
} from "@wingconsole/server";

const MAX_ANALYTICS_STRING_LENGTH = 1024;

export interface CreateConsoleAppOptions {
  wingfile: string;
  log?: LogInterface;
  updater?: Updater;
  config?: Config;
  requestedPort?: number;
  hostUtils?: HostUtils;
  onTrace?: (trace: Trace) => void;
  expressApp?: express.Express;
  onExpressCreated?: CreateConsoleServerOptions["onExpressCreated"];
  requireAcceptTerms?: boolean;
  requireSignIn?: boolean;
  layoutConfig?: LayoutConfig;
  platform?: string[];
  stateDir?: string;
  open?: boolean;
  watchGlobs?: string[];
}

const staticDir = `${__dirname}/vite`;

const SEGMENT_WRITE_KEY = process.env.SEGMENT_WRITE_KEY;
const WING_DISABLE_ANALYTICS = process.env.WING_DISABLE_ANALYTICS;

export const createConsoleApp = async (options: CreateConsoleAppOptions) => {
  const analyticsStorage = new AnalyticsStorage();
  const analytics =
    SEGMENT_WRITE_KEY && !WING_DISABLE_ANALYTICS
      ? createAnalytics({
          anonymousId: analyticsStorage.getAnonymousId(),
          segmentWriteKey: SEGMENT_WRITE_KEY,
        })
      : undefined;

  analytics?.track("console_session_start");

  const server = await createConsoleServer({
    ...options,
    analyticsAnonymousId: analyticsStorage.getAnonymousId(),
    analytics,
    async requireSignIn() {
      if (options.requireSignIn === false) {
        return false;
      }

      // The VSCode extension for Wing will use this to determine whether to show the sign in prompt.
      const noSignIn = process.env.NO_SIGN_IN === "true";
      if (noSignIn) {
        return false;
      }
      return analyticsStorage.getRequireSignIn();
    },
    async notifySignedIn() {
      analyticsStorage.notifySignedIn();
    },
    onExpressCreated(app) {
      app.use(express.static(staticDir));
      options.onExpressCreated?.(app);
    },
    onTrace(trace) {
      if (!analytics) {
        return;
      }
      if (trace.type !== "resource") {
        return;
      }
      if (options.requireAcceptTerms && !isTermsAccepted()) {
        return;
      }

      const resourceName = trace.sourceType.replace("@winglang/sdk.cloud.", "");
      if (!trace.data.message.includes("(")) {
        return;
      }
      // extracting the action name.
      // trace message for resources looks like this:
      // 'Invoke (payload="{\\"messages\\":[\\"dfd\\"]}").'
      const action = trace.data.message.slice(
        0,
        Math.max(0, trace.data.message.indexOf("(")),
      );

      const properties = {
        message:
          trace?.data?.message?.slice(
            0,
            Math.max(0, MAX_ANALYTICS_STRING_LENGTH),
          ) || "",
        status:
          trace?.data?.status?.slice(
            0,
            Math.max(0, MAX_ANALYTICS_STRING_LENGTH),
          ) || "unknown",
        result:
          trace?.data?.result?.slice(
            0,
            Math.max(0, MAX_ANALYTICS_STRING_LENGTH),
          ) || "unknown",
      };

      // general interaction event
      analytics.track("console_resource_interact", {
        resource: resourceName,
        action,
        ...properties,
      });
    },
    log: options.log ?? {
      info() {},
      error: console.error,
      warning() {},
      verbose() {},
    },
    config: options.config ?? {
      addEventListener(event, listener) {},
      removeEventListener(event, listener) {},
      get(key) {
        return undefined as any;
      },
      set(key, value) {},
    },
  });

  if (options.open) {
    const { openBrowser } = await import("./open.js");
    openBrowser(`http://localhost:${server.port}/`);
  }

  return server;
};
