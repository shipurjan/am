import { DependencyList, useEffect } from "react";

export const useTimeout = (
  callback: () => void,
  deps?: DependencyList,
  delay_ms: number = 1,
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay_ms);
    return () => clearTimeout(timer);
  }, deps);
};
