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
            description:
              "Determine whether to create a new VPC or use an existing one",
            enum: ["new", "existing"],
          },
          vpc_id: {
            description: "If using an existing VPC, provide the VPC ID",
            type: "string",
          },
          private_subnet_id: {
            descriotion:
              "If using an existing VPC, provide the private subnet ID",
            type: "string",
          },
          public_subnet_id: {
            description:
              "If using an existing VPC, provide the public subnet ID",
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
