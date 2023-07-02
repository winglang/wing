#!/usr/bin/env tsx

// Based on logic found here:
// https://github.com/aws/aws-prototyping-sdk/blob/63a5a3127ad69fc0dfca7173dc1f877ea98cc072/packages/nx-monorepo/scripts/pnpm/link-bundled-transitive-deps.ts

import path from "node:path";
import fs from "fs-extra";
import SemVer from "semver";
import {
  buildDependenciesHierarchy,
  PackageNode,
} from "@pnpm/reviewing.dependencies-hierarchy";
import { findWorkspacePackages, Project } from "@pnpm/workspace.find-packages";
import { findWorkspaceDir } from "@pnpm/find-workspace-dir";

export async function linkBundledTransitiveDeps(
  workspaceDir: string,
  project: Project
) {
  const bundledDeps: string[] =
    project.manifest.bundledDependencies ??
    project.manifest.bundleDependencies ??
    [];
  if (!bundledDeps.length) {
    // No bundled deps
    return;
  }

  const dependencyHierarchy = (
    await buildDependenciesHierarchy([project.dir], {
      depth: Number.MAX_SAFE_INTEGER,
      lockfileDir: workspaceDir,
      include: {
        dependencies: true,
        optionalDependencies: false,
        devDependencies: false,
      },
    })
  )[project.dir];

  const transitiveDeps: Record<string, PackageNode> = {};

  function visitDependencies(deps?: PackageNode[]) {
    if (deps == null || !deps.length) {
      return;
    }

    deps.forEach((dep) => {
      if (
        dep.resolved == null ||
        dep.isMissing ||
        dep.version.startsWith("link:")
      ) {
        // Unresolved / unsaved dependency
        return;
      }

      // record the transitive dep with resolved path to symlink
      const existing_dep = transitiveDeps[dep.alias];

      // Use the latest version of transitive deps only
      if (!existing_dep || SemVer.gt(dep.version, existing_dep.version)) {
        transitiveDeps[dep.alias] = dep;
        visitDependencies(dep.dependencies);
      }
    });
  }

  for (const bundledDepName of bundledDeps) {
    const bundledDep = (dependencyHierarchy.dependencies ?? []).find(
      (v) => v.alias === bundledDepName
    );
    if (bundledDep == null) {
      throw new Error(
        `Package ${project.manifest.name} bundled dependency "${bundledDepName}" is missing dependency declaration.`
      );
    }

    visitDependencies(bundledDep.dependencies);
  }

  // create symlink for each transitive dep in package node_modules
  for (const [name, dep] of Object.entries(transitiveDeps)) {
    const _dest = path.join(project.dir, "node_modules", name);
    if (!(await fs.pathExists(_dest))) {
      if (!(await fs.pathExists(dep.path))) {
        throw new Error(`Pnpm dependency path not found: ${dep.path}`);
      }

      await fs.ensureSymlink(dep.path, _dest, "dir");
    }
  }

  console.log(
    `Linked ${
      Object.keys(transitiveDeps).length
    } transitive bundled deps for:\t ${project.manifest.name}`
  );
}

// walk up until we find a pnpm-lock.yaml
let workspaceDir = await findWorkspaceDir(process.cwd());
if (!workspaceDir) {
  throw new Error("No workspace found");
}

const workspacePackages = await findWorkspacePackages(workspaceDir);

for (const pkg of workspacePackages) {
  if (!pkg.manifest.private) {
    // console.log(`Linking bundled deps for ${pkg.dir}`);
    await linkBundledTransitiveDeps(workspaceDir, pkg);
  }
}
