import { Client } from "../services/trpc";
import { TestItem, TestsExplorerProvider } from "../TestsExplorerProvider";

export const runTest = (
  client: Client,
  testsExplorer: TestsExplorerProvider
) => {
  const run = async (test: TestItem) => {
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

    const response = await client.runTest(test.id);
    await client.invalidateQueries();

    testsExplorer.update(
      tests.map((testItem) => {
        if (testItem.id === test.id) {
          return {
            ...test,
            time: response.time,
            status: response.error ? "error" : "success",
          };
        }
        return testItem;
      })
    );
  };

  return {
    run,
  };
};
