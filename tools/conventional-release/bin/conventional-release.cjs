#!/usr/bin/env -S node
const { execSync } = require("node:child_process");
execSync(
  `npx tsx ${__dirname}/../src/cli.ts ${process.argv.slice(2).join(" ")}`,
  {
    stdio: "inherit",
  },
);
