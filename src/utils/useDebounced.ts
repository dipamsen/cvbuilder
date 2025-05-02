import { useEffect } from "react";

export default function useDebounced(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function,
  delay: number,
  deps: React.DependencyList
) {
  useEffect(() => {
    const id = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, delay, ...deps]);
}
