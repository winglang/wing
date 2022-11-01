import { writeFileSync } from "fs";
import { join } from "path";
import { IPolyconFactory, Polycons } from "@monadahq/polycons";
import { Construct, IConstruct } from "constructs";
import * as tar from "tar";
import { DependencyGraph, Files, IApp } from "../core";
import { mkdtemp, sanitizeValue } from "../util";
import { PolyconFactory } from "./factory";
import { isResource } from "./resource";
import { BaseResourceSchema, WingSimulatorSchema } from "./schema";

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
    super(undefined as any, "root");
    this.outdir = props.outdir ?? ".";
    this.files = new Files({ app: this });
    Polycons.register(this, props.customFactory ?? new PolyconFactory());
  }

  /**
   * Synthesize the app into an `app.wx` file. Return the path to the file.
   */
  public synth(): string {
    const workdir = mkdtemp();

    this.files.synth(workdir);

    // write "simulator.json" into the workdir
    const root = toSchema(this);
    const startOrder = new DependencyGraph(this.node)
      .topology()
      .filter((x) => isResource(x))
      .map((x) => x.node.path);
    const contents: WingSimulatorSchema = { root, startOrder };
    writeFileSync(
      join(workdir, "simulator.json"),
      JSON.stringify(contents, null, 2)
    );

    // zip it up, and write it as app.wx to the outdir
    const simfile = join(this.outdir, "app.wx");
    tar.create(
      {
        gzip: true,
        cwd: workdir,
        sync: true,
        file: simfile,
      },
      ["./"]
    );
    return simfile;
  }
}

/**
 * Whether to resource should be included in the simulator.json tree.
 * If a construct is not a resource or does not contain any resources, there is
 * nothing to simulate, so we can skip it.
 */
function shouldIncludeInTree(c: IConstruct): boolean {
  if (isResource(c)) {
    return true;
  }

  if (c.node.children.some((x) => shouldIncludeInTree(x))) {
    return true;
  }

  return false;
}

function toSchema(c: IConstruct): BaseResourceSchema {
  const children = c.node.children.reduce((acc, child) => {
    if (!shouldIncludeInTree(child)) {
      return acc;
    }
    const childSchema = toSchema(child);
    return {
      ...acc,
      [child.node.id]: childSchema,
    };
  }, {});

  const resourceFields: any = isResource(c) ? c._toResourceSchema() : {};
  const dependsOn = c.node.dependencies.map((dep) => dep.node.path);

  return sanitizeValue(
    {
      type: resourceFields.type ?? "constructs.Construct",
      ...resourceFields,
      children,
      dependsOn,
    },
    { filterEmptyArrays: false, filterEmptyObjects: false, sortKeys: false }
  );
}
