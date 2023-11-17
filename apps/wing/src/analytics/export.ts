import { spawn } from "child_process";

export async function exportAnalytics(filePath: Promise<string | undefined>) {
  const awaitedFilePath = await filePath;
  const runAttached = process.env.WING_ANALYTICS_RUN_ATTACHED ? true : false;

  if (!awaitedFilePath || process.env.WING_DISABLE_ANALYTICS) {
    return;
  }

  const child = spawn(
    process.execPath,
    [require.resolve("./scripts/detached-export"), awaitedFilePath],
    {
      detached: runAttached ? false : true,
      windowsHide: true,
      env: {
        ...process.env,
      },
      stdio: runAttached ? ["ignore", "pipe", "pipe"] : "ignore",
    }
  );

  if (runAttached) {
    child.stderr!.on("data", (data) => {
      console.log(data.toString());
      process.exit(1);
    });
  } else {
    child.unref();
  }
}
