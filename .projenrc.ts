import { MonorepoProject } from "@skyrpex/wingen";
import { TextFile } from "projen";

const PNPM_VERSION = "8.15.1";
const NODE_VERSION = "20.17.0";

// Use a monorepo project to manage the workspace.
const monorepo = new MonorepoProject({
  name: "@winglang/monorepo",
  devDeps: [
    "@skyrpex/wingen",
    "@winglang/compatibility-spy",
    "bump-pack",
    "generate-workspace",
  ],
});

// No need for tsconfig.json in the monorepo root.
monorepo.tryRemoveFile("tsconfig.json");

// Wingen manages the workspace file for us, but we still don't use projen to manage these workspace packages.
monorepo
  .tryFindObjectFile("pnpm-workspace.yaml")
  ?.addToArray(
    "packages",
    "packages/*",
    "packages/@wingcloud/*",
    "packages/@winglang/*",
    "packages/@winglibs/*",
    "tools/*",
    "docs",
    "docs/docs",
    "wing-console/packages/*",
    "wing-console/console/*",
    "wing-console/tools/*",
    "tests/*",
    "packages/@winglang/jsii-docgen/test/__fixtures__/**",
  );

// Customize the turbo config. Ideally, the projen project should allow us to do this.
const turbo = monorepo.tryFindObjectFile("turbo.json");
turbo?.addOverride("globalDependencies", [
  "*.json",
  "*.toml",
  ".node-version",
  "insta.yaml",
  ".github/workflows/build.yml",
  "scripts/*",
  "patches/*",
  "tools/bump-pack/**",
  "!tools/bump-pack/node_modules/**",
]);
turbo?.addOverride("tasks", {
  default: {
    inputs: ["*.json", ".projenrc.ts"],
  },
  compile: {
    dependsOn: ["^compile"],
    inputs: [
      "bin/*",
      "*.ts",
      "*.js",
      "*.cjs",
      "*.json",
      "*.toml",
      "*.lock",
      "src/**/*.rs",
      "!src/**/*.test.ts",
      "!src/**/*.test.tsx",
      "src/**/*.ts",
      "src/**/*.tsx",
    ],
  },
  test: {
    dependsOn: ["compile"],
    inputs: [
      "*.ts",
      "*.js",
      "*.cjs",
      "*.json",
      "*.toml",
      "*.lock",
      "src/**/*.rs",
      "src/**/*.ts",
      "src/**/*.tsx",
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "test/**",
    ],
    outputs: ["**/__snapshots__/**", "**/*.snap"],
  },
  bench: {
    dependsOn: ["compile"],
    inputs: [
      "*.ts",
      "*.js",
      "*.cjs",
      "*.json",
      "*.toml",
      "*.lock",
      "src/**/*.rs",
      "src/**/*.ts",
      "src/**/*.tsx",
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "test/**",
    ],
  },
  "test:playwright": {
    dependsOn: ["compile"],
    inputs: [
      "*.ts",
      "*.js",
      "*.cjs",
      "*.json",
      "*.toml",
      "*.lock",
      "src/**",
      "test/**",
    ],
  },
  "post-compile": {
    inputs: [""],
    dependsOn: ["compile"],
  },
  lint: {
    inputs: [
      "*.ts",
      "*.js",
      "*.cjs",
      "*.json",
      "*.toml",
      "*.lock",
      "src/**/*.rs",
      "src/**/*.ts",
      "src/**/*.tsx",
      "test/**",
    ],
  },
  eslint: {
    inputs: [
      "*.ts",
      "*.js",
      "*.cjs",
      "*.json",
      "*.toml",
      "*.lock",
      "src/**/*.rs",
      "src/**/*.ts",
      "src/**/*.tsx",
      "test/**",
    ],
  },
  package: {
    dependsOn: ["compile", "post-compile"],
    env: ["PROJEN_BUMP_VERSION"],
    inputs: ["*.md", "LICENSE"],
  },
  topo: {
    inputs: ["**", "!node_modules/**", "!*/**/target/**"],
    dependsOn: ["^topo"],
  },
  dev: {
    cache: false,
    persistent: true,
  },
  "wing:e2e": {
    dependsOn: ["hangar#test"],
  },
  "wing:bench": {
    dependsOn: ["hangar#bench"],
  },
});
turbo?.addDeletionOverride("tasks.compile.outputs");

// Customize the tasks. Need to run some hacks in order to customize all of them.
monorepo.tasks.removeTask("build");
const buildTask = monorepo.addTask("build");
buildTask.spawn(monorepo.defaultTask!);
buildTask.exec("turbo compile post-compile lint eslint test package");
monorepo.tasks.removeTask("compile");
const compileTask = monorepo.addTask("compile");
compileTask.exec("turbo compile");
monorepo.testTask.reset("turbo lint eslint test");
monorepo.devTask.reset();
monorepo.addScript("package", "turbo package");
monorepo.addScript(
  "package:ci",
  "turbo package --color --summarize && tar -czvf dist/docs.tgz docs/*",
);
monorepo.addScript(
  "test:ci",
  "turbo default --color --concurrency 1 && turbo compile post-compile lint eslint test test:playwright --color --filter=!hangar --summarize",
);
monorepo.addScript("docs", "./scripts/docsite.sh");
monorepo.addScript("install", "bash scripts/setup_wasi.sh");
monorepo.addScript("postinstall", "link-bundles && generate-workspace");
monorepo.addScript(
  "wing",
  "turbo compile -F winglang --output-logs=new-only && ./packages/winglang/bin/wing",
);

// Specify engine and package manager versions.
monorepo.addFields({
  packageManager: `pnpm@${PNPM_VERSION}`,
  volta: {
    node: NODE_VERSION,
    pnpm: PNPM_VERSION,
  },
});

new TextFile(monorepo, ".node-version", {
  lines: [NODE_VERSION, ""],
});

new TextFile(monorepo, ".nvmrc", {
  lines: [NODE_VERSION, ""],
});

// Specify pnpm overrides and patches.
monorepo.addFields({
  pnpm: {
    overrides: {
      mime: "^3.0.0",
      "axios@>=0.8.1 <0.28.0": ">=0.28.0",
    },
    patchedDependencies: {
      "wasi-js@1.7.3": "patches/wasi-js@1.7.3.patch",
      "mime@3.0.0": "patches/mime@3.0.0.patch",
      "protobufjs@7.2.5": "patches/protobufjs@7.2.5.patch",
      "jsii@5.5.4": "patches/jsii@5.5.4.patch",
    },
  },
});

// Customize the gitignore.
monorepo.addGitIgnore("node_modules/");
monorepo.addGitIgnore(".DS_Store");
monorepo.addGitIgnore(".pnpm-store/");
// Terraform state files
monorepo.addGitIgnore("*.tfstate");
monorepo.addGitIgnore("*.tfstate.*");
// Generated wing output
monorepo.addGitIgnore("*.w.out/");
// Generated wingc .jsii binary cache
monorepo.addGitIgnore("**/*.jsii.speedy");
// cargo output
// will have compiled files and executables from cargo
monorepo.addGitIgnore("debug/");
monorepo.addGitIgnore("target/");
// Packaged npm files
monorepo.addGitIgnore("/dist/");
// These are backup files generated by rustfmt
monorepo.addGitIgnore("**/*.rs.bk");
// MSVC Windows builds of rustc generate these, which store debugging information
monorepo.addGitIgnore("*.pdb");
// turbo
monorepo.addGitIgnore(".turbo/");
// history
monorepo.addGitIgnore(".history/");

///////////////////////////////////////////////////////////////////////////////
monorepo.synth();
