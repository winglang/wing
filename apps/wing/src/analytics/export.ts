import { spawn } from 'child_process';

export function exportAnalytics(filePath: string) {
  const child = spawn(process.argv[0], [require.resolve('./exporter'), filePath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  child.unref();
}
