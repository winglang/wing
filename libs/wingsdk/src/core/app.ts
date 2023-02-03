import { mkdirSync, readdirSync, renameSync, rmSync } from "fs";
import { join } from "path";
import * as cdktf from "cdktf";
import { Construct, IConstruct } from "constructs";
import { IPolyconFactory, Polycons } from "polycons";
import stringify from "safe-stable-stringify";
// import { Files } from "./files";
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

  private readonly cdktfApp: cdktf.App;
  private readonly cdktfStack: cdktf.TerraformStack;
  // private readonly files: Files;

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

    this.outdir = outdir;
    this.cdktfApp = cdktfApp;
    this.cdktfStack = cdktfStack;

    // this.files = new Files({
    //   app: this,
    //   stateFile: props.stateFile,
    // });

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
    this.cdktfApp.synth();

    // // clean up `main.tf.json` and `assets` from `outdir` if they exist from a previous run
    // rmSync(join(this.outdir, "main.tf.json"));
    // rmSync(join(this.outdir, "assets"), { recursive: true });

    // move Terraform files from `outdir/.tmp.cdktf.out/stacks/root` to `outdir`
    this.moveCdktfArtifactsToOutdir();

    // rename `outdir/cdk.tf.json` to `outdir/main.tf.json`
    renameSync(
      join(this.outdir, "cdk.tf.json"),
      join(this.outdir, `main.tf.json`)
    );

    // remove `outdir/.tmp.cdktf.out`
    rmSync(this.cdktfApp.outdir, { recursive: true });

    // // synthesize any other files?
    // this.files.synth();

    // write outdir/tree.json
    synthesizeTree(this);

    // return a cleaned snapshot of the resulting Terraform manifest for unit testing
    const tfConfig = this.cdktfStack.toTerraform();
    const cleaned = cleanTerraformConfig(tfConfig);

    return stringify(cleaned, null, 2) ?? "";
  }

  /**
   * Move files from `outdir/cdktf.out/stacks/root` to `outdir`.
   */
  private moveCdktfArtifactsToOutdir(): void {
    const cdktfOutdir = this.cdktfApp.outdir;
    const cdktfStackDir = join(cdktfOutdir, "stacks", TERRAFORM_STACK_NAME);

    const files = readdirSync(cdktfStackDir, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const source = join(cdktfStackDir, file.name);
        const destination = join(this.outdir, file.name);
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
