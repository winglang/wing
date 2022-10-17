import { readdirSync, readFileSync, statSync } from "fs";
import { extname, join } from "path";
import { App } from "../src/core";

export function tfResourcesOf(templateStr: string): string[] {
  return Object.keys(JSON.parse(templateStr).resource).sort();
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

export function directorySnapshot(root: string) {
  const snapshot: Record<string, any> = {};

  const visit = (subdir: string) => {
    const files = readdirSync(join(root, subdir));
    for (const f of files) {
      const relpath = join(subdir, f);
      const abspath = join(root, relpath);
      if (statSync(abspath).isDirectory()) {
        visit(relpath);
      } else {
        const data = readFileSync(abspath, "utf-8");
        if (extname(f) === ".json") {
          snapshot[relpath] = JSON.parse(data);
        } else {
          snapshot[relpath] = data;
        }
      }
    }
  };

  visit(".");

  return snapshot;
}

export function appSnapshot(app: App): Record<string, any> {
  app.synth();
  return directorySnapshot(app.outdir);
}
