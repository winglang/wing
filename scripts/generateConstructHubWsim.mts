import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";

import { Construct } from "constructs";

interface ResourceProps {
  type: string;
}
class Resource<Inflight extends string[] = []> extends Construct {
  readonly type: string;

  public relationships: {
    node: Resource<any>;
    type: string;
    direction: "inbound" | "outbound";
    annotation?: string;
  }[] = [];

  constructor(scope: Construct, id: string, props: ResourceProps) {
    super(scope, id);
    this.type = props.type;
  }

  addRelationship(
    node: Resource<any>,
    type: Inflight[number],
    annotation?: string,
  ) {
    this.relationships.push({
      node,
      type,
      direction: "inbound",
      annotation,
    });
    node.relationships.push({
      node: this,
      type,
      direction: "outbound",
      annotation,
    });
  }
}
const visit = (
  node: Resource<any>,
  indentation: number,
  callback: (node: Resource<any>, indentation: number) => void,
) => {
  callback(node, indentation);

  for (const [childName, childNode] of Object.entries(node.node.children)) {
    visit(childNode as any, indentation + 1, callback);
  }
};
const nodeId = (node: Resource) =>
  `${node.node.id}#${createHash("md5")
    .update(node.node.path)
    .digest("hex")
    .slice(0, 6)}`;
// const defineResource =
//   <Inflight extends string[]>(
//     type: string,
//     inflight: F.Narrow<Inflight>,
//     callback?: (node: Resource<Inflight>) => void
//   ) =>
//   (scope: Construct, id?: string) => {
//     const node = new Resource<Inflight>(scope, id ?? type, { type, inflight });
//     callback?.(node);
//     return node;
//   };

// Built-in.
class Root extends Resource {
  constructor() {
    super(undefined as any, "root", { type: "constructs.Construct" });
  }
}

interface BucketProps {
  enforceSSL: boolean;
}
class Bucket extends Resource<
  ["putFile", "getFile", "listFiles", "deleteFile", "onFileCreated"]
> {
  constructor(
    scope: Construct,
    id: string,
    public readonly props?: BucketProps,
  ) {
    super(scope, id, { type: "wingsdk.cloud.Bucket" });
  }
}

interface QueueProps {
  //
}
class Queue extends Resource<["sendMessage", "onMessageReceived"]> {
  constructor(
    scope: Construct,
    id: string,
    public readonly props?: QueueProps,
  ) {
    super(scope, id, { type: "wingsdk.cloud.Queue" });
  }
}

interface FunctionProps {
  //
}
class Function extends Resource<["invoke"]> {
  constructor(
    scope: Construct,
    id: string,
    public readonly props?: FunctionProps,
  ) {
    super(scope, id, { type: "wingsdk.cloud.Function" });
  }
}

interface CronProps {
  //
}
class Cron extends Resource {
  constructor(scope: Construct, id: string, public readonly props?: CronProps) {
    super(scope, id, { type: "wingsdk.cloud.Cron" });
  }

  invokePeriodically(handler: Function) {
    handler.addRelationship(this, "invoke", "periodically");
  }
}

// Custom.
class FailsafeBucket extends Resource<
  ["putFile", "getFile", "listFiles", "deleteFile", "onFileCreated"]
> {
  public readonly primary: Bucket;
  public readonly failover: Bucket;
  constructor(
    scope: Construct,
    id: string,
    public readonly props?: BucketProps,
  ) {
    super(scope, id, { type: "FailsafeBucket" });
    // super(scope, id, { type: "wingsdk.cloud.Bucket" });
    this.primary = new Bucket(this, "Primary", props);
    this.failover = new Bucket(this, "Failover", props);

    // this.
  }

  // addRelationship(
  //   node: Resource<any>,
  //   type: "putFile" | "getFile" | "listFiles" | "deleteFile" | "onFileCreated",
  //   annotation?: string | undefined
  // ): void {
  //   super.addRelationship(node, type);
  //   this.primary.addRelationship(node, type);
  //   this.failover.addRelationship(node, type);
  // }
}

interface BucketDeploymentProps {
  bucket: Bucket;
}
class BucketDeployment extends Resource {
  constructor(
    scope: Construct,
    id: string,
    public readonly props: BucketDeploymentProps,
  ) {
    super(scope, id, { type: "BucketDeployment" });
    props.bucket.addRelationship(this, "putFile");
  }
}

class WebApp extends Resource {
  constructor(
    scope: Construct,
    id: string,
    //   public readonly props: BucketDeploymentProps
  ) {
    super(scope, id, { type: "WebApp" });
    new FailsafeBucket(this, "Bucket");
  }
}

