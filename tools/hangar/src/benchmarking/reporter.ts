import { Reporter, JsonReporter } from "vitest/reporters";
import { join } from "path";
import { hangarDir } from "../paths";
import { renameSync, existsSync } from "fs";
import { printTable } from "./table_report";
import { compareBenchmarks } from "./compare";

export default class WingJsonReporter extends JsonReporter implements Reporter {
  async writeReport(report: string): Promise<void> {
    // If there is an existing report, move it
    const currentReportPath = join(hangarDir, "results", "report.json");
    const lastReportPath = join(hangarDir, "results", "last_report.json");

    try {
      renameSync(currentReportPath, lastReportPath);
    } catch (_) {}

    await super.writeReport(report);

    const jsonData = JSON.parse(report, (_, value) => {
      if (typeof value === "number") {
        return Math.round(value * 100) / 100;
      }
      return value;
    });

    await printTable(jsonData);

    let previousReportSource = process.env.BENCH_COMPARE_PREVIOUS;

    if (!previousReportSource && existsSync(lastReportPath)) {
      previousReportSource = lastReportPath;
    }

    if (previousReportSource) {
      const differences = await compareBenchmarks(
        previousReportSource,
        currentReportPath
      );

      // check if we should fail the build
      const failThreshold = process.env.BENCH_FAIL_THRESHOLD_PERCENT;

      if (failThreshold) {
        let hasFailures = false;
        const threshold = parseFloat(failThreshold);
        for (const testName in differences) {
          const diff = differences[testName];
          if (diff.meanPercentDiff > threshold) {
            console.error(
              `(Above ${threshold}%) "${testName}" increased by ${diff.meanPercentDiff}%`
            );
            hasFailures = true;
          }
        }

        if (hasFailures) {
          process.exit(1);
        }
      }
    }
  }
}
