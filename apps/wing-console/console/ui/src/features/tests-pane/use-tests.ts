import type { TestItem } from "@wingconsole/server";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { trpc } from "../../trpc.js";

import { TestsContext } from "./tests-context.js";

export const useTests = () => {
  const [testList, setTestList] = useState<TestItem[]>([]);
  const { setTestsExists } = useContext(TestsContext);

  const testStatusQuery = trpc["test.status"].useQuery();
  const status = useMemo(
    () => testStatusQuery.data || "uninitialized",
    [testStatusQuery.data],
  );

  const testListQuery = trpc["test.list"].useQuery();

  const runAllTestsMutation = trpc["test.runAll"].useMutation();

  const runTestMutation = trpc["test.run"].useMutation();

  useEffect(() => {
    setTestList(testListQuery.data || []);
    setTestsExists(!!testListQuery.data && testListQuery.data.length > 0);
  }, [setTestsExists, testListQuery.data]);

  const runAllTests = useCallback(() => {
    runAllTestsMutation.mutate();
  }, [runAllTestsMutation]);

  const runTest = useCallback(
    (resourcePath: string) => {
      runTestMutation.mutate({ resourcePath });
    },
    [runTestMutation.mutate],
  );

  return {
    status,
    testList,
    runAllTests,
    runTest,
  };
};
