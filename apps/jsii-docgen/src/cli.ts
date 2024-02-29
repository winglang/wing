import * as fs from "fs";
import * as yargs from "yargs";
import { Language } from "./docgen/transpile/transpile";
import { Documentation } from "./index";

export async function main() {
  const args = yargs
    .usage("Usage: $0")
    .option("output", {
      type: "string",
      alias: "o",
      required: false,
      desc: "Output filename (defaults to API.md if format is markdown, and API.json if format is JSON)",
    })
    .option("format", {
      alias: "f",
      default: "md",
      choices: ["md", "json"],
      desc: "Output format, markdown or json",
    })
    .option("language", {
      alias: "l",
      default: "typescript",
      choices: Language.values().map((x) => x.toString()),
      desc: "Output language",
    })
    .option("package", {
      type: "string",
      required: false,
      desc: "The name@version of an NPM package to document",
      defaultDescription: "The package in the current directory",
    })
    .option("submodule", {
      type: "string",
      required: false,
      desc: 'Generate docs for a specific submodule (or "root")',
    })
    .example(
      "$0",
      "Generate documentation for the current module as a single file (auto-resolves node depedencies)",
    ).argv;

  const language = Language.fromString(args.language);
  const submodule = args.submodule === "root" ? undefined : args.submodule;
  const allSubmodules = !args.submodule;
  const docs = await (args.package
    ? Documentation.forPackage(args.package)
    : Documentation.forProject(process.cwd()));
  const options = { readme: false, language, submodule, allSubmodules };
  const fileSuffix = args.format === "md" ? "md" : "json";
  const output = args.output ?? `API.${fileSuffix}`;

  const content = await (args.format === "md"
    ? docs.toMarkdown(options)
    : docs.toJson(options));
  fs.writeFileSync(output, content.render());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
