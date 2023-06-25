export class PreflightError extends Error {
  constructor(
    public readonly causedBy: Error,
    public readonly artifactPath: string,
    public readonly artifact: string
  ) {
    super(causedBy.message);
  }
}
