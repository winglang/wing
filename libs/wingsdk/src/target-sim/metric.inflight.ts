import { MetricAttributes, MetricSchema } from "./schema-resources";
import {
  IMetricClient,
  MetricQueryOptions,
  MetricRecord,
  MetricRecordOptions,
} from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator";

export class Metric implements ISimulatorResourceInstance, IMetricClient {
  private _records: MetricRecord[] = [];
  private _context: ISimulatorContext | undefined;

  constructor(_props: MetricSchema) {}

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<MetricAttributes> {
    this._context = context;
    return {};
  }

  public async cleanup(): Promise<void> {}

  public async save(): Promise<void> {}

  public async plan() {
    return UpdatePlan.AUTO;
  }

  public async publish(record: MetricRecordOptions): Promise<void> {
    return this.context.withTrace({
      message: `Publish(${JSON.stringify(record)})`,
      activity: async () => {
        this._records.push({
          timestamp: record.timestamp ?? new Date(),
          value: record.value,
        });
      },
    });
  }

  public async query(
    options: MetricQueryOptions = {}
  ): Promise<MetricRecord[]> {
    return this.context.withTrace({
      message: `Query(${JSON.stringify(options)})`,
      activity: async () => {
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
      },
    });
  }
}
