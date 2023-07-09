import { spawn } from 'child_process';

export async function exportAnalytics(filePath: Promise<string | undefined>) {
  const awaitedFilePath = await filePath;
  if (!awaitedFilePath) {
    return;
  }
  const child = spawn(process.execPath, [require.resolve('./scripts/detached-export'), awaitedFilePath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  child.unref();
}