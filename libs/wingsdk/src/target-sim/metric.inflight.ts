import { MetricBackendProps } from "./metric";
import { IResource, IResourceContext } from "./resource";
import {
  IMetricClient,
  MetricQueryOptions,
  MetricRecord,
  MetricRecordOptions,
} from "../cloud";

export class MetricBackend implements IResource, IMetricClient {
  private _records: MetricRecord[] = [];

  constructor(_ctx: IResourceContext, _props: MetricBackendProps) {}

  public async onStart(): Promise<void> {
    // TODO: load state
  }

  public async onStop(): Promise<void> {
    // TODO: save state
  }

  public async publish(opts: MetricRecordOptions): Promise<void> {
    this._records.push({
      timestamp: opts.timestamp ?? new Date(),
      value: opts.value,
    });
  }

  public async query(options: MetricQueryOptions): Promise<MetricRecord[]> {
    const records = [];
    for (const record of this._records) {
      if (
        (!options.startTime || record.timestamp >= options.startTime) &&
        (!options.endTime || record.timestamp <= options.endTime)
      ) {
        records.push(record);
      }
    }
    return records;
  }
}
