import { Construct } from "constructs";
import { Duration } from "../core";
import { Function } from "./function";

export interface QueueProps {
  readonly timeout?: Duration;
}

export class Queue extends Construct {
  constructor(scope: Construct, id: string, props: QueueProps = {}) {
    super(scope, id);

    if (props.timeout) {
      console.log(`Timeout is ${props.timeout.seconds} seconds`);
    }
  }

  public addWorker(fn: Function) {
    fn;
  }

  public hello() {
    console.log("world!");
  }
}
