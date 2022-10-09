import { spawnSync } from "child_process";
import { execPath, argv, env, exit, execArgv } from "process";

export async function ensureWASISupport() {
  try {
    // check if experimental WASI is enabled
    return (await import("wasi")).WASI;
  } catch (error) {
    if (error.code === "ERR_MODULE_NOT_FOUND") {
      // extend NODE_OPTIONS with WASI flag
      env.NODE_OPTIONS = `${env.NODE_OPTIONS || ""} --experimental-wasi-unstable-preview1 --no-warnings`;

      const { status } = spawnSync(execPath, execArgv.concat(argv.slice(1)), {
        env,
        stdio: "inherit" 
      });

      exit(status ?? 1);
    } else {
      console.error("Unable to launch with WASI support", error);
      exit(1);
    }
  }
}