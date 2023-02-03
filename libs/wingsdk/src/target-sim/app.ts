import * as fs from "fs";
import * as path from "path";
import { Construct } from "constructs";
import { Polycons } from "polycons";
import * as tar from "tar";
import { PolyconFactory } from "./factory";
import { isSimulatorResource } from "./resource";
import { WingSimulatorSchema } from "./schema";
import { Logger } from "../cloud";
import { SDK_VERSION } from "../constants";
import * as core from "../core";
import { mkdtemp, SIMULATOR_FILE_PATH } from "../util";

/**
 * A construct that knows how to synthesize simulator resources into a
 * Wing simulator (.wsim) file.
 */
export class App extends Construct implements core.IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;
  private readonly files: core.Files;
  private readonly name: string;

  constructor(props: core.AppProps) {
    super(undefined as any, "root");
    this.name = props.name ?? "app";
    this.outdir = props.outdir ?? ".";
    Polycons.register(this, props.customFactory ?? new PolyconFactory());
    Logger.register(this);
    this.files = new core.Files({ app: this, stateFile: props.stateFile });
  }

  /**
   * Synthesize the app. This creates a tree.json file and a .wsim file in the
   * app's outdir, and returns a path to the .wsim file.
   */
  public synth(): string {
    const workdir = mkdtemp();

    // write application assets into workdir
    this.files.synth(workdir);

    // write simulator.json file into workdir
    this.synthSimulatorFile(workdir);

    // write tree.json file into workdir
    core.synthesizeTree(this, workdir);

    // tar + gzip the workdir, and write it as a .wsim file to the outdir
    const filename = `${this.name}.wsim`;
    const simfile = path.join(this.outdir, filename);
    tar.create(
      {
        gzip: true,
        cwd: workdir,
        sync: true,
        file: simfile,
      },
      ["./"]
    );

    // write tree.json file into the app's outdir
    // (for backwards compatibility with older versions of the Wing console)
    core.synthesizeTree(this, this.outdir);

    return simfile;
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
