export function throttle<T extends (...arguments_: any[]) => void>(
  function_: T,
  timeFrame: number,
): (...arguments_: Parameters<T>) => void {
  let lastTime = 0;
  return (...arguments_) => {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      function_(...arguments_);
      lastTime = now;
    }
  };
}
