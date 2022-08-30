import { lstat } from "node:fs/promises";
import { cwd } from "node:process";

import { ipcRenderer } from "electron";

ipcRenderer.on("main-process-message", (_event, ...arguments_) => {
  console.log("[Receive Main-process message]:", ...arguments_);
});

lstat(cwd())
  .then((stats) => {
    console.log("[fs.lstat]", stats);
  })
  .catch((error) => {
    console.error(error);
  });
