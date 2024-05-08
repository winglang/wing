import { readdir, writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Language, Documentation } from "@winglang/jsii-docgen";
import * as sdk from "../lib";

console.log("Generating SDK Docs...\n");
let docCounter = 0;

// go up one line, then clear it
const ANSI_LINE_CLEAR = "\x1b[1A\x1b[2K";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
const docsDir = join(rootDir, "..", "..", "docs", "docs");
const WING_LANGUAGE = Language.fromString("wing");

const SDK_DOCS = await Documentation.forProject(rootDir);

const getStdlibDocsDir = (name: string) => {
  return join(docsDir, "04-standard-library", name);
};

const docsFrontMatter = (name: string) => `---
title: API reference
id: api-reference
description: Wing standard library API reference for the ${name} module
keywords: [Wing sdk, sdk, Wing API Reference]
hide_title: true
sidebar_position: 100
---

<!-- This file is automatically generated. Do not edit manually. -->
`;

const UNDOCUMENTED_CLOUD_FILES = ["index", "test-runner"];
const UNDOCUMENTED_EX_FILES = ["index"];
const UNDOCUMENTED_STD_FILES = [
  "README",
  "index",
  "test-runner",
  "resource",
  "test",
  "range",
  "generics",
];

// those will be skipped out of the docs
const SKIPPED_MODULES = [
  "cloud",
  "ex",
  "std",
  "simulator",
  "core",
  "platform",
  "helpers",
];
const publicModules = Object.keys(sdk).filter(
  (item) =>
    item !== "default" &&
    !item.startsWith("_") &&
    !SKIPPED_MODULES.includes(item)
);

const toCamelCase = (str: string) =>
  str.replace(/_(.)/g, (_, chr) => chr.toUpperCase());

async function runDocgen(
  submodule: string,
  header: string,
  outputFile: string
) {
  console.log(`${ANSI_LINE_CLEAR}[${submodule}]`);
  const content =
    header +
    (await SDK_DOCS.toMarkdown({
      readme: false,
      language: WING_LANGUAGE,
      submodule,
      allSubmodules: false,
    }).then((x) => x.render()));
  await writeFile(outputFile, content);
  docCounter++;
}

enum DocumentationFilter {
  /**
   * Generate docs for all modules, and require they all have .md files
   */
  ALL_REQUIRE_MD,
  /**
   * Generate docs for all modules, but them to not have .md files
   */
  ALL_ALLOW_NO_MD,
  /**
   * Generate docs only for modules with .md files
   */
  ONLY_WITH_MD,
}

async function generateResourceApiDocs(
  folder: string,
  options: {
    docsPath: string;
    excludedFiles?: string[];
    jsiiModule?: string;
    filter: DocumentationFilter;
  }
) {
  const pathToFolder = join(rootDir, "src", folder);
  const { docsPath, excludedFiles = [], filter, jsiiModule = folder } = options;

  const cloudFiles = await readdir(pathToFolder);

  const cloudResources: Set<string> = new Set(
    cloudFiles.map((filename: string) => filename.split(".")[0])
  );

  excludedFiles.forEach((file) => cloudResources.delete(file));

  const undocumentedResources = Array.from(cloudResources).filter(
    (file) => !cloudFiles.includes(`${file}.md`)
  );

  if (
    undocumentedResources.length &&
    filter === DocumentationFilter.ALL_REQUIRE_MD
  ) {
    throw new Error(
      `Detected undocumented resources: ${undocumentedResources.join(
        ", "
      )}. Please add the corresponding .md files in ${pathToFolder} folder.`
    );
  }

  // generate api reference for each cloud/submodule and append it to the doc file
  for (const subResource of cloudResources) {
    let header = "";

    const hasMd = !undocumentedResources.includes(subResource);
    if (!hasMd && filter === DocumentationFilter.ONLY_WITH_MD) {
      continue;
    }

    if (hasMd) {
      header = await readFile(join(pathToFolder, `${subResource}.md`), "utf-8");
    } else {
      header = `\
---
title: ${toCamelCase(subResource)}
id: ${toCamelCase(subResource)}
---

`;
    }
    await runDocgen(
      `${jsiiModule}/${subResource}`,
      header,
      join(docsPath, `${subResource}.md`)
    );
  }
}

// Generate api reference for each submodule
for (const mod of publicModules) {
  await runDocgen(
    mod,
    docsFrontMatter(mod),
    join(getStdlibDocsDir(mod), "api-reference.md")
  );
}

await generateResourceApiDocs("cloud", {
  docsPath: getStdlibDocsDir("cloud"),
  excludedFiles: UNDOCUMENTED_CLOUD_FILES,
  filter: DocumentationFilter.ALL_REQUIRE_MD,
});

await generateResourceApiDocs("ex", {
  docsPath: getStdlibDocsDir("ex"),
  excludedFiles: UNDOCUMENTED_EX_FILES,
  filter: DocumentationFilter.ALL_REQUIRE_MD,
});

await generateResourceApiDocs("std", {
  docsPath: getStdlibDocsDir("std"),
  excludedFiles: UNDOCUMENTED_STD_FILES,
  filter: DocumentationFilter.ALL_ALLOW_NO_MD,
});

await generateResourceApiDocs("target-sim", {
  docsPath: getStdlibDocsDir("sim"),
  filter: DocumentationFilter.ONLY_WITH_MD,
  jsiiModule: "sim",
});

console.log(
  `${ANSI_LINE_CLEAR}${ANSI_LINE_CLEAR}${docCounter} Docs Generated!`
);
