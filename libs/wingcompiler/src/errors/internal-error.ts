export class InternalError extends Error {
  constructor(public readonly causedBy: Error) {
    super(causedBy.message);
  }
}
