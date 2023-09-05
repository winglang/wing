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

/**
 * Given a pnpm projen in a workspace, ensure all of its
 * bundled deps (and their transitive deps) are symlinked in the project's node_modules.
 *
 * This is necessary because pnpm intentionally does not make transitive deps of
 * bundled deps available when publishing packages. When packing the tarball for the project, it
 * will be able to include all the symlinked transitive deps.
 * @param workspaceDir pnpm workspace root, must contain a lockfile
 * @param project pnpm project
 * @returns
 */
export async function linkBundledTransitiveDeps(
  workspaceDir: string,
  project: Project
) {
  const bundledDeps =
    project.manifest.bundledDependencies ?? project.manifest.bundleDependencies;
  if (!bundledDeps || bundledDeps.length === 0) {
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

  const depsToLink: Record<string, PackageNode> = {};

  function visitDependencies(deps?: PackageNode[]) {
    if (!deps || deps.length === 0) {
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
      const existing_dep = depsToLink[dep.alias];

      // Use the latest version of transitive deps only
      if (!existing_dep || SemVer.gt(dep.version, existing_dep.version)) {
        depsToLink[dep.alias] = dep;
      }
      visitDependencies(dep.dependencies);
    });
  }

  for (const bundledDepName of bundledDeps) {
    const bundledDep = dependencyHierarchy.dependencies?.find(
      (v) => v.alias === bundledDepName
    );
    if (!bundledDep) {
      throw new Error(
        `Package ${project.manifest.name} bundled dependency "${bundledDepName}" is missing dependency declaration.`
      );
    }

    depsToLink[bundledDep.alias] = bundledDep;
    visitDependencies(bundledDep.dependencies);
  }

  // create symlink for each transitive dep in package node_modules
  for (const [name, dep] of Object.entries(depsToLink)) {
    const destModule = path.join(project.dir, "node_modules", name);
    if (!(await fs.pathExists(destModule))) {
      if (!(await fs.pathExists(dep.path))) {
        throw new Error(`pnpm dependency path not found: ${dep.path}`);
      }
      await fs.ensureSymlink(dep.path, destModule);
    }
  }

  const linkedKeys = Object.keys(depsToLink);
  console.log(
    `Linked ${linkedKeys.length} transitive bundled deps for:\t ${project.manifest.name}`
  );

  await fs.writeJSON(
    path.join(project.dir, "node_modules", ".modulelinks"),
    linkedKeys
  );
}

// Run for all packages in the workspace
let workspaceDir = await findWorkspaceDir(process.cwd());
if (!workspaceDir) {
  throw new Error("No workspace found");
}
for (const pkg of await findWorkspacePackages(workspaceDir)) {
  if (!pkg.manifest.private) {
    await linkBundledTransitiveDeps(workspaceDir, pkg);
  }
}
