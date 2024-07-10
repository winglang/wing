import type { TestItem } from "./test-runner.js";

/*
 * Manages the list of tests and their status, and notifies when the tests change.
 */
export const createTestStateManager = ({
  onTestsChange,
}: {
  onTestsChange: (testId?: string) => void;
}) => {
  let tests: TestItem[] = [];

  return {
    getTests: () => {
      return tests;
    },
    getTest: (testId: string) => {
      return tests.find((t) => t.id === testId);
    },
    setTests: (newTests: TestItem[]) => {
      tests = newTests;
      onTestsChange();
    },
    setTest: (test: TestItem) => {
      const index = tests.findIndex((t) => t.id === test.id);
      if (index === -1) {
        tests.push(test);
      } else {
        tests[index] = test;
      }
      onTestsChange(test.id);
    },

    restart: () => {
      tests = [];
      onTestsChange();
    },
  };
};
