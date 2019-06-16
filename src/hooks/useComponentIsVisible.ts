import { RefObject, useEffect, useMemo, useState } from "react";

function useComponentIsVisible(
  targetRef: RefObject<HTMLElement>,
  rootRef: RefObject<HTMLElement>
) {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange: IntersectionObserverCallback = ([entry]) => {
    setIsVisible(entry.isIntersecting);
  };

  const intersectionObserver = useMemo(
    () =>
      new IntersectionObserver(handleVisibilityChange, {
        root: rootRef.current
      }),
    [rootRef]
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

export { useComponentIsVisible };
