import { existsSync } from "fs";
import { MatrixAutomation } from "./matrix-automation";
import { resolve } from "path";

export interface Options {}

try {
  const outFolder = process.env.OUT_FOLDER;
  if (!outFolder || !existsSync(resolve(outFolder))) {
    throw new Error(`out folder ${outFolder} does not exist`);
  }
  new MatrixAutomation().updateMatrix(outFolder);
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
