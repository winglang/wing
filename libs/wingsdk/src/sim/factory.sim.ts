import * as cloud from "../cloud";
import { ISimulatorDispatcher } from "../testing/simulator";
import { start as startBucket, stop as stopBucket } from "./bucket.sim";
import { start as startFunction, stop as stopFunction } from "./function.sim";
import { start as startQueue, stop as stopQueue } from "./queue.sim";

export class DefaultSimulatorFactory implements ISimulatorDispatcher {
  async start(type: string, props: any): Promise<any> {
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

  async stop(type: string, attrs: any): Promise<void> {
    switch (type) {
      case cloud.BUCKET_TYPE:
        await stopBucket(attrs);
        return;
      case cloud.FUNCTION_TYPE:
        await stopFunction(attrs);
        return;
      case cloud.QUEUE_TYPE:
        await stopQueue(attrs);
        return;
      case "constructs.Construct":
        return;
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
