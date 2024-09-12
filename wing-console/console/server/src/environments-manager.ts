import type { simulator } from "@winglang/sdk";

import type { ConsoleEnvironmentId } from "./types.js";
import type { TestRunner } from "./utils/test-runner/test-runner.js";

export interface CreateEnvironmentsManagerOptions {
  getSimulator: () => Promise<simulator.Simulator>;
}

export interface EnvironmentsManager {
  activateEnvironment(environmentId: ConsoleEnvironmentId): Promise<void>;
  listEnvironments(
    testRunner: TestRunner,
  ): Promise<{ id: ConsoleEnvironmentId; name: string }[]>;
  getSimulatorForEnvironment(
    environmentId: ConsoleEnvironmentId,
  ): Promise<simulator.Simulator>;
}

export const createEnvironmentsManager = (
  options: CreateEnvironmentsManagerOptions,
): EnvironmentsManager => {
  return {
    async activateEnvironment(environmentId) {
      console.log("activateEnvironment", environmentId);
    },
    async listEnvironments(testRunner: TestRunner) {
      const tests = testRunner.listTests();
      return [
        { id: "local", name: "Local" },
        ...tests.map((test) => {
          return {
            id: `local-test:${test.id}` as ConsoleEnvironmentId,
            name: test.label,
          };
        }),
      ];
    },
    async getSimulatorForEnvironment(
      environmentId: ConsoleEnvironmentId,
    ): Promise<simulator.Simulator> {
      if (environmentId === "local") {
        return options.getSimulator();
      }

      throw new Error("Environment not ready yet");
    },
  };
};
