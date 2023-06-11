import { readFileSync } from "fs";
import YAML from "yaml";

export interface MetaTestCase {
  /**
   * The compile target
   */
  target: string;
  /**
   * (benchmark only) The maximum time in milliseconds for this test case, averaged over all iterations
   */
  maxMeanTime: number;
}

export interface MetaComment {
  /**
   * The different cases to test this file in
   *
   * @default - All available cases will be tested
   */
  cases?: MetaTestCase[];

  /**
   * If any of these platforms are detected, the test will be skipped in CI
   *
   * @default - Will not be skipped
   */
  skipPlatforms?: (typeof process.platform)[];

  /**
   * Should the test be skipped at all platform, all environments
   *
   * @default - Will not be skipped
   */
  skip?: boolean;

  /**
   * Environment variables to set for this test
   * 
   * @default - No environment variables will be set
   */
  env?: Record<string, string>;
}

export function parseMetaCommentFromPath(testPath: string) {
  return parseMetaComment(readFileSync(testPath, "utf-8"));
}

export function parseMetaComment(content: string) {
  // regex parse the comment to get the threshold
  const specialCommentRegex = /^\/\*\\\n(.+)\\\*\/$/gms;
  const specialComment = specialCommentRegex.exec(content);
  const rawYaml = specialComment?.[1];
  if (!rawYaml) {
    return undefined;
  }

  return YAML.parse(rawYaml) as MetaComment;
}
