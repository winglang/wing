import type { State } from "@wingconsole/server";
import { useLoading } from "@wingconsole/use-loading";
import { useEffect, useContext, useMemo, useCallback } from "react";

import { trpc } from "../../trpc.js";
import { useSelectionContext } from "../selection-context/selection-context.js";
import { TestsContext } from "../tests-pane/tests-context.js";

export interface UseLayoutProps {
  cloudAppState: State;
}

export const useLayout = ({ cloudAppState }: UseLayoutProps) => {
  const { setSelectedItems } = useSelectionContext();

  const { showTests } = useContext(TestsContext);

  const wingfileQuery = trpc["app.wingfile"].useQuery();
  const wingfile = useMemo(() => {
    return wingfileQuery.data;
  }, [wingfileQuery.data]);
  const title = useMemo(() => {
    if (!wingfile) {
      return "Wing Console";
    }
    return `${wingfile} - Wing Console`;
  }, [wingfile]);

  const { loading, setLoading } = useLoading({
    duration: 400,
  });

  useEffect(() => {
    setLoading(
      cloudAppState === "loadingSimulator" || cloudAppState === "compiling",
    ),
      [cloudAppState];
  });

  const onResourceClick = useCallback(
    (path: string) => {
      setSelectedItems([path]);
    },
    [setSelectedItems],
  );

  return {
    loading,
    showTests,
    onResourceClick,
    title,
    wingfile,
  };
};
