import { Argument, Command, Option } from "commander";
import { satisfies } from "compare-versions";

import { optionallyDisplayDisclaimer } from "./analytics/disclaimer";
import { exportAnalytics } from "./analytics/export";
import { SNAPSHOTS_HELP } from "./commands/test/snapshots-help";
import { currentPackage, projectTemplateNames, DEFAULT_PARALLEL_SIZE } from "./util";

export const PACKAGE_VERSION = currentPackage.version;
if (PACKAGE_VERSION == "0.0.0" && !process.env.DEBUG) {
  process.env.WING_DISABLE_ANALYTICS = "1";
}

const SUPPORTED_NODE_VERSION = currentPackage.engines.node;
if (!SUPPORTED_NODE_VERSION) {
  throw new Error("couldn't parse engines.node version from package.json");
}

const DEFAULT_PLATFORM = ["sim"];

let analyticsExportFile: Promise<string | undefined> | undefined;

function runSubCommand(subCommand: string, path: string = subCommand) {
  return async (...args: any[]) => {
    try {
      // paths other than the root path aren't working unless specified in the path arg
      const exitCode = await import(`./commands/${path}`).then((m) => m[subCommand](...args));
      if (exitCode === 1) {
        await exportAnalyticsHook();
        process.exitCode = 1;
      }
    } catch (err) {
      console.error((err as any)?.message ?? err);
      process.exitCode = 1;
    }
  };
}

let platformOptionCount = 0;
// Removes default if a platform option is provided by user
function collectPlatformVariadic(value: string, previous: string[]) {
  return platformOptionCount++ == 0 ? [value] : collectVariadic(value, previous);
}

// Required to support --option x --option y --option z rather than --option x y z
function collectVariadic(value: string, previous: string[]) {
  return previous.concat([value]);
}

async function collectAnalyticsHook(cmd: Command) {
  if (process.env.WING_DISABLE_ANALYTICS) {
    return;
  }
  // Fail silently if collection fails
  try {
    optionallyDisplayDisclaimer();
    const analyticsModule = await import("./analytics/collect");
    analyticsExportFile = analyticsModule.collectCommandAnalytics(cmd).catch((err) => {
      if (process.env.DEBUG) {
        console.error(err);
      }
      return undefined;
    });
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

  program.name("wing").version(PACKAGE_VERSION, "-v, --version, -V", "output the current version");

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
    .argument("[entrypoint]", "Program .w entrypoint")
    .option("-p, --port <port>", "Specify port")
    .option("--no-open", "Do not open the Wing Console in the browser")
    .option(
      "-w, --watch <globs...>",
      "Watch additional paths for changes. Supports globs and '!' for negations."
    )
    .option(
      "-t, --platform <platform> --platform <platform>",
      "Target platform provider (builtin: sim)",
      collectPlatformVariadic,
      DEFAULT_PLATFORM
    )
    .option("--statedir <dir>", "Directory for the resource's state")
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("run"));

  program
    .command("lsp")
    .description("Run the Wing language server on stdio")
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("lsp"));

  program
    .command("generate-docs")
    .description("Generate documentation for the current project")
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("generateDocs"));

  program
    .command("compile")
    .description("Compiles a Wing program")
    .argument("[entrypoint]", "program .w entrypoint")
    .option(
      "-t, --platform <platform> --platform <platform>",
      "Target platform provider (builtin: sim, tf-aws, tf-azure, tf-gcp)",
      collectPlatformVariadic,
      DEFAULT_PLATFORM
    )
    .option("-r, --rootId <rootId>", "App root id")
    .option(
      "-o, --output <output>",
      'path to the output directory- default is "./target/<entrypoint>.<target>"'
    )
    .option("-v, --value <value>", "Platform-specific value in the form KEY=VALUE", addValue, [])
    .option("--values <file>", "File with platform-specific values (TOML|YAML|JSON)")
    .hook("preAction", progressHook)
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("compile"));

  program
    .command("secrets")
    .description("Manage secrets")
    .argument("[entrypoint]", "program .w entrypoint")
    .option(
      "-t, --platform <platform> --platform <platform>",
      "Target platform provider (builtin: sim, tf-aws, tf-azure, tf-gcp, awscdk)",
      collectPlatformVariadic,
      DEFAULT_PLATFORM
    )
    .option("-v, --value <value>", "Platform-specific value in the form KEY=VALUE", addValue, [])
    .option("--values <file>", "File with platform-specific values (TOML|YAML|JSON)")
    .addOption(new Option("--list", "List required application secrets"))
    .hook("preAction", progressHook)
    .hook("preAction", collectAnalyticsHook)
    .action(runSubCommand("secrets"));

  program
    .command("test")
    .description(
      "Compiles a Wing program and runs all functions with the word 'test' or start with 'test:' in their resource identifiers"
    )
    .argument("[entrypoint...]", "all files to test (globs are supported)")
    .option(
      "-t, --platform <platform> --platform <platform>",
      "Target platform provider (builtin: sim, tf-aws, tf-azure, tf-gcp, awscdk)",
      collectPlatformVariadic,
      DEFAULT_PLATFORM
    )
    .addOption(
      new Option("-s, --snapshots <mode>", "Capture snapshots of compiler output")
        .choices(["auto", "never", "update", "deploy", "assert"])
        .default("auto")
    )
    .addHelpText("afterAll", SNAPSHOTS_HELP)
    .option("-r, --rootId <rootId>", "App root id")
    .option(
      "-f, --test-filter <regex>",
      "Run tests that match the provided regex pattern within the selected entrypoint files"
    )
    .option("--no-clean", "Keep build output")
    .option("--no-stream", "Do not stream logs")
    .option(
      "-o, --output-file <outputFile>",
      "File name to write test results to (file extension is required, supports only .json at the moment)"
    )
    .addOption(
      new Option("-R, --retry [retries]", "Number of times to retry failed tests")
        .preset(3)
        .argParser(parseInt)
    )
    .addOption(
      new Option(
        "-p, --parallel [batch]",
        `Number of tests to be executed on parallel- if not specified- ${DEFAULT_PARALLEL_SIZE} will run on parallel, 0 to run all at once`
      )
        .preset(DEFAULT_PARALLEL_SIZE)
        .argParser(parseInt)
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
    .command("new")
    .description("Create a new Wing project")
    .addArgument(
      new Argument("<template>", "Template name").choices(projectTemplateNames()).argOptional()
    )
    .addOption(
      new Option("-l --language [language]", "Language")
        .choices(["wing", "typescript"])
        .argParser((value) => value ?? "wing")
    )
    .addOption(new Option("--list-templates", "List available templates"))
    .hook("postAction", collectAnalyticsHook) // to catch the options that are added later
    .action(runSubCommand("init"));

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
  process.exitCode = 1;
});
