import { binFile } from "./metadata.js";
import { openApp } from "./open-app.js";

export const open = async () => {
  await openApp(binFile);
};
