import {
  createConsoleServer,
  CreateConsoleServerOptions,
  LogInterface,
  Updater,
  Config,
  HostUtils,
  Trace,
} from "@wingconsole/server";
import express from "express";
import { createAnalytics } from "./analytics";
import { getAnonymousId } from "./anonymous-id";

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
  onExpressCreated?: CreateConsoleServerOptions["onExpressCreated"];
}

const staticDir = `${__dirname}/vite`;

const { SEGMENT_WRITE_KEY } = process.env;

export const createConsoleApp = async (options: CreateConsoleAppOptions) => {
  const analytics = SEGMENT_WRITE_KEY
    ? createAnalytics({
        anonymousId: getAnonymousId(),
        segmentWriteKey: SEGMENT_WRITE_KEY,
      })
    : undefined;

  analytics?.track("console_session_start");

  const server = await createConsoleServer({
    ...options,
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
      const resourceName = trace.sourceType.replace("wingsdk.cloud.", "");
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

      // general interaction event
      analytics.track(
        'console_resource_interact',
          {
            resource: resourceName,
            action,
          }
      );
      // resrouce specific event
      analytics.track(
        `console_${resourceName}_${action}`,
          {
            message: trace?.data?.message.substring(0, MAX_ANALYTICS_STRING_LENGTH) || '',
            status: trace?.data?.status.substring(0, MAX_ANALYTICS_STRING_LENGTH) || 'unknown',
            result: trace?.data?.result.substring(0, MAX_ANALYTICS_STRING_LENGTH) || 'unknown',
          }
      );
    },
    log: options.log ?? {
      info() {},
      error: console.error,
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
  return server;
};
