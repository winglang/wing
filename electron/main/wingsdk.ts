export type {
  WingSimulatorSchema,
  BaseResourceSchema,
} from "@monadahq/wingsdk/lib/sim/exports.js";
export type { Simulator } from "@monadahq/wingsdk/lib/testing/index.js";

import type {
  BucketClient,
  FunctionClient,
  QueueClient,
} from "@monadahq/wingsdk/lib/sim/exports.js";
import type {
  Simulator,
  SimulatorProps,
} from "@monadahq/wingsdk/lib/testing/index.js";
import {
  BucketClient as BucketClientImpl,
  FunctionClient as FunctionClientImpl,
  QueueClient as QueueClientImpl,
  // @ts-expect-error
} from "@monadahq/wingsdk/sim";
import {
  Simulator as SimulatorImpl,
  // @ts-expect-error
} from "@monadahq/wingsdk/testing";

export const createBucketClient = (address: string): BucketClient =>
  new BucketClientImpl(address);

export const createFunctionClient = (address: string): FunctionClient =>
  new FunctionClientImpl(address);

export const createQueueClient = (address: string): QueueClient =>
  new QueueClientImpl(address);

export const createSimulator = (props: SimulatorProps): Simulator =>
  new SimulatorImpl(props);
