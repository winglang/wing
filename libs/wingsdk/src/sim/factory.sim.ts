import * as cloud from "../cloud";
import { ISimulatorFactory, SimulatorContext } from "../testing/simulator";
import { Bucket } from "./bucket.sim";
import { Function } from "./function.sim";
import { ISimulatorResource } from "./handle-manager";
import { Logger } from "./logger.sim";
import { Queue } from "./queue.sim";

export class DefaultSimulatorFactory implements ISimulatorFactory {
  public resolve(
    type: string,
    path: string,
    props: any,
    context: SimulatorContext
  ): ISimulatorResource {
    switch (type) {
      case cloud.BUCKET_TYPE:
        return new Bucket(path, props, context);
      case cloud.FUNCTION_TYPE:
        return new Function(path, props, context);
      case cloud.QUEUE_TYPE:
        return new Queue(path, props, context);
      case cloud.LOGGER_TYPE:
        return new Logger(path, props, context);
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
  }
}
