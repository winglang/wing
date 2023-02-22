/**
 * Error thrown by a resource while running inflight code.
 */
export class InflightError {
  constructor(
    /** Error code */
    public readonly code: InflightErrorCode,
    /** Human-readable error message */
    public readonly message: string,
    /** Parent error, if any */
    public readonly cause?: any // Error
  ) {
    // stub API, no implementation here is needed
  }
}

// hack so that `InflightError` extends `Error` even though JSII doesn't allow this
exports.InflightError = (function () {
  return class extends Error {
    constructor(
      public readonly code: InflightErrorCode,
      public readonly message: string,
      public readonly cause?: any
    ) {
      super(message);
    }
  };
})();

/**
 * Error codes for `InflightError`.
 */
export enum InflightErrorCode {
  /** Indicates that a resource was not found. */
  NOT_FOUND = "NOT_FOUND",
}
