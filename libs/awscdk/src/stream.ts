import { Duration } from "aws-cdk-lib";
import {
  Stream as KinesisStream,
  StreamMode as KinesisStreamMode,
} from "aws-cdk-lib/aws-kinesis";

import { Construct } from "constructs";
import * as cloud from "@winglang/sdk/src/cloud";
import * as core from "@winglang/sdk/src/core";
import { IInflightHost, Json, Duration as StdDuration } from "@winglang/sdk/src/std";
import {convertBetweenHandlers} from "@winglang/sdk/src/shared/convert";
import {join} from "path";

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
  public setConsumer(inflight: cloud.IStreamSetConsumerHandlerClient, props?: any = {}): cloud.Function {

    const functionHandler = convertBetweenHandlers(
      inflight,
      join(
        __dirname.replace("target-awscdk", "shared-aws"),
        "stream.setconsumer.inflight.js"
      ),
      "StreamSetConsumerHandler"
    );

    throw new Error("Method not implemented.");
  }

  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}