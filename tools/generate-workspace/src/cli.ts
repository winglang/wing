import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { findWorkspaceDir } from "@pnpm/find-workspace-dir";
import { writeFileSync } from "fs";
import { join } from "path";

// Define ignore list and name mapping
const ignoreList = [
  "construct-library",
  "@wingconsole/eslint-plugin",
  "generate-workspace",
  "bump-pack",
  "@winglang/wingii",
  "@winglang/wingc",
  "@winglang/tree-sitter-wing",
  "@wingconsole/error-message",
  "@wingconsole/use-loading",
  "@wingconsole/tsconfig",
  "hangar",
  "@wingconsole/design-system",
  "@wingconsole/use-persistent-state",
  "@winglibs/testfixture",
];

const nameMapping: Record<string, string> = {
  "@winglang/monorepo": "ROOT",
  "winglang": "CLI",
  "@winglang/compiler": "Compiler",
  "@winglang/sdk": "SDK",
  "examples-sdk": "SDK Tests",
  "docs": "Docs",
  "@wingconsole/app": "Console App",
  "@wingconsole/server": "Console Server",
  "@wingconsole/ui": "Console UI",
  "vscode-wing": "VSCode",
  "@winglang/jsii-docgen": "API Docs Generator",
  "wing-api-checker": "API Checker",
  "examples-valid": "Tests: Valid",
  "examples-invalid": "Tests: Invalid",
  "examples-error": "Tests: Error",
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
  let sortedFolders = Object.keys(nameMapping).map(key => {
    return folders.find(folder => folder.name === key || folder.name === nameMapping[key]);
  }).filter(Boolean);
  return sortedFolders;
}

function warnAboutPackages(workspacePackages: any[]) {
  workspacePackages.forEach(pkg => {
    const pkgName = pkg.manifest.name;
    if (pkgName && (!ignoreList.includes(pkgName) && !Object.keys(nameMapping).includes(pkgName))) {
      console.warn(`Warning: Package ${pkgName} is not present in ignore list or name mappings. Please check ./tools/generate-workspace/src/cli.ts`);
    }
  });
}

function checkIgnoreListAndNameMapping(workspacePackages: any[]) {
  ignoreList.forEach(ignoreItem => {
    if (!workspacePackages.some(pkg => pkg.manifest.name === ignoreItem)) {
      console.error(`Error: ${ignoreItem} from ignore list is not present as a workspace package. Please check ./tools/generate-workspace/src/cli.ts`);
      process.exit(1);
    }
  });

  Object.keys(nameMapping).forEach(mappingItem => {
    if (!workspacePackages.some(pkg => pkg.manifest.name === mappingItem)) {
      console.error(`Error: ${mappingItem} from name mapping is not present as a workspace package. Please check ./tools/generate-workspace/src/cli.ts`);
      process.exit(1);
    }
  });
}

function writeWorkspaceFile(workspaceDir: string, sortedFolders: any[]) {
  const workspaceFilePath = join(workspaceDir, "wing.code-workspace");
  writeFileSync(workspaceFilePath, JSON.stringify({ folders: sortedFolders, settings: {}}, null, 2));
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
