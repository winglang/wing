import { App } from "./app";
import { IPlatform } from "../platform";

/**
 * AWS Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-aws";

  public readonly parameters = {
    $id: "tf-aws-parameters",
    type: "object",
    properties: {
      "tf-aws": {
        type: "object",
        properties: {
          vpc: {
            type: "string",
            enum: ["new", "existing"],
          },
          vpc_id: {
            type: "string",
          },
          private_subnet_id: {
            type: "string",
          },
          public_subnet_id: {
            type: "string",
          },
        },
        allOf: [
          {
            $comment:
              "if vpc is existing, then we need to require the vpc_id, private_subnet_id, and public_subnet_id",
            if: { properties: { vpc: { const: "existing" } } },
            then: {
              required: ["vpc_id", "private_subnet_id", "public_subnet_id"],
            },
          },
        ],
      },
    },
  };

  public newApp?(appProps: any): any {
    return new App(appProps);
  }
}