class LicenseList extends Resource<["lookup"]> {
  constructor(
    scope: Construct,
    id: string,
    //   public readonly props: BucketDeploymentProps
  ) {
    super(scope, id, { type: "LicenseList" });
    const bucket = new FailsafeBucket(this, "Bucket");
    new BucketDeployment(this, "Deployment", { bucket });
  }
}

class Repository extends Resource<["publish"]> {
  constructor(
    scope: Construct,
    id: string,
    //   public readonly props: BucketDeploymentProps
  ) {
    super(scope, id, { type: "Repository" });
  }
}

interface ReprocessIngestionWorkflowProps {
  readonly bucket: Bucket;
  readonly queue: Queue;
}
class ReprocessIngestionWorkflow extends Resource {
  public readonly handler: Function;
  constructor(
    scope: Construct,
    id: string,
    public readonly props: ReprocessIngestionWorkflowProps,
  ) {
    super(scope, id, { type: "ReprocessIngestionWorkflow" });

    this.handler = new Function(this, "Handler");
    props.queue.addRelationship(this.handler, "sendMessage");
    props.bucket.addRelationship(this.handler, "listFiles");
    props.bucket.addRelationship(this.handler, "getFile");
    props.bucket.addRelationship(this.handler, "putFile");
  }
}

interface IngestionProps {
  bucket: Bucket;
  codeArtifact: Repository;
  // monitoring
  // orchestration
  // overviewDashboard
}
class Ingestion extends Resource {
  readonly queue: Queue;
  readonly handler: Function;

  constructor(
    scope: Construct,
    id: string,
    public readonly props: IngestionProps,
  ) {
    super(scope, id, { type: "Ingestion" });

    const configBucket = new Bucket(this, "ConfigBucket");
    new BucketDeployment(this, "DeployIngestionConfiguration", {
      bucket: configBucket,
    });

    const handler = new Function(this, "Handler");
    this.handler = handler;
    configBucket.addRelationship(handler, "getFile");
    props.bucket.addRelationship(handler, "putFile");
    props.codeArtifact.addRelationship(handler, "publish");
    // props.orchestration.stateMachine.grantStartExecution(this.function);

    // queue.addRelationship(handler, "onMessageReceived");
    this.queue = new Queue(this, "Queue");
    handler.addRelationship(this.queue, "invoke", "onMessageReceived");

    const reprocessQueue = new Queue(this, "ReprocessQueue");
    handler.addRelationship(reprocessQueue, "invoke", "onMessageReceived");

    const reprocessWorkflow = new ReprocessIngestionWorkflow(
      this,
      "ReprocessWorkflow",
      { bucket: props.bucket, queue: reprocessQueue },
    );

    new Cron(this, "ReprocessCron").invokePeriodically(
      reprocessWorkflow.handler,
    );
  }
}

interface PruneProps {
  packageDataBucket: Bucket;
  // monitoring
  // overviewDashboard
}
class Prune extends Resource {
  public readonly pruneHandler: Function;
  constructor(scope: Construct, id: string, public readonly props: PruneProps) {
    super(scope, id, { type: "Prune" });

    const deleteQueue = new Queue(this, "DeleteQueue");

    this.pruneHandler = new Function(this, "PruneHandler");
    deleteQueue.addRelationship(this.pruneHandler, "sendMessage");
    props.packageDataBucket.addRelationship(this.pruneHandler, "getFile");
    props.packageDataBucket.addRelationship(this.pruneHandler, "listFiles");

    const deleteHandler = new Function(this, "DeleteHandler");
    props.packageDataBucket.addRelationship(this.pruneHandler, "deleteFile");
    deleteHandler.addRelationship(deleteQueue, "invoke", "onMessageAdded");
  }
}

interface DenyListProps {
  packageDataBucket: Bucket;
  // monitoring
  // overviewDashboard
}
class DenyList extends Resource<["lookup", "map"]> {
  readonly prune: Prune;
  constructor(
    scope: Construct,
    id: string,
    public readonly props: DenyListProps,
  ) {
    super(scope, id, { type: "DenyList" });

    const bucket = new FailsafeBucket(this, "Bucket");
    new BucketDeployment(this, "BucketDeployment", { bucket });

    const prune = new Prune(this, "Prune", {
      packageDataBucket: props.packageDataBucket,
    });
    this.prune = prune;
    bucket.addRelationship(prune.pruneHandler, "getFile");
    bucket.addRelationship(prune.pruneHandler, "listFiles");

    prune.pruneHandler.addRelationship(bucket, "invoke", "onObjectCreated");

    new Cron(this, "PruneCron").invokePeriodically(prune.pruneHandler);
  }
}

