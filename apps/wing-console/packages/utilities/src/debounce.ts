export function debounce<T extends (...arguments_: any[]) => void>(
  function_: T,
  wait: number,
  immediate: boolean = false,
): (...arguments_: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;

  return (...arguments_: Parameters<T>): void => {
    const later = () => {
      timeout = undefined;
      if (!immediate) {
        function_(...arguments_);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      function_(...arguments_);
    }
  };
}
