import type { TestItem } from "./test-runner.js";

export const createTestStateManager = ({
  onTestsChange,
}: {
  onTestsChange: (testId?: string) => void;
}) => {
  let tests: TestItem[] = [];
  let initialized = false;

  return {
    getTests: () => {
      return tests;
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
    initialized: () => {
      return initialized;
    },
    restart: () => {
      initialized = false;
      tests = [];
      onTestsChange();
    },
  };
};
