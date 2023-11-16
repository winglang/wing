/**
 * Sanitize the text of a code bundle to remove path references that are system-specific.
 */
export function sanitizeCode(code: string): string {
  function removeAbsolutePaths(text: string) {
    const regex = /".+\/libs\/awscdk\/(.+)"/g;

    // replace first group with static text
    return text.replace(regex, '"[REDACTED]/awscdk/$1"');
  }

  return removeAbsolutePaths(code);
}