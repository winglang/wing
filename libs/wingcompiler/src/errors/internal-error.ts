export class InternalError extends Error {
  constructor(public readonly causedBy: Error) {
    console.log("InternalError", causedBy);
    super(causedBy.message);
  }
}
