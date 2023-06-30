#!/usr/bin/env tsx

// https://github.com/aws/aws-prototyping-sdk/blob/63a5a3127ad69fc0dfca7173dc1f877ea98cc072/packages/nx-monorepo/scripts/pnpm/link-bundled-transitive-deps.ts
/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */

import path from "node:path";
import fs from "fs-extra";
import SemVer from "semver";
import { buildDependenciesHierarchy, PackageNode } from "@pnpm/reviewing.dependencies-hierarchy";
import { execSync } from "node:child_process";

export async function linkBundledTransitiveDeps(workspaceDir: string, pkgDir: string) {
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf-8"));
  const bundledDeps: string[] = pkgJson.bundledDependencies || [];
  if (!bundledDeps.length) {
    // No bundled deps
    return;
  }

  const dependencyHierarchy = (await buildDependenciesHierarchy([pkgDir], {
    depth: Number.MAX_SAFE_INTEGER,
    lockfileDir: workspaceDir,
    include: {
      optionalDependencies: false,
      dependencies: true,
      devDependencies: false,
    },
  }))[pkgDir];

  const transitiveDeps: Record<string, PackageNode> = {};

  function visit(_deps?: PackageNode[]) {
    if (_deps == null || !_deps.length) {
      return;
    }

    _deps.forEach((_dep) => {
      if (_dep.resolved == null || _dep.isMissing || _dep.version.startsWith("link:")) {
        // Unresolved / unsaved dependency
        return;
      }

      // record the transitive dep with resolved path to symlink
      const _existing = transitiveDeps[_dep.alias];
      // Use the latest version of transitive deps only
      // TODO: Can we support multiple versions of transitive deps, and should we?
      if (!_existing || SemVer.gt(_dep.version, _existing.version)) {
        transitiveDeps[_dep.alias] = _dep;

        // traverse
        visit(_dep.dependencies);
      }
    })
  }

  for (const _bundledDepName of bundledDeps) {
    const _bundledDep = (dependencyHierarchy.dependencies || []).find((v) => v.alias === _bundledDepName);
    if (_bundledDep == null) {
      throw new Error(`Package ${pkgJson.name} bundled dependency "${_bundledDepName}" is missing dependency declaration.`)
    }

    visit(_bundledDep.dependencies);
  }

  // create symlink for each transitive dep in package node_modules
  for (const [name, dep] of Object.entries(transitiveDeps)) {
    const _dest = path.join(pkgDir, "node_modules", name);
    if (!(fs.pathExistsSync(_dest))) {
      if (!(fs.pathExistsSync(dep.path))) {
        console.warn(dep);
        throw new Error(`Pnpm dependency path not found: ${dep.path}`);
      }

      fs.createSymlinkSync(dep.path, _dest, "dir");
    }
  }

  console.info(`Package "${pkgDir}" transitive bundled dependencies are linked:`, Object.keys(transitiveDeps).sort().join(", "));
}

async function main() {
  let workspaceDir = process.cwd();
  // walk up until we find a pnpm-lock.yaml
  while (!fs.pathExistsSync(`${workspaceDir}/pnpm-lock.yaml`)) {
    workspaceDir = path.dirname(workspaceDir);
    if (workspaceDir === "/") {
      throw new Error("Could not find pnpm-lock.yaml");
    }
  }

  const pnpmList = execSync("pnpm m ls --json --depth=-1", { encoding: "utf-8"});
  const pnpmListJson = JSON.parse(pnpmList.trim());
  for (const pkg of pnpmListJson) {
    await linkBundledTransitiveDeps(workspaceDir, pkg.path);
  }
}

void main();