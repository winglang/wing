import { Construct } from "constructs";
import { AwsInflightHost } from "./inflight-host";
import { calculateBucketPermissions } from "./permissions";
import { cloud, ui } from "..";
import { InflightClient, LiftMap, lift } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { IInflightHost, Node, Resource } from "../std";

/**
 * A shared interface for AWS buckets.
 */
export interface IAwsBucket {
  /**
   * AWS Bucket arn
   */
  readonly bucketArn: string;

  /**
   * AWS Bucket name
   */
  readonly bucketName: string;
}

/**
 * A helper class for working with AWS buckets.
 */
export class Bucket {
  /**
   * If the bucket is an AWS Bucket, return a helper interface for
   * working with it.
   * @param bucket The cloud.Bucket.
   */
  public static from(bucket: cloud.Bucket): IAwsBucket | undefined {
    if (this.isAwsBucket(bucket)) {
      return bucket;
    }
    return undefined;
  }

  private static isAwsBucket(obj: any): obj is IAwsBucket {
    return (
      typeof obj.bucketArn === "string" && typeof obj.bucketName === "string"
    );
  }
}

/**
 * A few inflight methods that can be used with an AWS bucket.
 */
export interface IAwsBucketClient extends cloud.IBucketClient {
  /**
   * Get the region of the bucket.
   * @inflight
   */
  bucketRegion(): Promise<string>;
}

/**
 * A reference to an external S3 bucket.
 * @inflight `@winglang/sdk.aws.IAwsBucketClient`
 */
export class BucketRef extends Resource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IAwsBucketClient;

  /**
   * The Name of this bucket.
   */
  public readonly bucketName: string;

  /**
   * The ARN of this bucket.
   */
  public readonly bucketArn: string;

  constructor(scope: Construct, id: string, bucketName: string) {
    super(scope, id);

    this.bucketName = bucketName;
    this.bucketArn = `arn:aws:s3:::${bucketName}`;

    this.addUserInterface();
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    if (AwsInflightHost.isAwsInflightHost(host)) {
      host.addPolicyStatements(
        ...calculateBucketPermissions(this.bucketArn, ops)
      );
    }

    // The bucket name needs to be passed through an environment variable since
    // it may not be resolved until deployment time.
    host.addEnvironment(this.envName(), this.bucketName);

    super.onLift(host, ops);
  }

  /** @internal */
  public _toInflight(): string {
    return InflightClient.for(__dirname, __filename, "BucketClient", [
      `process.env["${this.envName()}"]`,
    ]);
  }

  private envName(): string {
    return `BUCKET_NAME_${this.node.addr.slice(-8)}`;
  }

  /** @internal */
  public get _liftMap(): LiftMap {
    return {
      [cloud.BucketInflightMethods.DELETE]: [],
      [cloud.BucketInflightMethods.GET]: [],
      [cloud.BucketInflightMethods.GET_JSON]: [],
      [cloud.BucketInflightMethods.LIST]: [],
      [cloud.BucketInflightMethods.PUT]: [],
      [cloud.BucketInflightMethods.PUT_JSON]: [],
      [cloud.BucketInflightMethods.PUBLIC_URL]: [],
      [cloud.BucketInflightMethods.EXISTS]: [],
      [cloud.BucketInflightMethods.TRY_GET]: [],
      [cloud.BucketInflightMethods.TRY_GET_JSON]: [],
      [cloud.BucketInflightMethods.TRY_DELETE]: [],
      [cloud.BucketInflightMethods.SIGNED_URL]: [],
      [cloud.BucketInflightMethods.METADATA]: [],
      [cloud.BucketInflightMethods.COPY]: [],
      [cloud.BucketInflightMethods.RENAME]: [],
      bucketRegion: [],
    };
  }

  private addUserInterface() {
    Node.of(this).color = "amber";

    const awsConsoleHandler = lift({
      bucket: this,
      bucketName: this.bucketName,
    }).inflight(async (ctx) => {
      try {
        const region = await ctx.bucket.bucketRegion();
        return (
          "https://" +
          region +
          ".console.aws.amazon.com/s3/buckets/" +
          ctx.bucketName +
          "?region=" +
          region
        );
      } catch (e: any) {
        return e.message;
      }
    });

    new ui.Field(this, "AwsConsoleField", "AWS Console", awsConsoleHandler, {
      link: true,
    });

    new ui.ValueField(this, "BucketNameField", "Bucket Name", this.bucketName);
    new ui.ValueField(this, "BucketArnField", "Bucket ARN", this.bucketArn);
    new ui.FileBrowser(this, "FileBrowser", "File Browser", {
      put: lift({ bucket: this }).inflight(
        async (ctx, fileName, fileContent) => {
          await ctx.bucket.put(fileName, fileContent);
        }
      ),
      get: lift({ bucket: this }).inflight(async (ctx, fileName) => {
        return ctx.bucket.get(fileName);
      }),
      delete: lift({ bucket: this }).inflight(async (ctx, fileName) => {
        await ctx.bucket.delete(fileName);
      }),
      list: lift({ bucket: this }).inflight(async (ctx) => {
        return ctx.bucket.list();
      }),
    });
  }
}

/**
 * Utility class to work with bucket event handlers.
 */
export class BucketEventHandler {
  /**
   * Converts a `cloud.IBucketEventHandler` to a `cloud.ITopicOnMessageHandler`.
   * @param handler the handler to convert
   * @param eventType the event type
   * @returns the on message handler.
   */
  public static toTopicOnMessageHandler(
    handler: cloud.IBucketEventHandler,
    eventType: cloud.BucketEventType
  ): cloud.ITopicOnMessageHandler {
    return lift({ handler, eventType }).inflight(async (ctx, event) => {
      try {
        const message = JSON.parse(event);
        if (message?.Event === "s3:TestEvent") {
          // aws sends a test event to the topic before of the actual one, we're ignoring it for now
          return;
        }
        return await ctx.handler(
          message.Records[0].s3.object.key,
          ctx.eventType
        );
      } catch (error) {
        console.warn("Error parsing the notification event message: ", error);
        console.warn("Event: ", event);
      }
    });
  }
}
