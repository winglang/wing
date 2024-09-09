import { describe, test, expect, beforeEach } from "vitest";
import { CICollector } from "./ci-collector";

describe("ci collector tests", () => {
  const originialEnvironment = process.env;

  beforeEach(() => {
    // Restore the environment back to where it was before any of the
    // tests manipulated it
    process.env = { ...originialEnvironment };
  });

  test("should return undefined when no ci environment is detected", async () => {
    // GIVEN
    const collector = new CICollector();

    // WHEN
    delete process.env.GITHUB_ACTIONS;
    const ciData = await collector.collect();

    // THEN
    expect(ciData).toBeUndefined();
  });

  describe("should return correct CI environment name", () => {
    let collector: CICollector;

    beforeEach(() => {
      // So our CI tests dont fail
      delete process.env.GITHUB_ACTIONS;
      collector = new CICollector();
    });

    test("when in Github actions", async () => {
      // WHEN
      process.env.GITHUB_ACTIONS = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "GITHUB_ACTIONS" });
    });

    test("when in Gitlab ci", async () => {
      // WHEN
      process.env.GITLAB_CI = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "GITLAB_CI" });
    });

    test("when in Jekins", async () => {
      // WHEN
      process.env.JENKINS_URL = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "JENKINS" });
    });

    test("when in Circleci", async () => {
      // WHEN
      process.env.CIRCLECI = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "CIRCLECI" });
    });

    test("when in Bitbucket", async () => {
      // WHEN
      process.env.BITBUCKET_BUILD_NUMBER = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "BITBUCKET" });
    });

    test("when in Azure Devops", async () => {
      // WHEN
      process.env.BUILD_BUILDID = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "AZURE_DEVOPS" });
    });

    test("when in Teamcity", async () => {
      // WHEN
      process.env.TEAMCITY_VERSION = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "TEAMCITY" });
    });

    test("when in AWS Codebuild", async () => {
      // WHEN
      process.env.CODEBUILD_BUILD_ID = "1";

      // THEN
      expect(await collector.collect()).toEqual({ name: "CODEBUILD" });
    });
  });
});
