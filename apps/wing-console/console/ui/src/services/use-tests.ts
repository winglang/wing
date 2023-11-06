import { inferRouterOutputs } from "@trpc/server";
import { Router } from "@wingconsole/server";
import { useContext, useEffect, useState } from "react";

import { TestItem, TestStatus } from "../shared/test-item.js";
import { TestsContext } from "../tests-context.js";

import { trpc } from "./trpc.js";

type RouterOutput = inferRouterOutputs<Router>;

export const useTests = () => {
  const [testList, setTestList] = useState<TestItem[]>([]);
  const { setTestsExists } = useContext(TestsContext);

  const testListQuery = trpc["test.list"].useQuery();

  const runAllTestsMutation = trpc["test.runAll"].useMutation({
    onMutate: () => {
      setAllTestStatus("running");
    },
  });

  const runTestMutation = trpc["test.run"].useMutation({
    onMutate: (data) => {
      setTestStatus(data.resourcePath, "running");
    },
  });

  useEffect(() => {
    setTestList(testListQuery.data || []);
    setTestsExists(!!testListQuery.data && testListQuery.data.length > 0);
  }, [testListQuery.data]);

  const runAllTests = () => {
    runAllTestsMutation.mutate();
  };

  const runTest = (resourcePath: string) => {
    runTestMutation.mutate({ resourcePath });
  };

  const setTestStatus = (
    resourcePath: string,
    status: TestStatus,
    time?: number,
  ) => {
    setTestList((testList) => {
      return testList.map((testItem) => {
        if (testItem.id === resourcePath) {
          return {
            ...testItem,
            status,
            time: time || testItem.time,
          };
        }
        return testItem;
      });
    });
  };

  const setAllTestStatus = (status: TestStatus, time?: number) => {
    setTestList((testList) => {
      return testList.map((testItem) => {
        return {
          ...testItem,
          status,
          time: time || testItem.time,
        };
      });
    });
  };

  return {
    testList,
    runAllTests,
    runTest,
  };
};
