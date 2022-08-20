import { mkdtempSync, readdirSync, readFileSync, statSync } from "fs";
import { tmpdir } from "os";
import { extname, join } from "path";
import { App } from "../src/core";

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

export function mkdtemp() {
  return mkdtempSync(join(tmpdir(), "wingsdk."));
}
