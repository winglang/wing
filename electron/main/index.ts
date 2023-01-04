import path from "node:path";

import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { app, BrowserWindow, dialog, Menu, shell } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import express from "express";
import getPort from "get-port";

import { ConsoleLogger, LogEntry } from "./consoleLogger.js";
import { WING_PROTOCOL_SCHEME } from "./protocol.js";
import { mergeAppRouters } from "./router/index.js";
import { createWingApp } from "./utils/createWingApp.js";
import { watchSimulatorFile } from "./utils/watchSimulatorFile.js";

// Chokidar is a CJS-only module and doesn't play well with ESM imports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const chokidar = require("chokidar") as typeof import("chokidar");

log.info("Application entrypoint");

class AppUpdater {
  constructor() {
    log.info("init auto-updater");
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    void autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.addListener("update-available", () => {
      log.info("update is available");
    });
    autoUpdater.addListener("update-downloaded", () => {
      log.info("update was downloaded");
    });
  }
}

const ROOT_PATH = {
  dist: path.join(__dirname, "../.."),
  public: path.join(__dirname, "../.."),
};

async function createWindow(options: { title?: string; port: number }) {
  log.info("createWindow", { options });
  await app.whenReady();

  const window = new BrowserWindow({
    title: options.title ?? "Get Started",
    icon: path.join(ROOT_PATH.public, "icon.ico"),
    minWidth: 640,
    minHeight: 480,
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  if (import.meta.env.DEV && process.env.VITE_DEV_SERVER_URL) {
    void window.loadURL(
      `${process.env.VITE_DEV_SERVER_URL}?port=${options.port}`,
    );
    window.webContents.openDevTools();
  } else {
    void window.loadFile(path.join(ROOT_PATH.dist, "index.html"), {
      query: {
        port: options.port.toString(),
      },
    });
  }

  return window;
}

/**
 * Creates a window manager, which reuses windows if the file is already open.
 */
function createWindowManager() {
  const windows = new Map<string, BrowserWindow>();

  return {
    async open(simfile: string) {
      simfile = path.resolve(process.cwd(), simfile);

      const window = windows.get(simfile);
      if (window) {
        window.focus();
        return window;
      }

      let newWindow: BrowserWindow | undefined;
      const consoleLogger: ConsoleLogger = {
        messages: new Array<LogEntry>(),
        verbose(message, source) {
          log.info(message);
          this.messages.push({
            timestamp: Date.now(),
            level: "verbose",
            message,
            source: source ?? "console",
          });
          newWindow?.webContents.send("trpc.invalidate", "app.logs");
        },
        log(message, source) {
          log.info(message);
          this.messages.push({
            timestamp: Date.now(),
            level: "info",
            message,
            source: source ?? "console",
          });
          newWindow?.webContents.send("trpc.invalidate", "app.logs");
        },
        error(error, source) {
          log.error(error);
          this.messages.push({
            timestamp: Date.now(),
            level: "error",
            message:
              error instanceof Error ? error.message : JSON.stringify(error),
            source: source ?? "console",
          });
          newWindow?.webContents.send("trpc.invalidate", "app.logs");
        },
      };

      const onLoading = (isLoading: boolean) => {
        log.verbose("onLoading", isLoading);
        newWindow?.webContents.send("app.isLoading", isLoading);
      };

      const onError = (error: unknown) => {
        log.verbose("onError", { error });
        newWindow?.webContents.send("app.isError", true);
      };

      const notifyChange = () => {
        log.verbose("notifyChange");
        newWindow?.webContents.send("trpc.invalidate", []);
      };

      const simulatorPromise = createWingApp({
        inputFile: simfile,
        onLoading,
        onError,
        consoleLogger,
      });

      // Create the express server and router for the simulator. Start
      // listening but don't wait for it, yet.
      consoleLogger.verbose("Starting the dev server...");
      const server = await (async () => {
        const app = express();
        app.use(cors());
        app.use(
          "/",
          trpcExpress.createExpressMiddleware({
            router: mergeAppRouters(),
            batching: { enabled: false },
            createContext() {
              return {
                async simulator() {
                  const sim = await simulatorPromise;
                  return sim.get();
                },
                async tree() {
                  const sim = await simulatorPromise;
                  return sim.tree();
                },
                logs() {
                  return consoleLogger.messages;
                },
              };
            },
          }),
        );

        consoleLogger.verbose("Looking for an open port");
        const port = await getPort();
        const server = app.listen(port);
        await new Promise<void>((resolve) => {
          server.on("listening", resolve);
        });
        consoleLogger.verbose(`Server is listening on port ${port}`);
        return { port, server };
      })();

      newWindow = await createWindow({
        title: path.basename(simfile),
        port: server.port,
      });

      newWindow.setRepresentedFilename(simfile);
      windows.set(simfile, newWindow);

      const simulatorPromiseResolved = await simulatorPromise;
      const simulatorInstance = await simulatorPromiseResolved.get();

      simulatorInstance.onTrace({
        callback(event) {
          // TODO: Refactor the whole logs and events so we support all of the fields that the simulator uses.
          consoleLogger.log(
            `[${event.sourceType}] ${
              event.data.message ?? JSON.stringify(event.data, undefined, 2)
            }`,
            "simulator",
          );
        },
      });

      const simulatorFileWatcher = watchSimulatorFile({
        simulator: simulatorInstance,
        simulatorFile: simulatorPromiseResolved.getSimFile(),
        onError,
        onLoading,
        consoleLogger,
        notifyChange,
      });

      // The renderer process will send a message asking
      // for the server port and the name of the file.
      newWindow.webContents.on(
        "ipc-message",
        async (event, channel, message) => {
          if (channel === "open-external-url") {
            await shell.openExternal(message);
            return;
          }
        },
      );

      newWindow.on("closed", async () => {
        windows.delete(simfile);
        try {
          await Promise.all([
            simulatorFileWatcher?.close(),
            server.server.close(),
            simulatorInstance.stop(),
          ]);
        } catch (error) {
          consoleLogger.error(error);
        }
      });

      return newWindow;
    },
    async showOpenFileDialog() {
      await app.whenReady();
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Wing File", extensions: ["wsim", "w"] }],
      });
      if (canceled) {
        return;
      }

      const [simfile] = filePaths;
      if (!simfile) {
        return;
      }

      return this.open(simfile);
    },
  };
}

