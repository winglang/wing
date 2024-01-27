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
    const vpcParameter = new PlatformParameter(inputRegistrar, "VPC", {
      path: `${this.target}/vpc`,
      description: "Determine whether to create a VPC or use an existing one (if needed)",
      choices: ["new", "existing"],
    });

    const existingVPCIdParameter = new PlatformParameter(inputRegistrar, "ExistingVPCID", {
      path: `${this.target}/vpc_id`,
      description: "The ID of the existing VPC to use",
    });

    const existingPrivateSubnetIdsParameter = new PlatformParameter(inputRegistrar, "ExistingPrivateSubnetIDs", {
      path: `${this.target}/private_subnet_id`,
      description: "The IDs of the existing private subnets to use",
    });

    const existingPublicSubnetIdsParameter = new PlatformParameter(inputRegistrar, "ExistingPublicSubnetIDs", {
      path: `${this.target}/public_subnet_id`,
      description: "The IDs of the existing public subnets to use",
    });

    vpcParameter.addDependentParameter(existingVPCIdParameter, "existing");
    vpcParameter.addDependentParameter(existingPrivateSubnetIdsParameter, "existing");
    vpcParameter.addDependentParameter(existingPublicSubnetIdsParameter, "existing");
  }
}
