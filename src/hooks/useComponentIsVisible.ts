import { RefObject, useEffect, useMemo, useState } from "react";

export type BufferOptions = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export function useComponentIsVisible(
  targetRef: RefObject<HTMLElement>,
  rootRef: RefObject<HTMLElement>,
  { top = 0, bottom = 0, left = 0, right = 0 }: BufferOptions = {}
) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange: IntersectionObserverCallback = ([entry]) => {
    setIsVisible(entry.isIntersecting);
  };

  const rootMargin = `${top}px ${right}px ${bottom}px ${left}px`;

  const intersectionObserver = useMemo(
    () =>
      new IntersectionObserver(handleVisibilityChange, {
        root: rootRef.current,
        rootMargin
      }),
    [rootRef, rootMargin]
  );

  useEffect(function() {
    if (targetRef.current) {
      intersectionObserver.observe(targetRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  });

  return isVisible;
}
