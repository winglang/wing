import * as aws from "@cdktf/provider-aws";
import { IPolyconFactory, Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import { Construct } from "constructs";
import { stringify } from "safe-stable-stringify";
import { PolyconFactory } from "./factory";

export interface AppProps {
  readonly outdir?: string;
  readonly customFactory?: IPolyconFactory;
}

export class App extends Construct {
  constructor(props: AppProps = {}) {
    super(null as any, "");

    class TfApp extends cdktf.TerraformStack {
      private readonly cdktfApp: cdktf.App;

      constructor() {
        const outdir = props.outdir ?? ".";
        const root = new cdktf.App({ outdir });

        super(root, "root");
        this.cdktfApp = root;

        new aws.AwsProvider(this, "AwsProvider", {});
        Polycons.register(this, props.customFactory ?? new PolyconFactory());
      }

      public synth(): string {
        this.cdktfApp.synth();

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

  public synth(): string {
    throw new Error("Unimplemented");
  }
}

// export class App extends cdktf.TerraformStack {
//   private readonly app: cdktf.App;
//   constructor(props: AppProps) {
//     const outdir = props.outdir ?? ".";
//     const app = new cdktf.App({ outdir: join(outdir, "cdktf.out") });
//     super(app, "root");
//     this.app = app;
//     new aws.AwsProvider(this, "AwsProvider", {});
//     Polycons.register(this, props.customFactory ?? new PolyconFactory());
//   }

//   public synth(): string {
//     this.app.synth();

//     // return a cleaned Terraform template for unit testing
//     // https://github.com/hashicorp/terraform-cdk/blob/55009f99f7503e5de2bacb1766ab51547821e6be/packages/cdktf/lib/testing/index.ts#L109
//     const tfConfig = this.toTerraform();
//     function removeMetadata(item: any): any {
//       if (item !== null && typeof item === "object") {
//         if (Array.isArray(item)) {
//           return item.map(removeMetadata);
//         }

//         const cleanedItem = Object.entries(item)
//           // order alphabetically
//           .sort(([a], [b]) => a.localeCompare(b))
//           .reduce(
//             (acc, [key, value]) => ({ ...acc, [key]: removeMetadata(value) }),
//             {}
//           );

//         // Remove metadata
//         delete (cleanedItem as any)["//"];
//         return cleanedItem;
//       }

//       return item;
//     }
//     const cleaned = removeMetadata(tfConfig);
//     cleaned.terraform = undefined;
//     cleaned.provider = undefined;

//     return stringify(cleaned, null, 2);
//   }
// }