interface PackageStatsProps {
  bucket: Bucket;
  // monitoring
}
class PackageStats extends Resource {
  constructor(
    scope: Construct,
    id: string,
    public readonly props: PackageStatsProps,
  ) {
    super(scope, id, { type: "PackageStats" });

    const handler = new Function(this, "Handler");
    props.bucket.addRelationship(handler, "putFile");
    props.bucket.addRelationship(handler, "deleteFile");
    props.bucket.addRelationship(handler, "getFile");
    props.bucket.addRelationship(handler, "listFiles");

    new Cron(this, "Cron").invokePeriodically(handler);

    // failureAlarm
  }
}

interface VersionTrackerProps {
  bucket: Bucket;
}
class VersionTracker extends Resource {
  constructor(
    scope: Construct,
    id: string,
    public readonly props: VersionTrackerProps,
  ) {
    super(scope, id, { type: "VersionTracker" });

    const handler = new Function(this, "Handler");
    props.bucket.addRelationship(handler, "putFile");
    props.bucket.addRelationship(handler, "getFile");

    new Cron(this, "Cron").invokePeriodically(handler);
  }
}

interface FeedBuilderProps {
  bucket: Bucket;
}
class FeedBuilder extends Resource {
  constructor(
    scope: Construct,
    id: string,
    public readonly props: FeedBuilderProps,
  ) {
    super(scope, id, { type: "FeedBuilder" });

    const handler = new Function(this, "Handler");
    props.bucket.addRelationship(handler, "putFile");
    props.bucket.addRelationship(handler, "getFile");
  }
}

interface CatalogBuilderProps {
  bucket: Bucket;
  denyList: DenyList;
}
class CatalogBuilder extends Resource<["packages"]> {
  constructor(
    scope: Construct,
    id: string,
    public readonly props: CatalogBuilderProps,
  ) {
    super(scope, id, { type: "CatalogBuilder" });

    const handler = new Function(this, "Handler");
    handler.addRelationship(handler, "invoke");
    props.denyList.addRelationship(handler, "lookup");
    props.bucket.addRelationship(handler, "getFile");
  }
}

interface OrchestrationProps {
  bucket: Bucket;
  codeArtifact: Repository;
  denyList: DenyList;
  feedBuilder: FeedBuilder;
}
class Orchestration extends Resource<["buildCatalog"]> {
  constructor(
    scope: Construct,
    id: string,
    public readonly props: OrchestrationProps,
  ) {
    super(scope, id, { type: "Orchestration" });

    const handler = new Function(this, "Handler");
    props.bucket.addRelationship(handler, "putFile");
    props.bucket.addRelationship(handler, "getFile");

    const catalogBuilder = new CatalogBuilder(this, "CatalogBuilder", {
      bucket: props.bucket,
      denyList: props.denyList,
    });
  }
}

interface NpmJsPackageSourceProps {
  ingestion: Ingestion;
  denyList: DenyList;
  licenseList: LicenseList;
  queue: Queue;
}

class NpmJsPackageSource extends Resource {
  constructor(
    scope: Construct,
    id: string,
    public readonly props: NpmJsPackageSourceProps,
  ) {
    super(scope, id, { type: "NpmJs" });

    const bucket = new Bucket(this, "StagingBucket", { enforceSSL: true });
    bucket.addRelationship(props.ingestion.handler, "getFile");

    const stager = new Function(this, "Stager");
    bucket.addRelationship(stager, "putFile");
    bucket.addRelationship(stager, "getFile");
    props.denyList.addRelationship(stager, "lookup");
    props.queue.addRelationship(stager, "sendMessage");

    const dlq = new Queue(this, "StagerDlq");
    dlq.addRelationship(stager, "sendMessage", "onInvokeError");
    stager.addRelationship(dlq, "invoke", "onMessageReceived");

    const follower = new Function(this, "Follower");
    bucket.addRelationship(
      follower,
      "getFile",
      "path=couchdb-last-transaction-id.2",
    );
    bucket.addRelationship(
      follower,
      "putFile",
      "path=couchdb-last-transaction-id.2",
    );
    props.denyList.addRelationship(follower, "lookup");
    props.licenseList.addRelationship(follower, "lookup");
    stager.addRelationship(follower, "invoke");
    new Cron(this, "Cron").invokePeriodically(follower);
  }
}

