import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { findWorkspaceDir } from "@pnpm/find-workspace-dir";
import { writeFileSync } from "fs";
import { join } from "path";

// Define ignore list and name mapping
const ignoreList = [
  "@wingcloud/framework",
  "@wingconsole/design-system",
  "@wingconsole/error-message",
  "@wingconsole/eslint-plugin",
  "@wingconsole/tsconfig",
  "@wingconsole/use-loading",
  "@wingconsole/use-persistent-state",
  "@wingconsole/utilities",
  "@winglang/compatibility-spy",
  "@winglang/platform-awscdk",
  "@winglang/tree-sitter-wing",
  "@winglang/wingc",
  "@winglang/wingii",
  "@winglibs/testfixture",
  "@winglang/docs",
  "bump-pack",
  "compatibility-matrix-automation",
  "construct-library",
  "generate-workspace",
  "hangar",
  "jsii-fixture",
  "ts-fixture",
];

const nameMapping: Record<string, string> = {
  "@wingconsole/app": "Console App",
  "@wingconsole/server": "Console Server",
  "@wingconsole/ui": "Console UI",
  "@winglang/compiler": "Compiler",
  "@winglang/jsii-docgen": "API Docs Generator",
  "@winglang/compatibility-spy": "Compatibility spy",
  "@winglang/monorepo": "ROOT",
  "@winglang/sdk": "SDK",
  docs: "Docs",
  "examples-error": "Tests: Error",
  "examples-invalid": "Tests: Invalid",
  "examples-sdk": "SDK Tests",
  "examples-valid": "Tests: Valid",
  "examples-docs": "Tests: Docs",
  "vscode-wing": "VSCode",
  "wing-api-checker": "API Checker",
  winglang: "CLI",
  "wingcli-v2": "CLIv2",
  "@winglang/wingtunnels": "Tunnel Server",
};

async function getWorkspaceDir() {
  const workspaceDir = await findWorkspaceDir(process.cwd());
  if (!workspaceDir) {
    throw new Error("No workspace found");
  }
  return workspaceDir;
}

async function getWorkspacePackages(workspaceDir: string) {
  const workspacePackages = await findWorkspacePackages(workspaceDir);
  return workspacePackages;
}

function getFolders(workspacePackages: any[], workspaceDir: string) {
  const folders: Record<string, string>[] = [];
  for (const pkg of workspacePackages) {
    const pkgName = pkg.manifest.name;
    // Skip unwanted packages
    if (pkgName == undefined) throw new Error("Package name is undefined");
    if (ignoreList.includes(pkgName)) continue;

    // Use name mapping if present, else use the package name
    const name = nameMapping[pkgName] || pkgName;
    const path = pkg.dir.replace(workspaceDir, "").substring(1); // Remove workspaceDir from the path

    folders.push({ name, path: `./${path}` });
  }
  return folders;
}

function sortFolders(folders: any[]) {
  let sortedFolders = Object.keys(nameMapping)
    .map((key) => {
      return folders.find(
        (folder) => folder.name === key || folder.name === nameMapping[key]
      );
    })
    .filter(Boolean);
  return sortedFolders;
}

function warnAboutPackages(workspacePackages: any[]) {
  workspacePackages.forEach((pkg) => {
    const pkgName = pkg.manifest.name;
    if (
      pkgName &&
      !ignoreList.includes(pkgName) &&
      !Object.keys(nameMapping).includes(pkgName)
    ) {
      console.warn(
        `Warning: Package ${pkgName} is not present in ignore list or name mappings. Please check ./tools/generate-workspace/src/cli.ts`
      );
    }
  });
}

function checkIgnoreListAndNameMapping(workspacePackages: any[]) {
  ignoreList.forEach((ignoreItem) => {
    if (!workspacePackages.some((pkg) => pkg.manifest.name === ignoreItem)) {
      console.error(
        `Error: ${ignoreItem} from ignore list is not present as a workspace package. Please check ./tools/generate-workspace/src/cli.ts`
      );
      process.exit(1);
    }
  });

  Object.keys(nameMapping).forEach((mappingItem) => {
    if (!workspacePackages.some((pkg) => pkg.manifest.name === mappingItem)) {
      console.error(
        `Error: ${mappingItem} from name mapping is not present as a workspace package. Please check ./tools/generate-workspace/src/cli.ts`
      );
      process.exit(1);
    }
  });
}

function writeWorkspaceFile(workspaceDir: string, sortedFolders: any[]) {
  const workspaceFilePath = join(workspaceDir, "wing.code-workspace");
  writeFileSync(
    workspaceFilePath,
    JSON.stringify({ folders: sortedFolders, settings: {} }, null, 2)
  );
  console.log(`Workspace file written to ${workspaceFilePath}`);
}

async function main() {
  const workspaceDir = await getWorkspaceDir();
  const workspacePackages = await getWorkspacePackages(workspaceDir);
  const folders = getFolders(workspacePackages, workspaceDir);
  const sortedFolders = sortFolders(folders);
  warnAboutPackages(workspacePackages);
  checkIgnoreListAndNameMapping(workspacePackages);
  writeWorkspaceFile(workspaceDir, sortedFolders);
}

main();
