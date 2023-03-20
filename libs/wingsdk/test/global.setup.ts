import { exec, execSync } from "child_process";

export default async function () {
  execSync("npx tsc -p tsconfig.test.json");
  return () => {};
}
