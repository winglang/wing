var iam_role = require("@cdktf/provider-aws/lib/iam-role");
var cdktf = require("cdktf");

/**
 * Plugin: permission-boundary
 * 
 * Description: 
 * Ensure that all IAM roles have a specified permission boundary assigned.
 * 
 * Required Env Variables:
 * PERMISSION_BOUNDARY_ARN - ARN of desired permission boundary
 */

class PermissionBoundaryAspect {
  constructor(permissionBoundaryArn) {
    this.permissionBoundaryArn = permissionBoundaryArn;
  }

  visit(node) {
    if (node.terraformResourceType === "aws_iam_role") {
      node.permissionsBoundary = this.permissionBoundaryArn;
    }
  }
}

exports.Platform = class PermissionBoundary {
  model = "tf-aws";
  preSynth(app) {
    if (!process.env.PERMISSION_BOUNDARY_ARN) {throw new Error("env var PERMISSION_BOUNDARY_ARN not set")}
    cdktf.Aspects.of(app).add(new PermissionBoundaryAspect(process.env.PERMISSION_BOUNDARY_ARN))
  }
}

