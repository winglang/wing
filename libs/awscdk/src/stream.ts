import { Duration } from "aws-cdk-lib";
import {
  Stream as KinesisStream,
  StreamMode as KinesisStreamMode,
} from "aws-cdk-lib/aws-kinesis";
import { App } from "./app";
import { Function } from "./function";
import { Construct } from "constructs";
import { std, core, cloud } from "@winglang/sdk";
import { IInflightHost, Json, Duration as StdDuration } from "@winglang/sdk/src/std";
import {convertBetweenHandlers} from "@winglang/sdk/src/shared/convert";
import { calculateStreamPermissions } from "@winglang/sdk/lib/shared-aws/permissions";
import {join} from "path";
import { KinesisEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";

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
  public setConsumer(
    inflight: cloud.IStreamSetConsumerHandler,
     props: cloud.StreamSetConsumerOptions = {}
  ): cloud.Function {
    const functionHandler = convertBetweenHandlers(
      inflight,
      join(
        __dirname,
        "stream.setconsumer.inflight.js"
      ),
      "StreamSetConsumerHandler"
    );

    const fn = new Function(
      this.node.scope!,
      App.of(this).makeId(this, `${this.node.id}-SetConsumer`),
      functionHandler,
      {
        ...props,
      }
    );

    if (!(fn instanceof Function)) {
      throw new Error("Stream only supports creating awscdk.Function right now.");
    }

    const eventSource = new KinesisEventSource(this.stream, {
      batchSize: props.batchSize ?? 100,
      startingPosition: props.consumeAt as StartingPosition,
    });

    std.Node.of(this).addConnection({
      source: this,
      target: fn,
      name: "setConsumer()",
    });

    return fn;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (!(host instanceof Function)) {
      throw new Error("Stream only supports creating awscdk.Function right now.");
    }

    host.addPolicyStatements(
      ...calculateStreamPermissions(this.stream.streamArn, ops)
    );

    // TODO: Determine if we need to manage dependency resolution

    super.onLift(host, ops);
  }

  public _toInflight(): string {
    throw new Error("Method not implemented.");
  }
}