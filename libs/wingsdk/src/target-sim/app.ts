import * as fs from "fs";
import * as path from "path";
import { Construct } from "constructs";
import * as tar from "tar";
import { Bucket } from "./bucket";
import { Counter } from "./counter";
import { Function } from "./function";
import { Logger } from "./logger";
import { Queue } from "./queue";
import { isSimulatorResource } from "./resource";
import { WingSimulatorSchema } from "./schema";
import { Topic } from "./topic";
import {
  BUCKET_FQN,
  COUNTER_FQN,
  FUNCTION_FQN,
  LOGGER_FQN,
  QUEUE_FQN,
  TOPIC_FQN,
} from "../cloud";
import { SDK_VERSION } from "../constants";
import * as core from "../core";
import { preSynthesizeAllConstructs } from "../core/app";
import { mkdtemp, SIMULATOR_FILE_PATH } from "../util";

/**
 * A construct that knows how to synthesize simulator resources into a
 * Wing simulator (.wsim) file.
 */
export class App extends core.App {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;
  private readonly files: core.Files;
  private readonly name: string;
  private readonly simfile: string;
  private synthed = false;

  constructor(props: core.AppProps) {
    super(undefined as any, "root");
    this.name = props.name ?? "app";
    this.outdir = props.outdir ?? ".";
    Logger.register(this);
    this.files = new core.Files({ app: this, stateFile: props.stateFile });
    this.simfile = path.join(this.outdir, `${this.name}.wsim`);
  }

  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    switch (fqn) {
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
      return this.simfile;
    }

    // call preSynthesize() on every construct in the tree
    preSynthesizeAllConstructs(this);

    const workdir = mkdtemp();

    // write application assets into workdir
    this.files.synth(workdir);

    // write simulator.json file into workdir
    this.synthSimulatorFile(workdir);

    // write tree.json file into workdir
    core.synthesizeTree(this, workdir);

    // tar + gzip the workdir, and write it as a .wsim file to the simfile
    tar.create(
      {
        gzip: true,
        cwd: workdir,
        sync: true,
        file: this.simfile,
      },
      ["./"]
    );

    // write tree.json file into the app's outdir
    // (for backwards compatibility with older versions of the Wing console)
    core.synthesizeTree(this, this.outdir);

    this.synthed = true;

    return this.simfile;
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
