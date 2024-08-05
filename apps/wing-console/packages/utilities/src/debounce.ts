/**
 * Debounce a function to be called after `wait` milliseconds has passed since the last call.
 */
export function debounce<T extends (...arguments_: any[]) => void>(
  function_: T,
  wait: number,
): (...arguments_: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;

  return (...arguments_: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      function_(...arguments_);
    }, wait);
  };
}
