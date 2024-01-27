import { App } from "./app";
import { IPlatform, ParameterRegistrar, PlatformParameter } from "../platform";

/**
 * AWS Terraform Platform
 */
export class Platform implements IPlatform {
  /** Platform model */
  public readonly target = "tf-aws";

  public newApp?(appProps: any): any {
    return new App(appProps);
  }

  public registerParameters?(inputRegistrar: ParameterRegistrar) {
    const vpcInput = new PlatformParameter(inputRegistrar, "VPC", {
      path: `${this.target}/vpc`,
      description: "Determine whether to create a VPC or use an existing one (if needed)",
      choices: ["new", "existing"],
    });

    const existingVPCIdInput = new PlatformParameter(inputRegistrar, "ExistingVPCID", {
      path: `${this.target}/vpc_id`,
      description: "The ID of the existing VPC to use",
    });

    const existingPrivateSubnetIdsInput = new PlatformParameter(inputRegistrar, "ExistingPrivateSubnetIDs", {
      path: `${this.target}/private_subnet_id`,
      description: "The IDs of the existing private subnets to use",
    });

    const existingPublicSubnetIdsInput = new PlatformParameter(inputRegistrar, "ExistingPublicSubnetIDs", {
      path: `${this.target}/public_subnet_id`,
      description: "The IDs of the existing public subnets to use",
    });

    vpcInput.addDependentInput(existingVPCIdInput, "existing");
    vpcInput.addDependentInput(existingPrivateSubnetIdsInput, "existing");
    vpcInput.addDependentInput(existingPublicSubnetIdsInput, "existing");
  }
}
