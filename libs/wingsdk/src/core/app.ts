import {
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  rmdirSync,
  existsSync,
} from "fs";
import { join } from "path";
import * as cdktf from "cdktf";
import { Construct, IConstruct } from "constructs";
import { IPolyconFactory, Polycons } from "polycons";
import stringify from "safe-stable-stringify";
import { PluginManager } from "./plugin-manager";
import { synthesizeTree } from "./tree";
import { Logger } from "../cloud/logger";

const TERRAFORM_STACK_NAME = "root";

/**
 * A Wing application.
 */
export interface IApp extends IConstruct {
  /**
   * Directory where artifacts are synthesized to.
   */
  readonly outdir: string;
  /**
   * Synthesize the app into an artifact.
   */
  synth(): string;
}

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
   * A custom factory to resolve polycons.
   * @default - use the default polycon factory included in the Wing SDK
   */
  readonly customFactory?: IPolyconFactory;

  /**
   * Absolute paths to plugin javascript files.
   * @default - [] no plugins
   */
  readonly plugins?: string[];
}

/**
 * An app that knows how to synthesize constructs into Terraform configuration
 * using cdktf. No polycon factory or Terraform providers are included.
 */
export class CdktfApp extends Construct implements IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;
  /**
   * Path to the Terraform manifest file.
   */
  public readonly terraformManifestPath: string;

  private readonly cdktfApp: cdktf.App;
  private readonly cdktfStack: cdktf.TerraformStack;
  private readonly pluginManager: PluginManager;

  constructor(props: AppProps) {
    const outdir = props.outdir ?? ".";
    const cdktfOutdir = join(outdir, ".tmp.cdktf.out");

    mkdirSync(cdktfOutdir, { recursive: true });

    const cdktfApp = new cdktf.App({ outdir: cdktfOutdir });
    const cdktfStack = new cdktf.TerraformStack(cdktfApp, TERRAFORM_STACK_NAME);

    if (!props.customFactory) {
      throw new Error(
        "A custom factory must be passed to the base CdktfApp class."
      );
    }
    Polycons.register(cdktfStack, props.customFactory);

    super(cdktfStack, "Default");

    this.pluginManager = new PluginManager(props.plugins ?? []);

    this.outdir = outdir;
    this.cdktfApp = cdktfApp;
    this.cdktfStack = cdktfStack;
    this.terraformManifestPath = join(this.outdir, "main.tf.json");

    // register a logger for this app.
    Logger.register(this);
  }

  /**
   * Synthesize the app into Terraform configuration in a `cdktf.out` directory.
   *
   * This method returns a cleaned snapshot of the resulting Terraform manifest
   * for unit testing.
   */
  public synth(): string {
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
    rmSync(this.cdktfApp.outdir, { recursive: true });

    // write `outdir/tree.json`
    synthesizeTree(this, this.outdir);

    // return a cleaned snapshot of the resulting Terraform manifest for unit testing
    const tfConfig = this.cdktfStack.toTerraform();
    const cleaned = cleanTerraformConfig(tfConfig);

    this.pluginManager.postSynth(tfConfig, `${this.outdir}/main.tf.json`);
    this.pluginManager.validate(tfConfig);
    return stringify(cleaned, null, 2) ?? "";
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
          rmdirSync(destination, { recursive: true });
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
