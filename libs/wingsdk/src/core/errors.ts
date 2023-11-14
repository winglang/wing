export class NotImplementedError extends Error {
  constructor(message: string, issue?: string) {
    super(
      `${message}${
        issue
          ? `\nFor more information see: ${issue}.\nContributions welcome ❤️`
          : ""
      }`
    );
  }
}

export class AbstractMemberError extends Error {
  constructor() {
    super("This member is abstract and must be implemented in a subclass.");
  }
}
