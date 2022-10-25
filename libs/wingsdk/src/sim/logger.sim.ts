import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { SimulatorContext } from "../testing";
import { LoggerSchema } from "./schema-resources";

export async function start(
  _props: any,
  _context: SimulatorContext
): Promise<LoggerSchema["attrs"]> {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), "wing-sim-"));
  return {
    logsDir: tmpdir,
  };
}

export async function stop(_attrs: LoggerSchema["attrs"]): Promise<void> {
  // TODO: cleanup
  return;
}
