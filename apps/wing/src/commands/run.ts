import { readdirSync, existsSync } from "fs";
import { debug } from "debug";
import { resolve } from "path";
import open from "open";
import { createConsoleApp } from "@wingconsole/app";

export async function run(wingfile?: string, options?: { port?: string }) {
  if (!wingfile) {
    const wingFiles = readdirSync(".").filter((item) => item.endsWith(".w"));
    if (wingFiles.length !== 1) {
      throw new Error("Please specify which file you want to run");
    }
    wingfile = wingFiles[0];
  }

  if (!existsSync(wingfile)) {
    throw new Error(wingfile + " doesn't exist");
  }

  wingfile = resolve(wingfile);
  debug("opening the wing console with:" + wingfile);

  const { port } = await createConsoleApp({
    wingfile,
    requestedPort: options?.port ? Number(options.port) : undefined,
    hostUtils: {
      async openExternal(url) {
        await open(url);
      },
    },
  });
  const url = `http://localhost:${port}/`;
  await open(url);
  console.log(`The Wing Console is running at ${url}`);
}
