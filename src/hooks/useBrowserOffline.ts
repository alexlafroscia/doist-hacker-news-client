import { useCallback, useEffect, useState } from "react";

export function useBrowserOffline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const handler = useCallback(() => setIsOnline(navigator.onLine), [
    setIsOnline
  ]);

  useEffect(function() {
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);

    return () => {
      window.removeEventListener("online", handler);
      window.removeEventListener("offline", handler);
    };
  });

  return !isOnline;
}
