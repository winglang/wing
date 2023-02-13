import { github } from "projen";
import { NodePackageManager, TrailingComma } from "projen/lib/javascript";
import {
  TypeScriptProjectOptions as BaseOptions,
  TypeScriptProject as BaseProject,
} from "projen/lib/typescript";

import { EditorconfigFile } from "./editorconfigFile.js";
import { TsxRunner } from "./tsxRunner.js";
import { Vitest } from "./vitest.js";

export interface TypeScriptProjectOptions {
  /**
   * This is the name of your project.
   *
   * @default $BASEDIR
   * @featured
   */
  readonly name: string;

  /**
   * The description is just a string that helps people understand the purpose of the package.
   * It can be used when searching for packages in a package manager as well.
   * See https://classic.yarnpkg.com/en/docs/package-json/#toc-description
   * @featured
   */
  readonly description: string;

  /**
   * Runtime dependencies of this module.
   *
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   *
   * @example [ 'express', 'lodash', 'foo@^2' ]
   * @default []
   * @featured
   */
  readonly deps?: string[];

  /**
   * Build dependencies for this module. These dependencies will only be
   * available in your build environment but will not be fetched when this
   * module is consumed.
   *
   * The recommendation is to only specify the module name here (e.g.
   * `express`). This will behave similar to `yarn add` or `npm install` in the
   * sense that it will add the module as a dependency to your `package.json`
   * file with the latest version (`^`). You can specify semver requirements in
   * the same syntax passed to `npm i` or `yarn add` (e.g. `express@^2`) and
   * this will be what you `package.json` will eventually include.
   *
   * @example [ 'typescript', '@types/express' ]
   * @default []
   * @featured
   */
  readonly devDeps?: string[];

  /**
   * Peer dependencies for this module. Dependencies listed here are required to
   * be installed (and satisfied) by the _consumer_ of this library. Using peer
   * dependencies allows you to ensure that only a single module of a certain
   * library exists in the `node_modules` tree of your consumers.
   *
   * Note that prior to npm@7, peer dependencies are _not_ automatically
   * installed, which means that adding peer dependencies to a library will be a
   * breaking change for your customers.
   *
   * Unless `peerDependencyOptions.pinnedDevDependency` is disabled (it is
   * enabled by default), projen will automatically add a dev dependency with a
   * pinned version for each peer dependency. This will ensure that you build &
   * test your module against the lowest peer version required.
   *
   * @default []
   */
  readonly peerDeps?: string[];

  /**
   * Options for `peerDeps`.
   */
  readonly peerDependencyOptions?: BaseOptions["peerDependencyOptions"];
}

/**
 * Monada TypeScript Project for Projen.
 *
 * @pjid typescript
 */
export class TypeScriptProject extends BaseProject {
  constructor(options: TypeScriptProjectOptions) {
    super({
      defaultReleaseBranch: "main",
      packageManager: NodePackageManager.NPM,

      authorName: "Monada",
      authorEmail: "ping@monada.co",
      authorOrganization: true,
      authorUrl: "https://monada.co",

      npmRegistryUrl: "https://npm.pkg.github.com",

      // Enabling [compilerOptions.noUncheckedIndexedAccess] will prevent
      // accessing undefined properties from untyped objects by mistake.
      // See https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess
      tsconfig: {
        compilerOptions: {
          noUncheckedIndexedAccess: true,
        },
      },

      prettier: true,
      prettierOptions: {
        settings: {
          trailingComma: TrailingComma.ALL,
        },
      },

      projenrcTs: true,

      commitGenerated: false,

      minNodeVersion: "18.0.0",
      workflowNodeVersion: "18.x",

      jest: false,

      // Some workflows require the git identity that pushes the commits to be a real GitHub user.
      workflowGitIdentity: {
        name: "monabot",
        email: "monabot@monada.co",
      },

      ...options,
    });

    // Ignore config files that shouldn't be packaged.
    this.addPackageIgnore("/.gitattributes");
    this.addPackageIgnore("/.prettierrc.json");
    this.addPackageIgnore("/.prettierignore");

    // Editorconfig files allow defining the preferred indent style and size,
    // whether trailing whitespace should be trimmed, etc. Editors such as
    // VSCode can interpret it and display proper indentation guides.
    new EditorconfigFile(this);

    // Using `tsx` in favor of `ts-node` will increase the performance
    // when executing typescript files.
    new TsxRunner(this);

    // The `vitest` test runner is a replacement for `jest` that uses `esbuild`, like `tsx`.
    new Vitest(this);
  }
}
