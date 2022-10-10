import * as cloud from "../cloud";
import { ISimulatorFactory } from "../testing/simulator";
import { start as startBucket, cleanup as cleanupBucket } from "./bucket.sim";
import {
  start as startFunction,
  cleanup as cleanupFunction,
} from "./function.sim";
import { start as startQueue, cleanup as cleanupQueue } from "./queue.sim";

export class DefaultSimulatorFactory implements ISimulatorFactory {
  async init(type: string, props: any): Promise<any> {
    switch (type) {
      case cloud.BUCKET_TYPE:
        return startBucket(props);
      case cloud.FUNCTION_TYPE:
        return startFunction(props);
      case cloud.QUEUE_TYPE:
        return startQueue(props);
      case "constructs.Construct":
        return {};
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }

  async cleanup(type: string, attrs: any): Promise<void> {
    switch (type) {
      case cloud.BUCKET_TYPE:
        await cleanupBucket(attrs);
        return;
      case cloud.FUNCTION_TYPE:
        await cleanupFunction(attrs);
        return;
      case cloud.QUEUE_TYPE:
        await cleanupQueue(attrs);
        return;
      case "constructs.Construct":
        return;
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
