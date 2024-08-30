/**
 * Throttle a function to be called at most once every `wait` milliseconds.
 *
 * Includes a leading and a trailing call.
 */
export function throttle<T extends (...arguments_: any[]) => void>(
  function_: T,
  wait: number,
): (...arguments_: Parameters<T>) => void {
  let lastTime: number | undefined;
  let timeout: NodeJS.Timeout | undefined;
  return (...arguments_) => {
    const now = Date.now();
    if (lastTime === undefined || now - lastTime >= wait) {
      function_(...arguments_);
      lastTime = now;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = undefined;
        function_(...arguments_);
      }, wait);
    }
  };
}
