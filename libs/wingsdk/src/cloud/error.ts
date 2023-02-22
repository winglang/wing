/**
 * Error thrown by a resource while running inflight code.
 */
export class InflightError extends Error {
  constructor(
    /** Error code */
    public readonly code: InflightErrorCode,
    /** Human-readable error message */
    public readonly message: string,
    /** Parent error, if any */
    public readonly cause?: any // Error
  ) {
    super(message);
  }
}

/**
 * Error codes for `InflightError`.
 */
export enum InflightErrorCode {
  /** Indicates that a resource was not found. */
  NOT_FOUND = "NOT_FOUND",
}
