import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { extname, join } from "path";
import * as tar from "tar";
import { IApp } from "../src/core";
import { mkdtemp } from "../src/util";

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
        if (extname(f) === ".json") {
          const data = readFileSync(abspath, "utf-8");
          snapshot[relpath] = JSON.parse(data);
        } else if (extname(f) === ".wsim") {
          const workdir = mkdtemp();
          tar.extract({
            cwd: workdir,
            sync: true,
            file: abspath,
          });
          const simJson = join(workdir, "simulator.json");
          if (!existsSync(simJson)) {
            throw new Error(
              `Invalid simulator file (${f}) - simulator.json not found.`
            );
          }
          snapshot[relpath] = JSON.parse(readFileSync(simJson, "utf-8"));
        } else {
          snapshot[relpath] = readFileSync(abspath, "utf-8");
        }
      }
    }
  };

  visit(".");

  return snapshot;
}

export function appSnapshot(app: IApp): Record<string, any> {
  app.synth();
  return directorySnapshot(app.outdir);
}
