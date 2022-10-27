import { join } from "path";
import * as aws from "@cdktf/provider-aws";
import { IPolyconFactory, Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import { Construct } from "constructs";
import { stringify } from "safe-stable-stringify";
import { Files, IApp } from "../core";
import { PolyconFactory } from "./factory";

/**
 * Props for `App`.
 */
export interface AppProps {
  /**
   * Directory where artifacts are synthesized to.
   * @default - current working directory
   */
  readonly outdir?: string;

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
 * An app that knows how to synthesize constructs into a Terraform configuration
 * for AWS resources.
 */
export class App extends Construct implements IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;
  constructor(props: AppProps = {}) {
    super(null as any, "");

    // this value doesn't matter since we are returning a different object
    this.outdir = "";

    class TfApp extends cdktf.TerraformStack {
      public readonly outdir: string;
      private readonly cdktfApp: cdktf.App;
      private readonly files: Files;

      constructor() {
        const outdir = props.outdir ?? ".";
        const root = new cdktf.App({ outdir: join(outdir, "cdktf.out") });

        super(root, "root");

        this.outdir = outdir;
        this.cdktfApp = root;
        this.files = new Files({
          app: this,
          stateFile: props.stateFile,
        });

        new aws.AwsProvider(this, "AwsProvider", {});
        Polycons.register(this, props.customFactory ?? new PolyconFactory());
      }

      public synth(): string {
        this.cdktfApp.synth();
        this.files.synth();

        // return a cleaned Terraform template for unit testing
        // https://github.com/hashicorp/terraform-cdk/blob/55009f99f7503e5de2bacb1766ab51547821e6be/packages/cdktf/lib/testing/index.ts#L109
        const tfConfig = this.toTerraform();
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
        const cleaned = removeMetadata(tfConfig);
        cleaned.terraform = undefined;
        cleaned.provider = undefined;

        return stringify(cleaned, null, 2);
      }
    }

    return new TfApp();
  }

  /**
   * Synthesize the app into Terraform configuration in a `cdktf.out` directory.
   *
   * This method eturn a cleaned snapshot of the resulting Terraform manifest
   * for unit testing.
   */
  public synth(): string {
    throw new Error("Unimplemented");
  }
}
