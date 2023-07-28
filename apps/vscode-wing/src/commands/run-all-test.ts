import { Client } from "../services/trpc";
import { TestsExplorerProvider } from "../TestsExplorerProvider";

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
