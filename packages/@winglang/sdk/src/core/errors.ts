interface NotImplementedErrorOptions {
  issue?: string;
  resource?: string;
  operation?: string;
}

export class NotImplementedError extends Error {
  public name: string = "NotImplementedError";
  public resource?: string;
  public operation?: string;
  constructor(message: string, options?: NotImplementedErrorOptions) {
    super(
      `${message}${
        options?.issue
          ? `\nFor more information see: ${options.issue}.\nContributions welcome ❤️`
          : ""
      }`,
    );
    this.resource = options?.resource;
    this.operation = options?.operation;
  }
}

export class AbstractMemberError extends Error {
  constructor() {
    super("This member is abstract and must be implemented in a subclass.");
  }
}
