import { exec, execSync } from "child_process";

export default async function () {
  // compile src/**/*.on*.inflight.ts to .js because these are going to be
  // injected into our javascript vm and cannot be resolved via vitest
  execSync("npx tsc -p tsconfig.test.json", { stdio: "inherit" });
  return () => {};
}
