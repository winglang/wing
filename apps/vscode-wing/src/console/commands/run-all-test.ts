import { TestsExplorerProvider } from "../explorer-providers/TestsExplorerProvider";
import { Client } from "../services/trpc";

export const runAllTests = async (
  client: Client,
  testsExplorer: TestsExplorerProvider
) => {
  const tests = testsExplorer.getTests();
  testsExplorer.update(
    tests.map((testItem) => {
      return {
        ...testItem,
        status: "running",
      };

      return testItem;
    })
  );
  await client.runAllTests();
};
