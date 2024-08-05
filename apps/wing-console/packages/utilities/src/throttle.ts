export function throttle<T extends (...arguments_: any[]) => void>(
  function_: T,
  timeFrame: number,
): (...arguments_: Parameters<T>) => void {
  let lastTime: number | undefined;
  return (...arguments_) => {
    const now = Date.now();
    if (lastTime === undefined || now - lastTime >= timeFrame) {
      function_(...arguments_);
      lastTime = now;
    }
  };
}