class ConstructHub extends Resource {
  constructor(
    scope: Construct,
    id: string,
    //   public readonly props: BucketDeploymentProps
  ) {
    super(scope, id, { type: "ConstructHub" });

    const packageDataBucket = new FailsafeBucket(this, "PackageData");
    const codeArtifact = new Repository(this, "CodeArtifact");

    const denyList = new DenyList(this, "DenyList", { packageDataBucket });
    const ingestion = new Ingestion(this, "Ingestion", {
      bucket: packageDataBucket,
      codeArtifact,
    });
    new PackageStats(this, "PackageStats", { bucket: packageDataBucket });
    new VersionTracker(this, "VersionTracker", {
      bucket: packageDataBucket,
    });
    const feedBuilder = new FeedBuilder(this, "FeedBuilder", {
      bucket: packageDataBucket,
    });

    const orchestration = new Orchestration(this, "Orchestration", {
      bucket: packageDataBucket,
      codeArtifact,
      denyList,
      feedBuilder,
    });
    orchestration.addRelationship(denyList, "buildCatalog");
    // denyList.prune
    // orchestration.catalogBuilder.handler

    const licenseList = new LicenseList(this, "LicenseList");

    new WebApp(this, "WebApp");

    new NpmJsPackageSource(this, "NpmJs", {
      denyList,
      ingestion,
      queue: ingestion.queue,
      licenseList,
    });
  }
}

// Create.
const root = new Root();
new ConstructHub(root, "ConstructHub");

// Render to the terminal.
visit(root, 0, (node, indentation) => {
  const spaceChar = " ";
  const indentationString = ` │${spaceChar}`.repeat(indentation);
  const details = [`type=${node.type}`, `id=${nodeId(node)}`];
  console.log(
    `${indentationString} ├─ ${node.node.id} (${details.join(", ")})`,
  );

  if (node.relationships.length > 0) {
    // console.log(`${indentationString}├─ ├─ relationships:`);
    for (const relationship of node.relationships) {
      const details = [
        `direction=${relationship.direction}`,
        // `type=${relationship.type}`,
        `type=${
          relationship.direction === "outbound"
            ? `${relationship.node.type}::`
            : ""
        }${relationship.type}`,
        relationship.annotation ? `annotation=${relationship.annotation}` : "",
        // `node=${relationship.node.node.path}`,
        `node=${nodeId(relationship.node)}`,
      ].filter((detail) => detail.length > 0);
      // console.log(`${indentationString}├─ ├─ ├─ (${details.join(", ")})`);
      console.log(
        `${indentationString} │ ${spaceChar}├─${spaceChar}(${details.join(
          ", ",
        )})`,
      );
      // console.log(`${indentationString} │ ${spaceChar}│ ${spaceChar}(${details.join(", ")})`);
      // console.log(`${indentationString} │ ${spaceChar}- (${details.join(", ")})`);
    }
  }
});

// Render JSON files and build wsim file.
const tree = buildNode(root);
await mkdir("demo/constructHub", { recursive: true });
await writeFile(
  "demo/constructHub/tree.json",
  JSON.stringify({ version: "tree-0.1", tree }, undefined, 2),
);
await writeFile(
  "demo/constructHub/simulator.json",
  JSON.stringify(
    {
      resources: buildSimResources(root),
      sdkVersion: "0.4.26",
    },
    undefined,
    2,
  ),
);
spawnSync("tar", ["-czvf", "index.wsim", "simulator.json"], {
  cwd: "demo/constructHub",
});

/**
 * Builds the JSON that goes into the tree.json.
 */
function buildNode(node: Resource): any {
  return {
    id: node.node.id,
    path: node.node.path,
    attributes: {
      "wing:console:type": node.type,
      "wing:resource:stateful": node instanceof Bucket || node instanceof Queue,
      "wing:resource:connections": node.relationships.map((relationship) => ({
        direction: relationship.direction,
        resource: relationship.node.node.path,
        relationship: `${relationship.type}${
          relationship.annotation ? ` (${relationship.annotation})` : ""
        }`,
      })),
    },
    children: Object.fromEntries(
      node.node.children.map((node) => [node.node.id, buildNode(node as any)]),
    ),
  };
}

/**
 * Builds the JSON that goes into the simulator.json.
 */
function buildSimResources(node: Resource) {
  const resources: {
    type: string;
    path: string;
    props: any;
    attrs: any;
  }[] = [];
  const allowlist = new Set([
    "wingsdk.cloud.Bucket",
    "wingsdk.cloud.Queue",
    "wingsdk.cloud.Function",
  ]);
  visit(node, 0, (node) => {
    if (allowlist.has(node.type)) {
      let props: any = {};
      if (node instanceof Function) {
        props = {
          sourceCodeFile: "assets/index.js",
          sourceCodeLanguage: "javascript",
          environmentVariables: {},
        };
      }
      resources.push({
        type: node.type,
        path: node.node.path,
        props,
        attrs: {},
      });
    }
  });
  return resources;
}
