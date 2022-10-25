export type { Simulator } from "@monadahq/wingsdk/lib/testing/index.js";
export type { WingSimulatorSchema } from "@monadahq/wingsdk/lib/sim/exports.js";

import type {
  BucketClient,
  FunctionClient,
  QueueClient,
} from "@monadahq/wingsdk/lib/sim/exports.js";
import {
  BucketClient as BucketClientImpl,
  FunctionClient as FunctionClientImpl,
  QueueClient as QueueClientImpl,
  // @ts-expect-error
} from "@monadahq/wingsdk/sim";

export const createBucketClient = (address: string): BucketClient =>
  new BucketClientImpl(address);

export const createFunctionClient = (address: string): FunctionClient =>
  new FunctionClientImpl(address);

export const createQueueClient = (address: string): QueueClient =>
  new QueueClientImpl(address);
