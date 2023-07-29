import {
  TestItem,
  TestsExplorerProvider,
} from "../explorer-providers/TestsExplorerProvider";
import { Client } from "../services/trpc";

export const runTest = async (
  client: Client,
  test: TestItem,
  testsExplorer: TestsExplorerProvider
) => {
  const tests = testsExplorer.getTests();
  testsExplorer.update(
    tests.map((testItem) => {
      if (testItem.id === test.id) {
        return {
          ...test,
          status: "running",
        };
      }
      return testItem;
    })
  );
  await client.runTest(test.id);
};
