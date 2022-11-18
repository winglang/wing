import * as fs from "fs";
import * as path from "path";
import { IPolyconFactory, Polycons } from "@winglang/polycons";
import { Construct } from "constructs";
import * as tar from "tar";
import { SDK_VERSION } from "../constants";
import { DependencyGraph, Files, IApp, synthesizeTree } from "../core";
import { mkdtemp } from "../util";
import { PolyconFactory } from "./factory";
import { isSimResource } from "./resource";
import { WingSimulatorSchema } from "./schema";

/**
 * Path of the simulator configuration file in every .wx tarball.
 */
const SIMULATOR_FILE_PATH = "simulator.json";

/**
 * Props for `App`.
 */
export interface AppProps {
  /**
   * Directory where artifacts are synthesized to.
   * @default - current working directory
   */
  readonly outdir?: string;

  /**
   * Name of the app.
   * @default "main"
   */
  readonly name?: string;

  /**
   * A custom factory to resolve polycons.
   * @default - use the default polycon factory included in the Wing SDK
   */
  readonly customFactory?: IPolyconFactory;
}

/**
 * A construct that knows how to synthesize simulator resources into a
 * Wing simulator (.wx) file.
 */
export class App extends Construct implements IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;
  private readonly files: Files;

  constructor(props: AppProps) {
    const name = props.name ?? "main";
    super(undefined as any, name);
    this.outdir = props.outdir ?? ".";
    this.files = new Files({ app: this });
    Polycons.register(this, props.customFactory ?? new PolyconFactory());
  }

  /**
   * Synthesize the app. This creates a tree.json file and a .wx file in the
   * app's outdir, and returns a path to the .wx file.
   */
  public synth(): string {
    const workdir = mkdtemp();

    // write application assets into workdir
    this.files.synth(workdir);

    // write simulator.json file into workdir
    this.synthSimulatorFile(workdir);

    // tar + gzip the workdir, and write it as a .wx file to the outdir
    const filename = `${this.node.path}.wx`;
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

    // write tree.json file to the outdir
    synthesizeTree(this);

    return simfile;
  }

  private synthSimulatorFile(outdir: string) {
    const resources = new DependencyGraph(this.node)
      .topology()
      .filter(isSimResource)
      .map((res) => res.toSimulatorSchema());

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

// /**
//  * Whether to resource should be included in the simulator.json tree.
//  * If a construct is not a resource or does not contain any resources, there is
//  * nothing to simulate, so we can skip it.
//  */
// function shouldIncludeInTree(c: IConstruct): boolean {
//   if (isResource(c)) {
//     return true;
//   }

//   if (c.node.children.some((x) => shouldIncludeInTree(x))) {
//     return true;
//   }

//   return false;
// }
