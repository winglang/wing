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

// compatibleTargets not currently used see: https://github.com/winglang/wing/issues/1474
exports.compatibleTargets = ["tf-aws"]

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

exports.preSynth = function(app) {
  if (!process.env.PERMISSION_BOUNDARY_ARN) {throw new Error("env var PERMISSION_BOUNDARY_ARN not set")}

  cdktf.Aspects.of(app).add(new PermissionBoundaryAspect(process.env.PERMISSION_BOUNDARY_ARN))
}
