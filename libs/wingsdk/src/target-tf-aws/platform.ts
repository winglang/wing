import { App } from "./app";
import { IPlatform } from "../platform";
import { SecretsManagerClient, GetSecretValueCommand, CreateSecretCommand, UpdateSecretCommand } from "@aws-sdk/client-secrets-manager";

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
          private_subnet_ids: {
            description:
              "If using an existing VPC, provide the private subnet ID",
            type: "array",
            items: {
              type: "string",
            },
          },
          public_subnet_ids: {
            description:
              "If using an existing VPC, provide the public subnet ID",
            type: "array",
            items: {
              type: "string",
            },
          },
          vpc_api_gateway: {
            description: "Whether Api gateways should be deployed in a VPC",
            type: "boolean",
          },
          vpc_lambda: {
            description: "Whether Lambda functions should be deployed in a VPC",
            type: "boolean",
          },
        },
        allOf: [
          {
            $comment:
              "if vpc is existing, then we need to require the vpc_id, private_subnet_ids",
            if: { properties: { vpc: { const: "existing" } } },
            then: {
              required: ["vpc_id", "private_subnet_ids"],
            },
          },
        ],
      },
    },
  };

  public newApp?(appProps: any): any {
    return new App(appProps);
  }

  public async storeSecrets(secrets: { [name: string]: string; }): Promise<void> {
    console.log("Storing secrets in AWS Secrets Manager");
    const client = new SecretsManagerClient({});

    for (const [name, value] of Object.entries(secrets)) {
      try {
        // Attempt to retrieve the secret to check if it exists
        await client.send(new GetSecretValueCommand({ SecretId: name }));
        console.log(`Secret ${name} exists, updating it.`);
        // Update the secret if it exists
        await client.send(new UpdateSecretCommand({
          SecretId: name,
          SecretString: JSON.stringify({ [name]: value }),
        }));
      } catch (error: any) {
        if (error.name === 'ResourceNotFoundException') {
          // If the secret does not exist, create it
          console.log(`Secret ${name} does not exist, creating it.`);
          await client.send(new CreateSecretCommand({
            Name: name,
            SecretString: JSON.stringify({ [name]: value }),
          }));
        } else {
          // Log other errors
          console.error(`Failed to store secret ${name}:`, error);
          throw error; // Re-throw the error if it is not related to the secret not existing
        }
      }
    }

    console.log(`${Object.keys(secrets).length} secret(s) stored AWS Secrets Manager`);
  }
}
