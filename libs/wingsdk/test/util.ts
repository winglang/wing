import { mkdtempSync, readFileSync, readdirSync, statSync } from "fs";
import { tmpdir } from "os";
import { extname, isAbsolute, join, basename } from "path";
import { App } from "../src/core";
import { WingSimulatorSchema } from "../src/simulator";

export function treeJsonOf(outdir: string): any {
  return JSON.parse(readFileSync(join(outdir, "tree.json"), "utf8"));
}

export function tfResourcesOf(templateStr: string): string[] {
  return Object.keys(JSON.parse(templateStr).resource).sort();
}

export function tfDataSourcesOf(templateStr: string): string[] {
  return Object.keys(JSON.parse(templateStr).data).sort();
}

export function tfResourcesOfCount(
  templateStr: string,
  resourceId: string
): number {
  const template = JSON.parse(templateStr);
  const resource = template.resource[resourceId];
  if (!resource) {
    return 0;
  }
  return Object.values(resource).length;
}

export function tfDataSourcesOfCount(
  templateStr: string,
  dataSourceId: string
): number {
  const template = JSON.parse(templateStr);
  const dataSource = template.data[dataSourceId];
  if (!dataSource) {
    return 0;
  }
  return Object.values(dataSource).length;
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
  if (!resources) {
    return undefined;
  }
  const key = Object.keys(resources)[index ?? 0];
  return resources[key];
}

export function getTfDataSource(
  templateStr: string,
  dataSourceId: string,
  index?: number
): any {
  const dataSources = JSON.parse(templateStr).data[dataSourceId];
  if (!dataSources) {
    return undefined;
  }
  const key = Object.keys(dataSources)[index ?? 0];
  return dataSources[key];
}

export function tfSanitize(templateStr: string): any {
  // remove names of assets whose hashes are sensitive to changes based
  // on the file system layout
  return JSON.parse(templateStr, (key, value) => {
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
    if (
      key === "source_hash" &&
      typeof value === "string" &&
      value.startsWith("${filemd5")
    ) {
      return "${filemd5(<source>)}";
    }
    return value;
  });
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
      // skip node_modules because we are symlinking them into sim apps
      if (f === "node_modules") {
        continue;
      }
      // skip sandbox entrypoints since they are mostly a duplicate of the original
      if (f.endsWith(".sandbox.js")) {
        continue;
      }
      // skip esbuild output
      if (f.endsWith(".js.bundle")) {
        continue;
      }

      const relpath = join(subdir, f);
      const abspath = join(root, relpath);
      const key = prefix + relpath;
      if (statSync(abspath).isDirectory()) {
        // ignore .state files
        if (basename(abspath) !== ".state") {
          visit(root, relpath);
        }
      } else {
        switch (extname(f)) {
          case ".json":
            const data = readFileSync(abspath, "utf-8");
            snapshot[key] = JSON.parse(data);
            if (key.endsWith("simulator.json")) {
              snapshot[key] = sanitizePaths(snapshot[key]);
            }
            break;

          case ".js":
            const code = readFileSync(abspath, "utf-8");
            snapshot[key] = sanitizeCode(code);
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

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export function sanitizePaths(json: DeepWriteable<WingSimulatorSchema>) {
  // replace all values in the JSON that look like absolute paths with a placeholder of "<ABSOLUTE PATH>"
  for (const key of Object.keys(json)) {
    if (typeof json[key] === "string") {
      if (isAbsolute(json[key]) && key !== "pathPattern") {
        json[key] = `<ABSOLUTE PATH>/${basename(json[key])}`;
      }
    } else if (typeof json[key] === "object") {
      json[key] = sanitizePaths(json[key]);
    }
  }
  return json;
}

/**
 * Sanitize the text of a code bundle to remove path references that are system-specific.
 */
export function sanitizeCode(code: string): string {
  function removeAbsolutePaths(text: string) {
    const regex = /"[^"]+?\/libs\/wingsdk\/(.+?)"/g;

    // replace first group with static text
    return text.replace(regex, '"[REDACTED]/wingsdk/$1"');
  }

  return removeAbsolutePaths(code);
}

export function mkdtemp() {
  return mkdtempSync(join(tmpdir(), "wingsdk."));
}
