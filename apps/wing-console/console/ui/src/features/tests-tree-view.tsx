import { useTests } from "../services/use-tests.js";
import { TestTree } from "../ui/test-tree.js";

export interface TestsTreeViewProps {
  onSelectedItemsChange?: (items: string[]) => void;
  selectedItems?: string[];
}

export const TestsTreeView = ({
  onSelectedItemsChange,
  selectedItems,
}: TestsTreeViewProps) => {
  const { testList, runAllTests, runTest } = useTests();

  return (
    <TestTree
      testList={testList}
      handleRunAllTests={runAllTests}
      handleRunTest={runTest}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
    />
  );
};
