import { spawnSync } from "child_process";
try {
  require.resolve("wasi");
  require("./index-pkg");
} catch (err) {
  if (err.code === "MODULE_NOT_FOUND") {
    const { env, execPath, execArgv, argv } = process;
    env.NODE_OPTIONS = `${
      env.NODE_OPTIONS || ""
    } --experimental-wasi-unstable-preview1 --no-warnings`;
    const { status } = spawnSync(execPath, execArgv.concat(argv.slice(1)), {
      env,
      stdio: "inherit",
    });
    process.exit(status ?? 1);
  } else {
    console.error('Unable to load "wasi" module', err);
    process.exit(1);
  }
}
