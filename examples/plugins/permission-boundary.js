var iam_role = require("@cdktf/provider-aws/lib/iam-role");
var cdktf = require("cdktf");

class PermissionBoundaryAspect {
  constructor(permissionBoundaryArn) {
    this.permissionBoundaryArn = permissionBoundaryArn;
  }

  visit(node) {
    if (node instanceof iam_role.IamRole) {
      node.permissionsBoundary = this.permissionBoundaryArn;
    }
  }
}

exports.preSynth = function(app) {
  if (!process.env.PERMISSION_BOUNDARY_ARN) {throw new Error("env var PERMISSION_BOUNDARY_ARN not set")}

  cdktf.Aspects.of(app).add(new PermissionBoundaryAspect(process.env.PERMISSION_BOUNDARY_ARN))
}
