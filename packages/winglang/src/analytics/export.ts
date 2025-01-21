import { spawn } from "child_process";

export async function exportAnalytics(filePath: Promise<string | undefined>) {
  const awaitedFilePath = await filePath;

  if (!awaitedFilePath || process.env.WING_DISABLE_ANALYTICS) {
    return;
  }

  const child = spawn(
    process.execPath,
    [require.resolve("./scripts/detached-export"), awaitedFilePath],
    {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
      env: {
        ...process.env,
      },
    },
  );

  child.unref();
}
