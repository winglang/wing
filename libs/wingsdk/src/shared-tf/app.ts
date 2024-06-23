import { mkdirSync, readdirSync, renameSync, rmSync, existsSync } from "fs";
import { join } from "path";
import * as cdktf from "cdktf";
import { CdkTfTokens } from "./tokens";
import { App, AppProps } from "../core";
import { registerTokenResolver } from "../core/tokens";
import { DEFAULT_ROOT_ID } from "../platform/platform-manager";

const TERRAFORM_STACK_NAME = "root";

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

  private readonly cdktfApp: cdktf.App;

  constructor(props: AppProps) {
    const outdir = props.outdir ?? ".";
    const cdktfOutdir = join(outdir, ".tmp.cdktf.out");

    mkdirSync(cdktfOutdir, { recursive: true });

    const cdktfApp = new cdktf.App({ outdir: cdktfOutdir });
    const cdktfStack = new cdktf.TerraformStack(cdktfApp, TERRAFORM_STACK_NAME);

    super(cdktfStack, props.rootId ?? DEFAULT_ROOT_ID, props);

    // TODO: allow the user to specify custom backends
    // https://github.com/winglang/wing/issues/2003
    new cdktf.LocalBackend(cdktfStack, {
      path: "./terraform.tfstate",
    });

    this.outdir = outdir;
    registerTokenResolver(new CdkTfTokens());

    this.outdir = outdir;
    this.cdktfApp = cdktfApp;
    this.terraformManifestPath = join(this.outdir, "main.tf.json");
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

    // move Terraform files from `outdir/.tmp.cdktf.out/stacks/root` to `outdir`
    this.moveCdktfArtifactsToOutdir();

    const outfile = join(this.outdir, `main.tf.json`);

    // rename `outdir/cdk.tf.json` to `outdir/main.tf.json`
    renameSync(join(this.outdir, "cdk.tf.json"), outfile);

    // delete `outdir/.tmp.cdktf.out`
    rmSync(this.cdktfApp.outdir, { recursive: true, force: true });

    return outfile;
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

// /**
//  * Return a cleaned Terraform template for unit testing
//  * https://github.com/hashicorp/terraform-cdk/blob/55009f99f7503e5de2bacb1766ab51547821e6be/packages/cdktf/lib/testing/index.ts#L109
//  */
// function cleanTerraformConfig(template: any): any {
//   function removeMetadata(item: any): any {
//     if (item !== null && typeof item === "object") {
//       if (Array.isArray(item)) {
//         return item.map(removeMetadata);
//       }

//       const cleanedItem = Object.entries(item)
//         // order alphabetically
//         .sort(([a], [b]) => a.localeCompare(b))
//         .reduce(
//           (acc, [key, value]) => ({
//             ...acc,
//             [key]: removeMetadata(value),
//           }),
//           {}
//         );

//       // Remove metadata
//       delete (cleanedItem as any)["//"];
//       return cleanedItem;
//     }

//     return item;
//   }
//   const cleaned = removeMetadata(template);
//   cleaned.terraform = undefined;
//   cleaned.provider = undefined;
//   return cleaned;
// }
