import { readFileSync } from "fs-extra";
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
export type SkipCase = typeof process.platform;

export interface MetaComment {
  /**
   * The different cases to test this file in
   *
   * @default - All available cases will be tested
   */
  cases?: MetaTestCase[];

  /**
   * If any of these platforms are detected, the test will be skipped
   *
   * @default - Will not be skipped
   */
  skip?: SkipCase[];
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
