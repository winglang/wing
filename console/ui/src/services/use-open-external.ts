import { useMemo } from "react";

import { trpc } from "../utils/trpc.js";

export const useOpenExternal = () => {
  const openExternal = trpc["app.openExternal"].useMutation();

  const open = (url: string) => {
    openExternal.mutate({ url });
  };

  const isError = useMemo(() => {
    return openExternal.isError;
  }, [openExternal.isError]);

  const isLoading = useMemo(() => {
    return openExternal.isLoading;
  }, [openExternal.isLoading]);

  return {
    open,
    isLoading,
    isError,
  };
};
