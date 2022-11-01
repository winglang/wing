import * as cloud from "../cloud";
import { ISimulatorDispatcher, SimulatorContext } from "../testing/simulator";
import { Bucket } from "./bucket.sim";
import { Function } from "./function.sim";
import { HandleManager, ISimulatorResource } from "./handle-manager";
import { Logger } from "./logger.sim";
import { Queue } from "./queue.sim";

export class DefaultSimulatorDispatcher implements ISimulatorDispatcher {
  async start(
    type: string,
    path: string,
    props: any,
    context: SimulatorContext
  ): Promise<any> {
    let resource: ISimulatorResource;
    switch (type) {
      case cloud.BUCKET_TYPE:
        resource = new Bucket(path, props, context);
        break;
      case cloud.FUNCTION_TYPE:
        resource = new Function(path, props, context);
        break;
      case cloud.QUEUE_TYPE:
        resource = new Queue(path, props, context);
        break;
      case cloud.LOGGER_TYPE:
        resource = new Logger(path, props, context);
        break;
      default:
        throw new Error(`Type ${type} not implemented.`);
    }
    await resource.init();
    const handle = HandleManager.addInstance(resource);
    return { handle };
  }

  async stop(_type: string, attrs: any): Promise<void> {
    const resource = HandleManager.removeInstance(attrs!.handle);
    await resource.cleanup();
  }
}
