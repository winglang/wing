import { memo } from "react";

import { useTests } from "../services/use-tests.js";
import { TestTree } from "../ui/test-tree.js";

export interface TestsTreeViewProps {
  onSelectedItemsChange?: (items: string[]) => void;
  selectedItemId?: string;
}

export const TestsTreeView = memo(
  ({ onSelectedItemsChange, selectedItemId }: TestsTreeViewProps) => {
    const { testList, runAllTests, runTest } = useTests();

    return (
      <TestTree
        testList={testList}
        handleRunAllTests={runAllTests}
        handleRunTest={runTest}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItemId={selectedItemId}
      />
    );
  },
);
