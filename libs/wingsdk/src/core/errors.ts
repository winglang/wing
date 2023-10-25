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
