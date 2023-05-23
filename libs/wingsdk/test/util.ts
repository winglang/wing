import { mkdtempSync, readFileSync, readdirSync, statSync } from "fs";
import { tmpdir } from "os";
import { extname, isAbsolute, join } from "path";
import * as tar from "tar";
import { App, Code } from "../src/core";

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

export function tfResourcesWithProperty(
  templateStr: string,
  resourceId: string,
  properties: Record<string, string>
): Record<string, string> | undefined {
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

export function directorySnapshot(initialRoot: string) {
  const snapshot: Record<string, any> = {};

  const visit = (root: string, subdir: string, prefix = "") => {
    const files = readdirSync(join(root, subdir));
    for (const f of files) {
      const relpath = join(subdir, f);
      const abspath = join(root, relpath);
      const key = prefix + relpath;
      if (statSync(abspath).isDirectory()) {
        visit(root, relpath);
      } else {
        switch (extname(f)) {
          case ".json":
            const data = readFileSync(abspath, "utf-8");
            snapshot[key] = JSON.parse(data);
            break;

          case ".js":
            const code = readFileSync(abspath, "utf-8");
            snapshot[key] = sanitizeCodeText(code);
            break;

          case ".wsim":
            const workdir = mkdtemp();

            tar.extract({
              cwd: workdir,
              sync: true,
              file: abspath,
            });

            visit(workdir, ".", key + "/");
            break;

          default:
            snapshot[key] = readFileSync(abspath, "utf-8");
        }
      }
    }
  };

  visit(initialRoot, ".");

  return snapshot;
}

/**
 * Sanitize the text of a code bundle to remove path references that are system-specific.
 */
export function sanitizeCodeText(code: string): string {
  function removeAbsolutePaths(text: string) {
    const regex = /".+\/libs\/wingsdk\/(.+)"/g;

    // replace first group with static text
    return text.replace(regex, '"[REDACTED]/wingsdk/$1"');
  }

  return removeAbsolutePaths(code);
}

export function sanitizeCode(code: Code): string {
  return sanitizeCodeText(code.text);
}

export function mkdtemp() {
  return mkdtempSync(join(tmpdir(), "wingsdk."));
}
