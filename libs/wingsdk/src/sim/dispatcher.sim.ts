import * as cloud from "../cloud";
import { ISimulatorDispatcher, SimulatorContext } from "../testing/simulator";
import { start as startBucket, stop as stopBucket } from "./bucket.sim";
import { start as startFunction, stop as stopFunction } from "./function.sim";
import { start as startLogger, stop as stopLogger } from "./logger.sim";
import { start as startQueue, stop as stopQueue } from "./queue.sim";

export class DefaultSimulatorDispatcher implements ISimulatorDispatcher {
  async start(
    type: string,
    props: any,
    context: SimulatorContext
  ): Promise<any> {
    switch (type) {
      case cloud.BUCKET_TYPE:
        return startBucket(props, context);
      case cloud.FUNCTION_TYPE:
        return startFunction(props, context);
      case cloud.QUEUE_TYPE:
        return startQueue(props, context);
      case cloud.LOGGER_TYPE:
        return startLogger(props, context);
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
      case cloud.LOGGER_TYPE:
        return stopLogger(attrs);
      case "constructs.Construct":
        return;
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
