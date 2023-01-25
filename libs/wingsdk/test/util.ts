import { readFileSync } from "fs";
import { join } from "path";
import { IApp } from "../src/core";
import { directorySnapshot } from "../src/util";

export function treeJsonOf(outdir: string): any {
  return JSON.parse(readFileSync(join(outdir, "tree.json"), "utf8"));
}

export function tfResourcesOf(templateStr: string): string[] {
  return Object.keys(JSON.parse(templateStr).resource).sort();
}

export function tfResourcesOfCount(
  templateStr: string,
  resourceId: string
): number {
  return Object.values(JSON.parse(templateStr).resource[resourceId]).length;
}

export function tfSanitize(templateStr: string): string {
  const template = JSON.parse(templateStr);

  // remove names of assets whose hashes are sensitive to changes based
  // on the file system layout
  return JSON.stringify(
    template,
    (key, value) => {
      if (
        key === "key" &&
        typeof value === "string" &&
        value.match(/^asset\..*\.zip$/)
      ) {
        return "<key>";
      }
      if (
        key === "source" &&
        typeof value === "string" &&
        value.match(/^assets\/.*\/archive.zip$/)
      ) {
        return "<source>";
      }
      return value;
    },
    2
  );
}

export function appSnapshot(app: IApp): Record<string, any> {
  app.synth();
  return directorySnapshot(app.outdir);
}
