import { memo } from "react";

import { TestTree } from "./test-tree.js";
import { useTests } from "./use-tests.js";

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
