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
import { legalConsent } from "./legal-consent";

export type {
  LogInterface,
  Updater,
  Config,
  HostUtils,
  UpdaterStatus,
  Trace,
} from "@wingconsole/server";

export interface CreateConsoleAppOptions {
  wingfile: string;
  log?: LogInterface;
  updater?: Updater;
  config?: Config;
  requestedPort?: number;
  hostUtils?: HostUtils;
  onTrace?: (trace: Trace) => void;
  onExpressCreated?: CreateConsoleServerOptions["onExpressCreated"];
  needLegalConsent?: boolean;
}

const staticDir = `${__dirname}/vite`;

const { SEGMENT_WRITE_KEY } = process.env;

export const createConsoleApp = async (options: CreateConsoleAppOptions) => {

  if(options.needLegalConsent) {
    const accepted = await legalConsent();
    if(!accepted) {
      return;
    }
  }

  const analytics = SEGMENT_WRITE_KEY
    ? createAnalytics({
        anonymousId: getAnonymousId(),
        segmentWriteKey: SEGMENT_WRITE_KEY,
      })
    : undefined;

  analytics?.track("Console Application Started");

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
      analytics.track(
        `console application: ${resourceName}: ${action} ${JSON.stringify(
          Object.assign({}, trace, trace.data),
        )}`,
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
