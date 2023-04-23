import { readdirSync, existsSync } from "fs";
import { debug } from "debug";
import { resolve } from "path";
import open from "open";

export async function run(simfile?: string) {
  if (!simfile) {
    const wingFiles = readdirSync(".").filter((item) => item.endsWith(".w"));
    if (wingFiles.length !== 1) {
      throw new Error("Please specify which file you want to run");
    }
    simfile = wingFiles[0];
  }

  if (!existsSync(simfile)) {
    throw new Error(simfile + " doesn't exist");
  }

  simfile = resolve(simfile);
  debug("calling wing console protocol with:" + simfile);
  await open("wing-console://" + simfile);
}
