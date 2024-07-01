/**
 * Returns the error message, even if the error is not an instance of Error.
 */
export const errorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return `Unknown error: ${error}`;
  }
};
