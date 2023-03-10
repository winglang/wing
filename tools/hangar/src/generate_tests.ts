import { mkdirpSync, readdirSync, rmSync, writeFileSync } from "fs-extra";
import { validTestDir } from "./paths";
import { basename, join, extname } from "path";

const generatedTestDir = join(__dirname, "generated_tests", "valid");
rmSync(generatedTestDir, { recursive: true });
mkdirpSync(generatedTestDir);
for (const fileInfo of readdirSync(validTestDir, { withFileTypes: true })) {
  if (!fileInfo.isFile() || extname(fileInfo.name) !== ".w") {
    continue;
  }

  const filename = fileInfo.name;

  const fileContents = `\
import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("${basename(fileInfo.name, ".w")}", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("${filename}");
  });
  test("wing test", async () => {
    await testTest("${filename}");
  });
})
`;

  writeFileSync(join(generatedTestDir, `${filename}.test.ts`), fileContents);
}
