import * as fs from "fs";
import * as path from "path";
import { Construct } from "constructs";
import { Api } from "./api";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { DynamodbTable } from "./dynamodb-table";
import { Function } from "./function";
import { OnDeploy } from "./on-deploy";
import { Queue } from "./queue";
import { Redis } from "./redis";
import { isSimulatorResource } from "./resource";
import { Schedule } from "./schedule";
import { Secret } from "./secret";
import { Service } from "./service";
import { Table } from "./table";
import { TestRunner } from "./test-runner";
import { SimTokens } from "./tokens";
import { Topic } from "./topic";
import { Website } from "./website";
import {
  API_FQN,
  BUCKET_FQN,
  COUNTER_FQN,
  FUNCTION_FQN,
  ON_DEPLOY_FQN,
  QUEUE_FQN,
  SCHEDULE_FQN,
  SECRET_FQN,
  SERVICE_FQN,
  TOPIC_FQN,
  WEBSITE_FQN,
} from "../cloud";
import { SDK_VERSION } from "../constants";
import * as core from "../core";
import { preSynthesizeAllConstructs } from "../core/app";
import { TABLE_FQN, REDIS_FQN, DYNAMODB_TABLE_FQN } from "../ex";
import { WingSimulatorSchema } from "../simulator/simulator";
import { TEST_RUNNER_FQN } from "../std";

/**
 * Path of the simulator configuration file in every .wsim tarball.
 */
export const SIMULATOR_FILE_PATH = "simulator.json";

/**
 * A construct that knows how to synthesize simulator resources into a
 * Wing simulator (.wsim) file.
 */
export class App extends core.App {
  public readonly outdir: string;
  public readonly isTestEnvironment: boolean;
  public readonly _tokens: SimTokens;

  public readonly _target = "sim";

  /**
   * The test runner for this app.
   */
  protected readonly testRunner: TestRunner;

  private synthed = false;

  constructor(props: core.AppProps) {
    // doesn't allow customize the root id- as used hardcoded in the code
    super(undefined as any, "root", props);
    this.outdir = props.outdir ?? ".";
    this.isTestEnvironment = props.isTestEnvironment ?? false;
    this._tokens = new SimTokens();

    this.testRunner = new TestRunner(this, "cloud.TestRunner");

    this.synthRoots(props, this.testRunner);
  }

  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    switch (fqn) {
      case API_FQN:
        return new Api(scope, id, args[0]);

      case FUNCTION_FQN:
        return new Function(scope, id, args[0], args[1]);

      case BUCKET_FQN:
        return new Bucket(scope, id, args[0]);

      case QUEUE_FQN:
        return new Queue(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);

      case COUNTER_FQN:
        return new Counter(scope, id, args[0]);

      case TABLE_FQN:
        return new Table(scope, id, args[0]);

      case TEST_RUNNER_FQN:
        return new TestRunner(scope, id, args[0]);

      case REDIS_FQN:
        return new Redis(scope, id);

      case WEBSITE_FQN:
        return new Website(scope, id, args[0]);

      case SECRET_FQN:
        return new Secret(scope, id, args[0]);

      case SCHEDULE_FQN:
        return new Schedule(scope, id, args[0]);

      case SERVICE_FQN:
        return new Service(scope, id, args[0], args[1]);

      case ON_DEPLOY_FQN:
        return new OnDeploy(scope, id, args[0], args[1]);

      case DYNAMODB_TABLE_FQN:
        return new DynamodbTable(scope, id, args[0]);
    }

    return undefined;
  }

  /**
   * Synthesize the app. This creates a tree.json file and a .wsim file in the
   * app's outdir, and returns a path to the .wsim directory.
   */
  public synth(): string {
    if (this.synthed) {
      return this.outdir;
    }

    fs.mkdirSync(this.outdir, { recursive: true });

    // call preSynthesize() on every construct in the tree
    preSynthesizeAllConstructs(this);

    // write simulator.json file into workdir
    this.synthSimulatorFile(this.outdir);

    // write tree.json file into workdir
    core.synthesizeTree(this, this.outdir);

    // write `outdir/connections.json`
    core.Connections.of(this).synth(this.outdir);

    this.synthed = true;

    return this.outdir;
  }

  private synthSimulatorFile(outdir: string) {
    const resources = new core.DependencyGraph(this.node)
      .topology()
      .filter(isSimulatorResource)
      .map((res) => res.toSimulator());

    const contents: WingSimulatorSchema = {
      resources,
      sdkVersion: SDK_VERSION,
    };

    // write simulator.json file
    fs.writeFileSync(
      path.join(outdir, SIMULATOR_FILE_PATH),
      JSON.stringify(contents, undefined, 2),
      { encoding: "utf8" }
    );
  }
}
