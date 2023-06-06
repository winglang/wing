import { inferRouterOutputs } from "@trpc/server";
import { Router } from "@wingconsole/server";
import { useEffect, useState } from "react";

import { TestItem, TestStatus } from "../shared/test-item.js";

import { trpc } from "./trpc.js";

type RouterOutput = inferRouterOutputs<Router>;

const getTestName = (testPath: string) => {
  const test = testPath.split("/").pop() ?? testPath;
  return test.replace(/test:/g, "");
};

export const useTests = () => {
  const [testList, setTestList] = useState<TestItem[]>([]);
  const testListQuery = trpc["test.list"].useQuery();
  const runAllTestsMutation = trpc["test.runAll"].useMutation({
    onMutate: () => {
      setAllTestStatus("running");
    },
    onSuccess: (data) => {
      onRunTestsSuccess(data);
    },
  });

  const runTestMutation = trpc["test.run"].useMutation({
    onMutate: (data) => {
      setTestStatus(data.resourcePath, "running");
    },
    onSuccess: (data) => {
      onRunTestsSuccess([data]);
    },
  });

  useEffect(() => {
    if (!testListQuery.data) {
      return;
    }
    setTestList(
      testListQuery.data.map((resourcePath) => {
        return {
          id: resourcePath,
          label: getTestName(resourcePath),
          status: "pending",
        };
      }),
    );
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

  const onRunTestsSuccess = (runOutput: RouterOutput["test.run"][]) => {
    for (const output of runOutput) {
      setTestStatus(
        output.path,
        output.error ? "error" : "success",
        output.time,
      );
    }
  };

  return {
    testList,
    runAllTests,
    runTest,
  };
};
