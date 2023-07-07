import { spawn } from 'child_process';

export async function exportAnalytics(filePath: Promise<string>) {
  const child = spawn(process.execPath, [require.resolve('./scripts/detached-export'), await filePath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  child.unref();
}