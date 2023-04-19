import { mkdirSync, readdirSync, renameSync, rmSync, existsSync } from "fs";
import { join } from "path";
import * as cdktf from "cdktf";
import { Construct } from "constructs";
import stringify from "safe-stable-stringify";
import { PluginManager } from "./plugin-manager";
import { synthesizeTree } from "./tree";
import { IResource } from "../std/resource";

const TERRAFORM_STACK_NAME = "root";

/**
 * Props for all `App` classes.
 */
export interface AppProps {
  /**
   * Directory where artifacts are synthesized to.
   * @default - current working directory
   */
  readonly outdir?: string;

  /**
   * The name of the app.
   * @default "app"
   */
  readonly name?: string;

  /**
   * The path to a state file which will track all synthesized files. If a
   * statefile is not specified, we won't be able to remove extrenous files.
   * @default - no state file
   */
  readonly stateFile?: string;

  /**
   * Absolute paths to plugin javascript files.
   * @default - [] no plugins
   */
  readonly plugins?: string[];

  /**
   * Whether or not this app is being synthesized into a test environment.
   * @default false
   */
  readonly isTestEnvironment?: boolean;
}

/**
 * A Wing application.
 */
export abstract class App extends Construct {
  /**
   * Returns the root app.
   */
  public static of(scope: Construct): App {
    if (scope instanceof App) {
      return scope;
    }

    if (!scope.node.scope) {
      throw new Error("Cannot find root app");
    }

    return App.of(scope.node.scope);
  }

  /**
   * Loads the `App` class for the given target.
   * @param target one of the supported targets
   * @returns an `App` class constructor
   */
  public static for(target: string): any {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(`../target-${target}/app`).App;
    } catch {
      throw new Error(`Unknown compilation target: "${target}"`);
    }
  }

  /**
   * The output directory.
   */
  public abstract readonly outdir: string;

  /**
   * Whether or not this app is being synthesized into a test environment.
   */
  public abstract readonly isTestEnvironment: boolean;

  /**
   * The ".wing" directory, which is where the compiler emits its output. We are taking an implicit
   * assumption here that it is always set to be `$outdir/.wing` which is currently hard coded into
   * the `cli/compile.ts` file.
   */
  public get workdir() {
    return `${this.outdir}/.wing`;
  }

  /**
   * Synthesize the app into an artifact.
   */
  public abstract synth(): string;

  /**
   * Creates a new object of the given FQN.
   * @param fqn the fqn of the class to instantiate
   * @param ctor the constructor of the class to instantiate (undefined for abstract classes)
   * @param scope the scope of the resource
   * @param id the id of the resource
   * @param args the arguments to pass to the resource
   * @returns the new instance
   * @throws if the FQN is not supported
   */
  public new(
    fqn: string,
    ctor: any,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    // delegate to "tryNew" first, which will allow derived classes to inject
    const instance = this.tryNew(fqn, scope, id, ...args);
    if (instance) {
      return instance;
    }

    // no injection, so we'll just create a new instance
    return new ctor(scope, id, ...args);
  }

  /**
   * Creates a new object of the given abstract class FQN.
   */
  public newAbstract(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    // delegate to "tryNew" first, which will allow derived classes to inject
    const instance = this.tryNew(fqn, scope, id, ...args);
    if (!instance) {
      throw new Error(
        `Unable to create an instance of abstract type \"${fqn}\" for this target`
      );
    }

    return instance;
  }

  /**
   * Can be overridden by derived classes to inject dependencies.
   *
   * @param fqn The fully qualified name of the class to instantiate (jsii).
   * @param scope The construct scope.
   * @param id The construct id.
   * @param args The arguments to pass to the constructor.
   */
  protected tryNew(
    fqn: string,
    scope: Construct,
    id: string,
    ...args: any[]
  ): any {
    fqn;
    scope;
    id;
    args;
    return undefined;
  }
}

/**
 * An app that knows how to synthesize constructs into Terraform configuration
 * using cdktf. No polycon factory or Terraform providers are included.
 */
export abstract class CdktfApp extends App {
  /**
   * Path to the Terraform manifest file.
   */
  public readonly terraformManifestPath: string;
  public readonly outdir: string;
  public readonly isTestEnvironment: boolean;

  private readonly cdktfApp: cdktf.App;
  private readonly cdktfStack: cdktf.TerraformStack;
  private readonly pluginManager: PluginManager;

  private synthed: boolean;
  private synthedOutput: string | undefined;

