import { writeFileSync } from "fs";
import { join } from "path";
import { Construct, IConstruct } from "constructs";
import * as tar from "tar";
import { FileBase } from "../fs";
import { mkdtemp, sanitizeValue } from "../util";
import { isResource } from "./resource";
import { ResourceSchema, WingSimulatorSchema } from "./schema";

/**
 * Props for `App`.
 */
export interface AppProps {
  /**
   * Directory where artifacts are synthesized to.
   */
  readonly outdir: string;
}

/**
 * A construct that knows how to synthesize simulator resources into a
 * Wing simulator (.wx) file.
 */
export class App extends Construct {
  /**
   * Directory where artifacts are synthesized to.
   */
  private readonly outdir: string;
  constructor(props: AppProps) {
    super(undefined as any, "root");
    this.outdir = props.outdir;
  }

  /**
   * Synthesize the app into an `app.wx` file.
   */
  public synth() {
    const workdir = mkdtemp();

    // write assets and other files into the workdir
    const isFile = (c: IConstruct): c is FileBase => c instanceof FileBase;
    for (const f of this.node.findAll().filter(isFile)) {
      f.save(workdir);
    }

    // write "simulator.json" into the workdir
    const root = toSchema(this);
    const contents: WingSimulatorSchema = { root: root };
    writeFileSync(
      join(workdir, "simulator.json"),
      JSON.stringify(contents, null, 2)
    );

    // zip it up, and write it as app.wx to the outdir
    tar.create(
      {
        gzip: true,
        cwd: workdir,
        sync: true,
        file: join(this.outdir, "app.wx"),
      },
      ["simulator.json"]
    );
  }
}

function toSchema(c: IConstruct): ResourceSchema {
  const children = c.node.children.reduce((acc, child) => {
    // don't add constructs that are not resources
    if (child instanceof FileBase) {
      return acc;
    }
    const childSchema = toSchema(child);
    return {
      ...acc,
      [child.node.id]: childSchema,
    };
  }, {});

  const resourceFields: any = isResource(c) ? c._toResourceSchema() : {};

  return sanitizeValue(
    {
      type: resourceFields.type ?? "constructs.Construct",
      ...resourceFields,
      children,
    },
    { filterEmptyArrays: true, filterEmptyObjects: true, sortKeys: false }
  );
}
