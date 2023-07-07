import { spawn } from 'child_process';

export function exportAnalytics(filePath: string) {
  const child = spawn(process.execPath, [require.resolve('./scripts/detached-export'), filePath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  child.unref();
}