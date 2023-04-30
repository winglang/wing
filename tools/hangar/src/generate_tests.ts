import {
  mkdirSync,
  mkdirpSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "fs-extra";
import { sdkTests, validTestDir } from "./paths";
import { join, extname } from "path";
import { parseMetaCommentFromPath } from "./meta_comment";

const generatedTestDir = join(__dirname, "test_corpus", "valid");
const generatedSDKTestDir = join(__dirname, "test_corpus", "sdk_tests");

rmSync(generatedTestDir, { recursive: true, force: true });
rmSync(generatedSDKTestDir, { recursive: true, force: true });

function generateTests(
  sourceDir: string,
  destination: string,
  isRecursive: boolean = true,
  level: number = 0
) {
  for (const fileInfo of readdirSync(sourceDir, { withFileTypes: true })) {
    if (fileInfo.isDirectory() && isRecursive) {
      generateTests(
        join(sourceDir, fileInfo.name),
        join(destination, fileInfo.name),
        isRecursive,
        level + 1
      );
      continue;
    }
    if (!fileInfo.isFile() || extname(fileInfo.name) !== ".w") {
      continue;
    }

    const filename = fileInfo.name;

    const metaComment = parseMetaCommentFromPath(join(sourceDir, filename));

    let skipText = "";

    if (
      metaComment?.skipPlatforms?.includes(process.platform) &&
      process.env.CI
    ) {
      skipText = ".skip";
    }

    const fileContents = `\
  // This file is generated by tools/hangar/src/generate_tests.ts
  
  import { test } from "vitest";
  import { compileTest, testTest } from "${Array(level)
    .fill("../")
    .join("")}../../generated_test_targets";
  
  test${skipText}("wing compile -t tf-aws", async () => {
    await compileTest("${sourceDir}", "${filename}");
  });
  
  test${skipText}("wing test -t sim", async () => {
    await testTest("${sourceDir}", "${filename}");
  });`;

    mkdirpSync(destination);
    writeFileSync(join(destination, `${filename}.test.ts`), fileContents);
  }
}

generateTests(validTestDir, generatedTestDir, false);
generateTests(sdkTests, generatedSDKTestDir);
