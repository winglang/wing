import { readFileSync } from "fs";
import { isAbsolute, join } from "path";
import { App } from "../src/core";
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

export function tfResourcesOfWithProperty(
  templateStr: string,
  resourceId: string,
  properties: Record<string, string>
) {
  return (
    Object.values(JSON.parse(templateStr).resource[resourceId]) as Record<
      string,
      string
    >[]
  ).find((resource: Record<string, string>) => {
    for (let key in properties) {
      if (resource[key] !== properties[key]) {
        return false;
      }
    }
    return true;
  });
}

export function getTfResource(
  templateStr: string,
  resourceId: string,
  index?: number
): any {
  const resources = JSON.parse(templateStr).resource[resourceId];
  const key = Object.keys(resources)[index ?? 0];
  return resources[key];
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
        (value.match(/^assets\/.*\/archive.zip$/) || isAbsolute(value))
      ) {
        return "<source>";
      }
      return value;
    },
    2
  );
}

export function appSnapshot(app: App): Record<string, any> {
  app.synth();
  return directorySnapshot(app.outdir);
}