  constructor(props: AppProps) {
    const outdir = props.outdir ?? ".";
    const cdktfOutdir = join(outdir, ".tmp.cdktf.out");

    mkdirSync(cdktfOutdir, { recursive: true });

    const cdktfApp = new cdktf.App({ outdir: cdktfOutdir });
    const cdktfStack = new cdktf.TerraformStack(cdktfApp, TERRAFORM_STACK_NAME);

    super(cdktfStack, "Default");

    // TODO: allow the user to specify custom backends
    // https://github.com/winglang/wing/issues/2003
    new cdktf.LocalBackend(cdktfStack, {
      path: "./terraform.tfstate",
    });

    this.outdir = outdir;
    this.isTestEnvironment = props.isTestEnvironment ?? false;

    // HACK: monkey patch the `new` method on the cdktf app (which is the root of the tree) so that
    // we can intercept the creation of resources and replace them with our own.
    (cdktfApp as any).new = (
      fqn: string,
      ctor: any,
      scope: Construct,
      id: string,
      ...args: any[]
    ) => this.new(fqn, ctor, scope, id, ...args);

    (cdktfApp as any).newAbstract = (
      fqn: string,
      scope: Construct,
      id: string,
      ...args: any[]
    ) => this.newAbstract(fqn, scope, id, ...args);

    this.pluginManager = new PluginManager(props.plugins ?? []);

    this.outdir = outdir;
    this.cdktfApp = cdktfApp;
    this.cdktfStack = cdktfStack;
    this.terraformManifestPath = join(this.outdir, "main.tf.json");
    this.synthed = false;
  }

  /**
   * Synthesize the app into Terraform configuration in a `cdktf.out` directory.
   *
   * This method returns a cleaned snapshot of the resulting Terraform manifest
   * for unit testing.
   */
  public synth(): string {
    if (this.synthed) {
      return this.synthedOutput!;
    }

    // call preSynthesize() on every construct in the tree
    preSynthesizeAllConstructs(this);

    // synthesize Terraform files in `outdir/.tmp.cdktf.out/stacks/root`
    this.pluginManager.preSynth(this);
    this.cdktfApp.synth();

    // move Terraform files from `outdir/.tmp.cdktf.out/stacks/root` to `outdir`
    this.moveCdktfArtifactsToOutdir();

    // rename `outdir/cdk.tf.json` to `outdir/main.tf.json`
    renameSync(
      join(this.outdir, "cdk.tf.json"),
      join(this.outdir, `main.tf.json`)
    );

    // delete `outdir/.tmp.cdktf.out`
    rmSync(this.cdktfApp.outdir, { recursive: true, force: true });

    // write `outdir/tree.json`
    synthesizeTree(this, this.outdir);

    // return a cleaned snapshot of the resulting Terraform manifest for unit testing
    const tfConfig = this.cdktfStack.toTerraform();
    const cleaned = cleanTerraformConfig(tfConfig);

    this.pluginManager.postSynth(tfConfig, `${this.outdir}/main.tf.json`);
    this.pluginManager.validate(tfConfig);

    this.synthed = true;
    this.synthedOutput = stringify(cleaned, null, 2) ?? "";

    return this.synthedOutput;
  }

  /**
   * Move files from `outdir/cdktf.out/stacks/root` to `outdir`.
   */
  private moveCdktfArtifactsToOutdir(): void {
    const directoriesToMove = ["assets"];
    const cdktfOutdir = this.cdktfApp.outdir;
    const cdktfStackDir = join(
      cdktfOutdir,
      this.cdktfApp.manifest.stacks[TERRAFORM_STACK_NAME].workingDirectory
    );

    const files = readdirSync(cdktfStackDir, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile() || directoriesToMove.includes(file.name)) {
        const source = join(cdktfStackDir, file.name);
        const destination = join(this.outdir, file.name);

        // If the file is a directory we need to delete contents of previous synthesis
        // or rename will fail
        if (existsSync(destination)) {
          rmSync(destination, { recursive: true });
        }

        renameSync(source, destination);
      }
    }
  }
}

/**
 * Return a cleaned Terraform template for unit testing
 * https://github.com/hashicorp/terraform-cdk/blob/55009f99f7503e5de2bacb1766ab51547821e6be/packages/cdktf/lib/testing/index.ts#L109
 */
function cleanTerraformConfig(template: any): any {
  function removeMetadata(item: any): any {
    if (item !== null && typeof item === "object") {
      if (Array.isArray(item)) {
        return item.map(removeMetadata);
      }

      const cleanedItem = Object.entries(item)
        // order alphabetically
        .sort(([a], [b]) => a.localeCompare(b))
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: removeMetadata(value),
          }),
          {}
        );

      // Remove metadata
      delete (cleanedItem as any)["//"];
      return cleanedItem;
    }

    return item;
  }
  const cleaned = removeMetadata(template);
  cleaned.terraform = undefined;
  cleaned.provider = undefined;
  return cleaned;
}

export function preSynthesizeAllConstructs(app: App): void {
  for (const c of app.node.findAll()) {
    if (typeof (c as IResource)._preSynthesize === "function") {
      (c as IResource)._preSynthesize();
    }
  }
}
