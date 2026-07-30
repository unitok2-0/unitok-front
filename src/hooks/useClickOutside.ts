import { RefObject, useEffect } from "react";

export default function useClickOutside<T extends Element>(
  ref: RefObject<T>,
  callback: () => void
) {
  useEffect(() => {
    if (!callback || !ref) return;

    function clickOutside(event: MouseEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      callback?.();
    }

    window.addEventListener("click", clickOutside);
    return () => window.removeEventListener("click", clickOutside);
  }, [ref, callback]);
}
