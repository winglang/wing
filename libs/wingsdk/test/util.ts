import { mkdtempSync, readFileSync, readdirSync, statSync } from "fs";
import { tmpdir } from "os";
import { extname, isAbsolute, join } from "path";
import { Template } from "aws-cdk-lib/assertions";
import { App, Code } from "../src/core";

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

export function awscdkSanitize(template: Template): any {
  let json = template.toJSON();

  return JSON.parse(
    JSON.stringify(json, (key, value) => {
      if (key === "S3Key" && value.endsWith(".zip")) {
        return "<S3Key>";
      }
      return value;
    })
  );
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
