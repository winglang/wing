import { readFileSync } from "fs-extra";
import YAML from "yaml";

export interface MetaTestCase {
  target: string;
  maxMeanTime: number;
}

export type SkipCase = "platform=windows" | "platform=macos" | "platform=linux" | "env";

export interface MetaComment {
  cases: MetaTestCase[];
  skip: SkipCase[];
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
