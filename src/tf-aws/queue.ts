import { Construct } from "constructs";
import * as cloud from "../cloud";
import { Capture, Code } from "../core";

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

  public capture(_consumer: any, _capture: Capture): Code {
    throw new Error("Method not implemented.");
  }
}
