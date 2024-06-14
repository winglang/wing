// Use `pnpm bench` (or `turbo bench`) to run this script

import { checkThreshold, compareBenchmarks } from "./compare";
import { resultsDir } from "../paths";
import { join } from "path";
import { existsSync } from "fs";

(async () => {
  const currentReportSource = join(resultsDir, "report.json");
  const previousReportSource = join(resultsDir, "report.previous.json");

  if (!existsSync(previousReportSource)) {
    return;
  }

  const differences = await compareBenchmarks(
    currentReportSource,
    previousReportSource
  );

  // check if we should fail the build
  const failThreshold = process.env.BENCH_FAIL_THRESHOLD_PERCENT;

  if (failThreshold !== undefined) {
    const threshold = parseFloat(failThreshold);
    await checkThreshold(differences, threshold);
  }
})();
