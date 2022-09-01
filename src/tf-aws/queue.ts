import { Construct, IConstruct } from "constructs";
import * as cloud from "../cloud";
import { CaptureMetadata, Code } from "../core";

export class Queue extends cloud.QueueBase implements cloud.IQueue {
  constructor(scope: Construct, id: string, props: cloud.QueueProps = {}) {
    super(scope, id, props);

    if (props.timeout) {
      console.log(`Timeout is ${props.timeout.seconds} seconds`);
    }
  }

  public addWorker(fn: cloud.IFunction) {
    fn;
  }

  public capture(_captureScope: IConstruct, _metadata: CaptureMetadata): Code {
    throw new Error("Method not implemented.");
  }
}
