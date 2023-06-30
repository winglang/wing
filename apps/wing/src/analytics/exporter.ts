import { spawn } from 'child_process';

export class AnalyticsExporter {
  static exportAnalytics() {
    const child = spawn('node', [require.resolve('./export')], {
      detached: true,
      stdio: 'ignore'
    });
    
    child.unref();
  }
}
