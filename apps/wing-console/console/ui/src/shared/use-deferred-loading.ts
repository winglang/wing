import { useEffect, useState } from "react";

export const useDeferredLoading = (loading: boolean, time: number = 500) => {
  const [deferredLoading, setDeferredLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>();

  useEffect(() => {
    if (!loading) {
      clearTimeout(loadingTimeout!);
      setDeferredLoading(false);
      return;
    }
    if (loadingTimeout) {
      return;
    }
    setLoadingTimeout(
      setTimeout(() => {
        setDeferredLoading(loading);
      }, time),
    );

    return () => {
      clearTimeout(loadingTimeout!);
    };
  }, [loading, loadingTimeout, time]);

  return {
    deferredLoading,
  };
};
