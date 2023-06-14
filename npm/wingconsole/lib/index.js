import { binFile } from "./metadata.js";

export const open = async () => {
  await open(binFile, { wait: true });
};
