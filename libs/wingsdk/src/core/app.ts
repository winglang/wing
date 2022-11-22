import { join } from "path";
import { IPolyconFactory } from "@winglang/polycons";
import * as cdktf from "cdktf";
import { Construct, IConstruct } from "constructs";
import stringify from "safe-stable-stringify";
import { Files } from "./files";

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
  constructor(props: AppProps = {}) {
    super(null as any, "");

    // this value gets thrown away since we are returning a different object
    this.outdir = "";

    class InnerApp extends cdktf.TerraformStack {
      public readonly outdir: string;
      private readonly cdktfApp: cdktf.App;
      private readonly files: Files;

      constructor() {
        const outdir = props.outdir ?? ".";
        const root = new cdktf.App({ outdir: join(outdir, "cdktf.out") });

        // TODO: use app name as the tree root name
        super(root, "root");

        this.outdir = outdir;
        this.cdktfApp = root;
        this.files = new Files({
          app: this,
          stateFile: props.stateFile,
        });
      }

      public synth(): string {
        this.cdktfApp.synth();
        this.files.synth();

        const tfConfig = this.toTerraform();
        const cleaned = cleanTerraformConfig(tfConfig);

        return stringify(cleaned, null, 2);
      }
    }

    return new InnerApp();
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
