import { writeFileSync } from "fs";
import { join } from "path";
import { Construct, IConstruct } from "constructs";
import { FileBase } from "../fs";
import { isResource } from "./resource";
import { ConstructSchema, ResourceSchema, WingLocalSchema } from "./schema";

export interface AppProps {
  readonly outdir: string;
}

export class App extends Construct {
  private readonly outdir: string;
  constructor(props: AppProps) {
    super(undefined as any, "");
    this.outdir = props.outdir;
  }

  public synth() {
    const isFile = (c: IConstruct): c is FileBase => c instanceof FileBase;
    for (const f of this.node.findAll().filter(isFile)) {
      f.save(this.outdir);
    }

    const root: ConstructSchema = constructToSchema(this);

    const contents: WingLocalSchema = {
      version: "winglocal-0.1",
      root,
    };
    writeFileSync(
      join(this.outdir, "wing.local.json"),
      JSON.stringify(contents, null, 2)
    );
  }
}

function toSchema(c: IConstruct): ResourceSchema {
  if (isResource(c)) {
    return c._toResourceSchema();
  } else if (Construct.isConstruct(c)) {
    return constructToSchema(c);
  } else {
    throw new Error(
      `Cannot construct schema for ${(c as IConstruct).node.path}`
    );
  }
}

function constructToSchema(c: IConstruct): ConstructSchema {
  return {
    id: c.node.id,
    path: c.node.path,
    type: "constructs.Construct",
    callees: [],
    callers: [],
    props: {},
    children: c.node.children.reduce((acc, child) => {
      const childSchema = toSchema(child);
      return {
        ...acc,
        [childSchema.id]: childSchema,
      };
    }, {}),
  };
}
