/**
 * Interface of a request sent by an inflight client to a resource server.
 */
export interface SimulatorRequest {
  /**
   * A idempotency token that uniquely identifies the request.
   */
  readonly id: string;

  /**
   * The operation to perform.
   */
  readonly operation: string;

  /**
   * Any arguments to the operation.
   */
  readonly message: string;

  /**
   * The time the request was sent, in milliseconds since the epoch.
   */
  readonly timestamp: number;
}

/**
 * Interface of a response sent by a resource server to an inflight client.
 */
export interface SimulatorResponse {
  /**
   * A idempotency token that uniquely identifies the request.
   */
  readonly id: string;

  /**
   * An error message if the request failed.
   */
  readonly error?: string;

  /**
   * The response message if the request succeeded.
   */
  readonly result?: string;

  /**
   * The time the response was sent, in milliseconds since the epoch.
   */
  readonly timestamp: number;
}
