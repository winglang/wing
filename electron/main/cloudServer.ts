import chokidar from "chokidar";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron";
import log from "electron-log";

import BrowserWindow = Electron.BrowserWindow;
import { createWingLocalServer } from "@monadahq/wing-local-server";

// import { ipcMain } from "electron";

export enum FileStatus {
  added = "added",
  changed = "changed",
  deleted = "deleted",
}

export interface CloudServerOptions {
  filename: string;
  tmpDir?: string;
  port?: number;
}

export interface CloudServer {
  port: number;
}

export const createCloudServer = async (options: CloudServerOptions) => {
  const { port, tmpDir, filename } = options;

  const sendSchemaUpdate = () => {
    log.info("send server schema update");
    ipcMain.emit("schema-update");
  };

  const server = await createWingLocalServer(filename, {
    port,
    tmpdir: tmpDir,
  });

  const watcher = chokidar.watch(filename, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
  });

  if (!watcher) {
    log.error(`failed to watch file: ${filename}`);
    throw new Error(`failed to watch file: ${filename}`);
  }

  watcher
    .on("add", (path: string) => fileChangeHandler(FileStatus.added))
    .on("change", (path: string) => fileChangeHandler(FileStatus.changed))
    .on("unlink", (path: string) => fileChangeHandler(FileStatus.deleted));

  const fileChangeHandler = async (status: FileStatus) => {
    switch (status) {
      case FileStatus.deleted:
        log.info(`file deleted: ${filename}`);
        sendSchemaUpdate();
        return;
      case FileStatus.added:
        log.info(`file added: ${filename}`);
        sendSchemaUpdate();
        return;
      case FileStatus.changed:
        log.info(`file changed: ${filename}`);
        await server.reload();
        log.info(`server reloaded: ${filename}`);
        sendSchemaUpdate();
        return;
    }
  };

  return {
    // TODO [sa] is it needed???
    closeServer: () => {
      void watcher.close();
      // TODO [sa] do we need to add server.stop() here?
    },
    port: server.port,
  };
};
