import { createCompiler } from "./compiler.js";
import { createSimulator } from "./simulator.js";

export type TestStatus = "success" | "error" | "idle" | "running";

export interface Test {
  testId: string; // resource path, I guess?
  status: TestStatus;
}

export interface TestRunner {
  // List of all of the tests and their status.
  listTests(): Array<Test>;

  // Status of the test runner as a whole.
  status(): TestStatus;

  // Starts running a test.
  runTest(testId: string): void;

  // Run all tests.
  runAllTests(): void;

  // Used to report tests status changes to the frontend via websockets.
  onTestsChange(callback: () => void): void;
}

export interface CreateTestRunnerProps {
  wingfile: string;
  platform?: string[];
  watchGlobs: string[];
}

export const createTestRunner = ({
  wingfile,
  platform,
  watchGlobs,
}: CreateTestRunnerProps): TestRunner => {
  const testCompiler = createCompiler({
    wingfile,
    platform,
    watchGlobs,
    testing: true,
  });

  const testSimulator = createSimulator();

  testCompiler.on("compiled", ({ simfile }) => {
    testSimulator.start(simfile);
  });

  const listTests = () => {
    return [];
  };

  const status = () => {
    return "success" as TestStatus;
  };

  const runAllTests = () => {};

  const runTest = (testId: string) => {};

  const onTestsChange = (callback: () => void) => {};

  return {
    listTests,
    status,
    runTest,
    runAllTests,
    onTestsChange,
  };
};
