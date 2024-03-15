import {
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  existsSync,
  writeFileSync,
  readFileSync,
} from "fs";
import { join, resolve } from "path";
import { format } from "@cdktf/hcl-tools";
import * as cdktf from "cdktf";
import { Construct } from "constructs";
import stringify from "safe-stable-stringify";
import { CdkTfTokens } from "./tokens";
import {
  App,
  AppProps,
  Connections,
  preSynthesizeAllConstructs,
} from "../core";
import { registerTokenResolver } from "../core/tokens";
import { synthesizeTree } from "../core/tree";

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
  private readonly cdktfStack: cdktf.TerraformStack;

  private synthed: boolean;
  private synthedOutput: string | undefined;

  constructor(props: AppProps) {
    const outdir = props.outdir ?? ".";
    const cdktfOutdir = join(outdir, ".tmp.cdktf.out");

    mkdirSync(cdktfOutdir, { recursive: true });

    const cdktfApp = new cdktf.App({ outdir: cdktfOutdir, hclOutput: true });
    const cdktfStack = new cdktf.TerraformStack(cdktfApp, TERRAFORM_STACK_NAME);

    super(cdktfStack, props.rootId ?? "Default", props);

    // TODO: allow the user to specify custom backends
    // https://github.com/winglang/wing/issues/2003
    new cdktf.LocalBackend(cdktfStack, {
      path: "./terraform.tfstate",
    });

    this.outdir = outdir;
    registerTokenResolver(new CdkTfTokens());
    this._synthHooks = props.synthHooks;

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

    (cdktfApp as any).typeForFqn = (fqn: string) => this.typeForFqn(fqn);

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

    if (this._synthHooks?.preSynthesize) {
      this._synthHooks.preSynthesize.forEach((hook) => hook(this));
    }

    // synthesize Terraform files in `outdir/.tmp.cdktf.out/stacks/root`
    this.cdktfApp.synth();

    // move Terraform files from `outdir/.tmp.cdktf.out/stacks/root` to `outdir`
    this.moveCdktfArtifactsToOutdir();

    // rename `outdir/cdk.tf` to `outdir/main.tf`
    renameSync(join(this.outdir, "cdk.tf"), join(this.outdir, `main.tf`));

    // TODO: this should be awaited or somehow made synchronous
    const tfContents = readFileSync(join(this.outdir, "main.tf"), "utf-8");
    void format(tfContents).then((formatted) => {
      writeFileSync(join(this.outdir, "main.tf"), formatted);
    });

    // delete `outdir/.tmp.cdktf.out`
    rmSync(this.cdktfApp.outdir, { recursive: true, force: true });

    // write `outdir/tree.json`
    synthesizeTree(this, this.outdir);

    // write `outdir/connections.json`
    Connections.of(this).synth(this.outdir);

    // return a cleaned snapshot of the resulting Terraform manifest for unit testing
    const tfConfig = this.cdktfStack.toTerraform();
    const cleaned = cleanTerraformConfig(tfConfig);

    if (this._synthHooks?.postSynthesize) {
      this._synthHooks.postSynthesize.forEach((hook) => {
        writeFileSync(
          resolve(`${this.outdir}/main.tf.json`),
          JSON.stringify(hook(tfConfig), null, 2)
        );
      });
    }

    if (this._synthHooks?.validate) {
      this._synthHooks.validate.forEach((hook) => hook(tfConfig));
    }

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
