import type { TestItem } from "@wingconsole/server";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { trpc } from "../../trpc.js";

import { TestsContext } from "./tests-context.js";

export const useTests = () => {
  const [testList, setTestList] = useState<TestItem[]>([]);
  const { setTestsExists } = useContext(TestsContext);

  const testListQuery = trpc["test.list"].useQuery();

  const { mutate: runAllTestsMutation } = trpc["test.runAll"].useMutation();

  const { mutate: runTestMutation } = trpc["test.run"].useMutation();

  useEffect(() => {
    setTestList(testListQuery.data || []);
    setTestsExists(!!testListQuery.data && testListQuery.data.length > 0);
  }, [setTestsExists, testListQuery.data]);

  const runAllTests = useCallback(() => {
    runAllTestsMutation();
  }, [runAllTestsMutation]);

  const runTest = useCallback(
    (resourcePath: string) => {
      runTestMutation({ resourcePath });
    },
    [runTestMutation],
  );

  return {
    testList,
    runAllTests,
    runTest,
  };
};
