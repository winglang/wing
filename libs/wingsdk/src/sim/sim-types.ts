export interface SimulatorRequest {
  readonly id: string;
  readonly operation: string;
  readonly message: string;
  readonly timestamp: number;
}

export interface SimulatorResponse {
  readonly id: string;
  readonly error?: string;
  readonly result?: string;
  readonly timestamp: number;
}
