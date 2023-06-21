import { useTests } from "../services/use-tests.js";
import { TestTree } from "../ui/test-tree.js";
export const TestsTreeView = () => {
  const { testList, runAllTests, runTest } = useTests();

  return (
    <TestTree
      testList={testList}
      handleRunAllTests={runAllTests}
      handleRunTest={runTest}
    />
  );
};
