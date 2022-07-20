import { Construct } from "constructs";
import { Binding, Duration, ICapturable, ICaptureSource } from "../core";
import { Function } from "./function";

export interface QueueProps {
  readonly timeout?: Duration;
}

export class Queue extends Construct implements ICapturable {
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

  public capture(_symbol: string, _binding: Binding): ICaptureSource {
    throw new Error("Method not implemented.");
  }
}
