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
  "turbo package --color && tar -czvf dist/docs.tgz docs/*",
);
monorepo.addScript(
  "test:ci",
  "turbo default --color --concurrency 1 && turbo compile post-compile lint eslint test test:playwright --color --filter=!hangar",
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
      "axios@>=0.8.1 <0.28.0": ">=0.28.0 <1.0.0",
      "@grpc/grpc-js@>=1.0.0 <1.10.12": ">=1.10.12",
      "@trpc/server@>=10.27.0 <10.45.3": ">=10.45.3 <11.0.0",
      "ajv@>=6.0.0 <6.14.0": ">=6.14.0 <7.0.0",
      "axios@>=1.0.0 <1.16.0": ">=1.16.0 <2.0.0",
      "ip-address@>=9.0.0 <10.3.1": ">=10.3.1 <11.0.0",
      "js-cookie@>=2.0.0 <3.0.7": ">=3.0.7 <4.0.0",
      "pacote@>=18.0.0 <21.5.1": ">=21.5.1 <22.0.0",
      "sigstore@>=2.0.0 <4.1.1": ">=4.1.1 <5.0.0",
      "tmp@>=0.0.0 <0.2.6": ">=0.2.6 <0.3.0",
      "body-parser@>=1.0.0 <1.20.3": ">=1.20.3 <2.0.0",
      "brace-expansion@>=2.0.0 <2.1.4": ">=2.1.4 <3.0.0",
      "brace-expansion@>=1.0.0 <1.1.18": ">=1.1.18 <2.0.0",
      "cross-spawn@>=7.0.0 <7.0.5": ">=7.0.5 <8.0.0",
      "defu@>=6.0.0 <6.1.5": ">=6.1.5 <7.0.0",
      "dset@>=3.0.0 <3.1.4": ">=3.1.4 <4.0.0",
      "fast-loops@>=1.0.0 <1.1.4": ">=1.1.4 <2.0.0",
      "fast-uri@>=3.0.0 <3.1.6": ">=3.1.6 <4.0.0",
      "fast-xml-parser@>=4.0.0 <4.5.5": ">=4.5.5 <5.0.0",
      "flatted@>=3.0.0 <3.4.2": ">=3.4.2 <4.0.0",
      "form-data@>=4.0.0 <4.0.6": ">=4.0.6 <5.0.0",
      "form-data@>=2.0.0 <2.5.6": ">=2.5.6 <3.0.0",
      "glob@>=10.0.0 <10.5.0": ">=10.5.0 <11.0.0",
      "ip-address@>=10.0.0 <10.3.1": ">=10.3.1 <11.0.0",
      "js-cookie@>=3.0.0 <3.0.7": ">=3.0.7 <4.0.0",
      "js-yaml@>=4.0.0 <4.3.1": ">=4.3.1 <5.0.0",
      "jws@>=4.0.0 <4.0.1": ">=4.0.1 <5.0.0",
      "jws@>=3.0.0 <3.2.3": ">=3.2.3 <4.0.0",
      "launch-editor@>=2.0.0 <2.9.0": ">=2.9.0 <3.0.0",
      "lodash@>=4.0.0 <4.18.0": ">=4.18.0 <5.0.0",
      "minimatch@>=9.0.0 <9.0.7": ">=9.0.7 <10.0.0",
      "minimatch@>=5.0.0 <5.1.8": ">=5.1.8 <6.0.0",
      "minimatch@>=3.0.0 <3.1.4": ">=3.1.4 <4.0.0",
      "nanoid@>=5.0.0 <5.1.16": ">=5.1.16 <6.0.0",
      "nanoid@>=4.0.0 <5.1.16": ">=5.1.16 <6.0.0",
      "nanoid@>=3.0.0 <3.3.18": ">=3.3.18 <4.0.0",
      "node-forge@>=1.0.0 <1.4.0": ">=1.4.0 <2.0.0",
      "pacote@>=21.0.0 <21.5.1": ">=21.5.1 <22.0.0",
      "path-to-regexp@>=0.1.0 <0.1.13": ">=0.1.13 <0.2.0",
      "picomatch@>=2.0.0 <2.3.2": ">=2.3.2 <3.0.0",
      "postcss@>=8.0.0 <8.5.18": ">=8.5.18 <9.0.0",
      "protobufjs@>=7.0.0 <7.6.1": ">=7.6.1 <8.0.0",
      "shell-quote@>=1.0.0 <1.9.0": ">=1.9.0 <2.0.0",
      "sigstore@>=4.0.0 <4.1.1": ">=4.1.1 <5.0.0",
      "tar@>=0.0.0 <7.5.21": ">=7.5.21 <8.0.0",
      "undici@>=6.0.0 <6.27.0": ">=6.27.0 <7.0.0",
      "undici@>=5.0.0 <5.29.0": ">=5.29.0 <6.0.0",
      "ws@>=8.0.0 <8.21.0": ">=8.21.0 <9.0.0",
      "ajv@>=8.0.0 <8.18.0": ">=8.18.0 <9.0.0",
      "js-yaml@>=3.0.0 <3.15.1": ">=3.15.1 <4.0.0",
      "fast-xml-parser@>=4.0.0 <5.7.0": ">=5.7.0 <6.0.0",
      "qs@>=6.0.0 <6.16.0": ">=6.16.0 <7.0.0",
      "uuid@>=8.0.0 <11.1.1": ">=11.1.1 <12.0.0",
      "@smithy/config-resolver@>=3.0.0 <4.4.0": ">=4.4.0 <5.0.0",
      "@octokit/request-error@>=5.0.0 <5.1.1": ">=5.1.1 <6.0.0",
      "@octokit/request-error@>=2.0.0 <5.1.1": ">=5.1.1 <6.0.0",
      "@octokit/request@>=5.0.0 <8.4.1": ">=8.4.1 <9.0.0",
      "@octokit/plugin-paginate-rest@>=2.0.0 <9.2.2": ">=9.2.2 <10.0.0",
      // Pins below are not security fixes: they hold build-time tooling at the
      // versions main resolved to. Re-resolving the lockfile floated these to new
      // majors that break the build (TS 7 has no ts.createProgram; @types/minimatch 6
      // drops IOptions/IMinimatch, which @types/glob@7 still references).
      "jsii@>=5.5.0 <5.6.0": "5.5.33",
      "@wingcloud/framework>typescript": "5.5.2",
      "@wingconsole/app>typescript": "5.7.3",
      "@wingconsole/design-system>typescript": "5.5.2",
      "@wingconsole/error-message>typescript": "5.5.2",
      "@wingconsole/eslint-plugin>typescript": "5.5.2",
      "@wingconsole/server>typescript": "5.5.2",
      "@wingconsole/tsconfig>typescript": "5.5.2",
      "@wingconsole/ui>typescript": "5.5.2",
      "@wingconsole/use-loading>typescript": "5.5.2",
      "@wingconsole/use-persistent-state>typescript": "5.5.2",
      "@wingconsole/utilities>typescript": "5.5.2",
      "@winglang/compatibility-spy>typescript": "5.5.2",
      "@winglang/compiler>typescript": "5.5.2",
      "@winglang/docs>typescript": "5.5.2",
      "@winglang/jsii-docgen>typescript": "5.3.3",
      "@winglang/monorepo>typescript": "5.7.3",
      "@winglang/platform-awscdk>typescript": "5.5.2",
      "@winglang/sdk>typescript": "5.5.2",
      "@winglang/wingtunnels>typescript": "5.5.2",
      "bump-pack>typescript": "5.5.2",
      "compatibility-matrix-automation>typescript": "5.5.2",
      "construct-library>typescript": "5.5.2",
      "generate-workspace>typescript": "5.5.2",
      "vscode-wing>typescript": "5.5.2",
      "wing-api-checker>typescript": "5.5.2",
      "winglang>typescript": "5.5.2",
      "@types/minimatch": "5.1.2",
      "downlevel-dts>typescript": "5.8.0-dev.20250122",
      "jsii-pacmak": "1.100.0",
      "jsii-reflect": "1.100.0",
    },
    patchedDependencies: {
      "wasi-js@1.7.3": "patches/wasi-js@1.7.3.patch",
      "mime@3.0.0": "patches/mime@3.0.0.patch",
      "jsii@5.5.33": "patches/jsii@5.5.33.patch",
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
