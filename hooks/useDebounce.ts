import { useRef, useEffect } from "react";

export function useDebounce<T extends Function>(fn: T, delay = 300): T {
  const debouncedFn = useRef<T>(null);

  useEffect(() => {
    debouncedFn.current = debounce(fn, delay);
  }, [delay, fn]);

  return debouncedFn.current as T;
}

function debounce<T extends Function>(fn: T, delay: number): any {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  } as T;
}
