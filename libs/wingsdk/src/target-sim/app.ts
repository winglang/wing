import * as fs from "fs";
import * as path from "path";
import { Construct } from "constructs";
import { Api } from "./api";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Logger } from "./logger";
import { Queue } from "./queue";
import { isSimulatorResource } from "./resource";
import { WingSimulatorSchema } from "./schema";
import { Table } from "./table";
import { Topic } from "./topic";
import {
  API_FQN,
  BUCKET_FQN,
  COUNTER_FQN,
  FUNCTION_FQN,
  LOGGER_FQN,
  QUEUE_FQN,
  TABLE_FQN,
  TOPIC_FQN,
} from "../cloud";
import { SDK_VERSION } from "../constants";
import * as core from "../core";
import { preSynthesizeAllConstructs } from "../core/app";
import { SIMULATOR_FILE_PATH } from "../util";

/**
 * A construct that knows how to synthesize simulator resources into a
 * Wing simulator (.wsim) file.
 */
export class App extends core.App {
  /**
   * The output directory of this app.
   */
  public readonly outdir: string;

  private synthed = false;

  constructor(props: core.AppProps) {
    super(undefined as any, "root");
    this.outdir = props.outdir ?? ".";

    Logger.register(this);
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

      case LOGGER_FQN:
        return new Logger(scope, id);

      case QUEUE_FQN:
        return new Queue(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);

      case COUNTER_FQN:
        return new Counter(scope, id, args[0]);

      case TABLE_FQN:
        return new Table(scope, id, args[0]);

      case TOPIC_FQN:
        return new Topic(scope, id, args[0]);
    }

    return undefined;
  }

  /**
   * Synthesize the app. This creates a tree.json file and a .wsim file in the
   * app's outdir, and returns a path to the .wsim file.
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
