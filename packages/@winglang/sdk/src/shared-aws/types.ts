/**
 * AWS IAM Policy Statement.
 */
export interface PolicyStatement {
  /** Actions */
  readonly actions?: string[];
  /** Resources */
  readonly resources?: string[];
  /** Effect ("Allow" or "Deny") */
  readonly effect?: Effect;
}

/**
 * The Effect element of an AWS IAM policy statement
 */
export enum Effect {
  /** Allow */
  ALLOW = "Allow",
  /** Deny */
  DENY = "Deny",
}
