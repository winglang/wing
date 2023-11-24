export const throttle = <T, A extends any[]>(
  function_: (...arguments_: A) => T,
  delay: number,
): ((...arguments_: A) => T | undefined) => {
  let lastTime = 0;
  let lastCall: T | undefined;

  return (...arguments_: A) => {
    const now = Date.now();
    if (now - lastTime < delay) {
      return lastCall;
    }
    lastTime = now;
    lastCall = function_(...arguments_);
    return lastCall;
  };
};
