import { Command, Option } from "commander";
import { satisfies } from "compare-versions";

import { collectCommandAnalytics } from "./analytics/collect";
import { optionallyDisplayDisclaimer } from "./analytics/disclaimer";
import { exportAnalytics } from "./analytics/export";
import { currentPackage } from "./util";
export const PACKAGE_VERSION = currentPackage.version;
let analyticsExportFile: Promise<string | undefined>;

if (PACKAGE_VERSION == "0.0.0" && !process.env.DEBUG) {
  process.env.WING_DISABLE_ANALYTICS = "1";
}

const SUPPORTED_NODE_VERSION = currentPackage.engines.node;
if (!SUPPORTED_NODE_VERSION) {
  throw new Error("couldn't parse engines.node version from package.json");
}

function runSubCommand(subCommand: string, path: string = subCommand) {
  return async (...args: any[]) => {
    try {
      // paths other than the root path aren't working unless specified in the path arg
      const exitCode = await import(`./commands/${path}`).then((m) => m[subCommand](...args));
      if (exitCode === 1) {
        await exportAnalyticsHook();
        process.exit(1);
      }
    } catch (err) {
      console.error((err as any)?.message ?? err);
      process.exit(1);
    }
  };
}

async function collectAnalyticsHook(cmd: Command) {
  if (process.env.WING_DISABLE_ANALYTICS) {
    return;
  }
  // Fail silently if collection fails
  try {
    optionallyDisplayDisclaimer();
    analyticsExportFile = collectCommandAnalytics(cmd);
  } catch (err) {
    if (process.env.DEBUG) {
      console.error(err);
    }
  }
}

async function exportAnalyticsHook() {
  if (process.env.WING_DISABLE_ANALYTICS) {
    return;
  }
  // Fail silently if export fails
  try {
    if (analyticsExportFile) {
      await exportAnalytics(analyticsExportFile);
    }
  } catch (err) {
    if (process.env.DEBUG) {
      console.error(err);
    }
  }
}

async function main() {
  checkNodeVersion();

  const program = new Command();

  program.configureHelp({
    sortOptions: true,
    showGlobalOptions: true,
  });

  program.name("wing").version(PACKAGE_VERSION);

  program
    .option("--debug", "Enable debug logging (same as DEBUG=1)", () => {
      process.env.DEBUG = "1";
    })
    .option("--progress", "Show compilation progress", () => {
      process.env.PROGRESS = "1";
    })
    .option("--no-progress", "Hide show compilation progress")
    .option("--no-update-check", "Skip checking for toolchain updates")
    .option(
      "--no-analytics",
      "Disable analytics collection (same as WING_DISABLE_ANALYTICS=1)",
      () => {
        process.env.WING_DISABLE_ANALYTICS = "1";
      }
    )
    .option("--no-color", "Disable colors for all output", () => {
      process.env.NO_COLOR = "1";
    });

  async function progressHook(cmd: Command) {
    const progress = program.opts().progress;
    if (progress !== false && cmd.opts().platform[0] !== "sim") {
      process.env.PROGRESS = "1";
    }
  }

  async function updateHook(cmd: Command) {
    const updateCheck = cmd.opts().updateCheck;
    if (updateCheck) {
      // most of the update check is network bound, so we don't want to block the rest of the CLI
      void import("./commands/upgrade").then((m) => m.checkForUpdates());
    }
  }

  function addValue(value: string, previous: string[]) {
    previous.push(value);
    return previous;
  }

  program.hook("preAction", updateHook);

  program
    .command("run")
    .alias("it")
    .description("Runs a Wing program in the Wing Console")
    .argument("[entrypoint]", "program .w entrypoint")
    .option("-p, --port <port>", "specify port")
    .option("--no-open", "Do not open the Wing Console in the browser")
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("run"));

  program
    .command("lsp")
    .description("Run the Wing language server on stdio")
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("lsp"));

  program
    .command("compile")
    .description("Compiles a Wing program")
    .argument("[entrypoint]", "program .w entrypoint")
    .addOption(new Option("-t, --platform <platform...>", "Target platform provider (builtin: sim, tf-aws, tf-azure, tf-gcp, awscdk)").default(["sim"]))
    .option("-r, --rootId <rootId>", "App root id")
    .option("-v, --value <value>", "Platform-specific value in the form KEY=VALUE", addValue, [])
    .option("--values <file>", "Yaml file with Platform-specific values")
    .hook("preAction", progressHook)
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("compile"));

  program
    .command("test")
    .description(
      "Compiles a Wing program and runs all functions with the word 'test' or start with 'test:' in their resource identifiers"
    )
    .argument("[entrypoint...]", "all files to test (globs are supported)")
    .addOption(new Option("-t, --platform <platform...>", "Target platform provider (builtin: sim, tf-aws, tf-azure, tf-gcp, awscdk)").default(["sim"]))
    .option("-r, --rootId <rootId>", "App root id")
    .option(
      "-f, --test-filter <regex>",
      "Run tests that match the provided regex pattern within the selected entrypoint files"
    )
    .option("--no-clean", "Keep build output")
    .option(
      "-o, --output-file <outputFile>",
      "File name to write test results to (file extension is required, supports only .json at the moment)"
    )
    .hook("preAction", progressHook)
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("test", "test/test"));

  program
    .command("pack")
    .description("Package the current directory into an npm library (gzipped tarball).")
    .addOption(new Option("-o --out-file <filename>", "Output filename"))
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("pack"));

  program
    .command("docs")
    .description("Open the Wing documentation")
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("docs"));

  program.hook("postAction", exportAnalyticsHook);

  program.parse();
}

function checkNodeVersion() {
  const supportedVersion = SUPPORTED_NODE_VERSION;

  if (!satisfies(process.version, supportedVersion)) {
    console.warn(
      `WARNING: You are running an incompatible node.js version ${process.version}. Compatible engine is: ${supportedVersion}.`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
