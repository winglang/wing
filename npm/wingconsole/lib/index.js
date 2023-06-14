import { fileURLToPath } from "node:url";

import openExternal from "open";

import { binFile } from "./metadata.js";

export const open = async () => {
  await openExternal(fileURLToPath(binFile), { wait: true });
};
