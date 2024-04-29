import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import chokidar from "chokidar";
import * as glob from "glob-promise";
import { SourceLocatable, TypeSystem } from "jsii-reflect";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

async function generateWarnings(packageDir: string): Promise<number> {
  const ts = new TypeSystem();
  for (let dotJsii of await glob.promise(`${packageDir}/**/.jsii`)) {
    await ts.load(dotJsii);
  }

  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(packageDir, "package.json"), "utf8")
  );
  const pkgName = pkgJson.name;
  const assembly = ts.findAssembly(pkgName);
  const classes = assembly.allSubmodules.map((x) => x.classes).flat();
  const interfaces = assembly.allSubmodules.map((x) => x.interfaces).flat();
  const enums = assembly.allSubmodules.map((x) => x.enums).flat();

  let warnings = 0;

  function warn(message: string) {
    console.log(chalk.yellow("WARN") + " " + message);
    warnings += 1;
  }

  const IResource = interfaces.find((x) => x.name === "IResource");
  if (!IResource) {
    throw new Error("IResource not found");
  }

  const IInflight = interfaces.find((x) => x.name === "IInflight");
  if (!IInflight) {
    throw new Error("IInflight not found");
  }

  for (const cls of classes) {
    if (!cls.docs.summary) {
      warn(`Missing docstring for ${cls.fqn} (${loc(cls)})`);
    }
    for (const member of cls.allMembers) {
      if (!member.docs.summary) {
        warn(
          `Missing docstring for ${cls.fqn}.${member.name} (${loc(member)})`
        );
      }
    }
    if (
      cls.getInterfaces(true).includes(IResource) ||
      cls.getInterfaces(true).includes(IInflight)
    ) {
      if (
        cls.docs.customTag("inflight") === undefined &&
        cls.docs.customTag("noinflight") === undefined
      ) {
        warn(
          `Missing @inflight in docstring for ${cls.fqn} (${loc(
            cls
          )}). Suppress with @noinflight.`
        );
      }
    }
  }

  for (const iface of interfaces) {
    if (!iface.docs.summary) {
      warn(`Missing docstring for ${iface.fqn} (${loc(iface)})`);
    }
    for (const member of iface.allMembers) {
      if (!member.docs.summary) {
        warn(
          `Missing docstring for ${iface.fqn}.${member.name} (${loc(member)})`
        );
      }
    }

    if (iface.name.endsWith("Props")) {
      for (const prop of iface.allProperties) {
        if (prop.optional && !prop.docs.docs.default) {
          warn(
            `Missing @default in docstring for ${iface.fqn}.${prop.name} (${loc(
              prop
            )})`
          );
        }
      }
    }
  }

  for (const enu of enums) {
    if (!enu.docs.summary) {
      warn(`Missing docstring for ${enu.fqn} (${loc(enu)})`);
    }
    for (const member of enu.members) {
      if (!member.docs.summary) {
        warn(`Missing docstring for ${enu.fqn}.${member.name} (${loc(enu)})`);
      }
    }
  }

  console.log(`${warnings} API warnings for ${pkgName}.`);

  return warnings;
}

function loc(locatable: SourceLocatable) {
  return `${locatable.locationInModule?.filename}:${locatable.locationInModule?.line}`;
}

async function main() {
  const args = await yargs(hideBin(process.argv))
    .option("packageDir", {
      type: "string",
      defaultDescription: "The package in the current directory",
    })
    .option("watch", {
      type: "boolean",
      default: false,
    }).argv;
  const packageDir = args.packageDir ?? ".";

  if (args.watch) {
    console.log();
    console.clear();
    await generateWarnings(packageDir);

    chokidar.watch(`${packageDir}/*.jsii`).on("all", (_event, _path) => {
      console.log();
      console.clear();
      console.log("Files changed. Regenerating warnings...");
      void generateWarnings(packageDir);
    });
  } else {
    const warnings = await generateWarnings(packageDir);
    if (warnings > 0) {
      process.exitCode = 1;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