log.info("Create window manager");
const windowManager = createWindowManager();

async function main() {
  if (!app.requestSingleInstanceLock()) {
    log.info("Another instance is already running, exiting");
    app.quit();
    return;
  }

  if (process.defaultApp) {
    const filename = process.argv[1];
    if (filename) {
      app.setAsDefaultProtocolClient(WING_PROTOCOL_SCHEME, process.execPath, [
        path.resolve(filename),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient(WING_PROTOCOL_SCHEME);
  }

  app.on("activate", (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
      void windowManager.showOpenFileDialog();
    }
  });

  // If the application started by opening it directly, we should show the Get Started window.
  // Otherwise, the application was open using a file and we should start the simulator.
  let shouldShowGetStarted = true;

  app.on("open-url", (event, url) => {
    shouldShowGetStarted = false;

    const filename = url.slice(`${WING_PROTOCOL_SCHEME}://`.length);
    log.info("open-url", { url, filename });
    void windowManager.open(filename);
  });

  app.on("open-file", (event, filename) => {
    shouldShowGetStarted = false;

    log.info("open-file", { filename });
    void windowManager.open(filename);
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin" || import.meta.env.DEV) {
      app.quit();
    }
  });

  log.info("waiting for app to be ready...");
  await app.whenReady();
  log.info("app is ready");

  if (process.platform === "darwin") {
    // The default menu from Electron come with very useful items. We're going to reuse everything
    // except for the File menu, which is the second entry on the list.
    // TODO: Test it in different environments, since `Menu.getApplicationMenu()` may return null.
    const defaultMenuItems = Menu.getApplicationMenu()?.items!;
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          ...defaultMenuItems[0]!,
          submenu: defaultMenuItems[0]!.submenu!.items.map((item) => ({
            ...item,
            label: item.label.replace("wing-console", "Wing Console"),
          })) as any,
        },
        {
          label: "File",
          submenu: [
            {
              label: "Open",
              accelerator: "Command+O",
              async click() {
                const { canceled, filePaths } = await dialog.showOpenDialog({
                  properties: ["openFile"],
                  filters: [{ name: "Wing File", extensions: ["wsim", "w"] }],
                });
                if (canceled) {
                  return;
                }

                const [simfile] = filePaths;
                if (simfile) {
                  void windowManager.open(simfile);
                }
              },
            },
            { type: "separator" },
            {
              label: "Close Window",
              accelerator: "Command+W",
              click() {
                BrowserWindow.getFocusedWindow()?.close();
              },
            },
          ],
        },
        ...defaultMenuItems.slice(2),
      ]),
    );
  }

  if (import.meta.env.DEV) {
    const installExtension = await import("electron-devtools-installer");
    await installExtension.default(installExtension.REACT_DEVELOPER_TOOLS.id);

    // Open the demo Wing file (includes compiling).
    // await windowManager.open(`${__dirname}/../../../../demo/index.w`);

    // Open the Construct Hub.
    await windowManager.open(
      `${__dirname}/../../../../demo/constructHub/index.wsim`,
    );
  } else {
    new AppUpdater();

    if (shouldShowGetStarted && BrowserWindow.getAllWindows().length === 0) {
      await windowManager.showOpenFileDialog();
    }
  }
}

log.info("Application start: main()");
void main();
