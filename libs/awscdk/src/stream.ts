import { Duration } from "aws-cdk-lib";
import {
  Stream as KinesisStream,
  StreamMode as KinesisStreamMode,
} from "aws-cdk-lib/aws-kinesis";

import { Construct } from "constructs";
import * as cloud from "../cloud";
import * as core from "../core";
import { IInflightHost, Json, Duration as StdDuration } from "../std";

/**
* AWS implementation of `cloud.Stream`
* 
* @inflight `@winglang/sdk.cloud.IStreamClient`
*/
export class Stream extends cloud.Stream {
  private readonly stream: KinesisStream;
  private readonly horizon: StdDuration;
  
  constructor(scope: Construct, id: string, props: cloud.StreamProps = {}) {
    super(scope, id, props);
    this.horizon = props.horizon ?? StdDuration.fromHours(24);

    this.stream = new KinesisStream(this, "Default", {
      retentionPeriod: Duration.hours(this.horizon.hours),
      streamMode: KinesisStreamMode.ON_DEMAND
    });
    
  }
  
  
  public _supportedOps(): string[] {
    return [
      cloud.StreamInflightMethods.PUT,
      cloud.StreamInflightMethods.GET,
    ];
  }
  public setConsumer(handler: cloud.IStreamConsumerHandler, props?: any): Json {
    throw new Error("Method not implemented.");
  }
  public ingest(data: cloud.IStreamData): Json {
    throw new Error("Method not implemented.");
  }
  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}