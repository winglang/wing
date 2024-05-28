import { Construct } from "constructs";
import { fqnForType } from "../constants";
import { Node, Resource } from "../std";

/**
 * Global identifier for `Metric`.
 */
export const METRIC_FQN = fqnForType("cloud.Metric");

/**
 * Options for `Metric`.
 */
export interface MetricProps {
  /**
   * The metric's name.
   * @example "bytesUploaded"
   */
  readonly name: string;

  /**
   * The metric's unit.
   * @example "bytes"
   */
  readonly unit: string;

  /**
   * The metric's description.
   * @example "The number of requests made to the website."
   * @default - no description
   */
  readonly description?: string;
}

/**
 * A cloud metric.
 * @inflight `@winglang/sdk.cloud.IMetricClient`
 * @abstract
 */
export class Metric extends Resource {
  constructor(scope: Construct, id: string, props: MetricProps) {
    if (new.target === Metric) {
      return Resource._newFromFactory(METRIC_FQN, scope, id, props);
    }

    super(scope, id);

    Node.of(this).title = "Metric";
    Node.of(this).description = "A cloud metric";
  }
}

/**
 * Inflight interface for `Metric`.
 */
export interface IMetricClient {
  /**
   * Publish one or more metric data points.
   * @param record the metric data
   * @inflight
   */
  publish(record: MetricRecordOptions): Promise<void>;

  /**
   * Query metric data.
   * @param opts the query options
   * @inflight
   */
  query(opts: MetricQueryOptions): Promise<Array<MetricRecord>>;
}

/**
 * Input options for `publish`.
 */
export interface MetricRecordOptions {
  /**
   * The timestamp of the metric.
   * @default - the current time
   */
  readonly timestamp?: Date;

  /**
   * The value of the metric.
   */
  readonly value: number;
}

/**
 * A metric data point.
 */
export interface MetricRecord {
  /**
   * The timestamp of the metric.
   */
  readonly timestamp: Date;

  /**
   * The value of the metric.
   */
  readonly value: number;
}

/**
 * Input options for `query`.
 */
export interface MetricQueryOptions {
  /**
   * The start time of the query.
   */
  readonly startTime: Date;

  /**
   * The end time of the query.
   */
  readonly endTime: Date;

  // TODO: period
  // TODO: statistic
}

export enum MetricInflightMethods {
  PUBLISH = "publish",
  QUERY = "query",
}
