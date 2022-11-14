import path from "node:path";

import * as trpcExpress from "@trpc/server/adapters/express";
import { watch } from "chokidar";
import cors from "cors";
import { app, BrowserWindow, dialog, Menu } from "electron";
import console from "electron-log";
import { autoUpdater } from "electron-updater";
import express from "express";
import getPort from "get-port";

import { LogEntry } from "../../src/components/NodeLogs.js";

import { WING_PROTOCOL_SCHEME } from "./protocol.js";
import { mergeRouters } from "./router/index.js";
import { Simulator } from "./wingsdk.js";

class AppUpdater {
  constructor() {
    console.transports.file.level = "info";
    autoUpdater.logger = console;
    void autoUpdater.checkForUpdatesAndNotify();
  }
}

const ROOT_PATH = {
  dist: path.join(__dirname, "../.."),
  public: path.join(__dirname, "../.."),
};

async function createWindow(options?: { title?: string }) {
  await app.whenReady();

  const window = new BrowserWindow({
    title: options?.title ?? "Get Started",
    icon: path.join(ROOT_PATH.public, "icon.ico"),
    minWidth: 640,
    minHeight: 480,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  if (import.meta.env.DEV && process.env.VITE_DEV_SERVER_URL) {
    void window.loadURL(process.env.VITE_DEV_SERVER_URL);
    window.webContents.openDevTools();
  } else {
    void window.loadFile(path.join(ROOT_PATH.dist, "index.html"));
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

      const newWindow = await createWindow({
        title: path.basename(simfile),
      });
      newWindow.setRepresentedFilename(simfile);

      windows.set(simfile, newWindow);

      const console = {
        messages: new Array<LogEntry>(),
        log(message: string) {
          this.messages.push({
            timestamp: Date.now(),
            type: "info",
            message,
          });
          newWindow.webContents.send("invalidate:app.logs");
        },
        error(error: unknown) {
          this.messages.push({
            timestamp: Date.now(),
            type: "error",
            message:
              error instanceof Error ? error.message : JSON.stringify(error),
          });
          newWindow.webContents.send("invalidate:app.logs");
        },
      };

      const simulator = new Simulator({
        simfile,
      });

      // Start the simulator but don't wait for it, yet.
      console.log("Sarting the simulator...");
      const simulatorStart = simulator.start();

      // Create the express server and router for the simulator. Start
      // listening but don't wait for it, yet.
      console.log("Sarting the dev server...");
      const server = (async () => {
        const app = express();
        app.use(cors());
        app.use(
          "/",
          trpcExpress.createExpressMiddleware({
            router: mergeRouters({
              simulator,
              logs() {
                return console.messages;
              },
            }),
          }),
        );

        console.log("Looking for an open port...");
        const port = await getPort();
        const server = app.listen(port);
        await new Promise<void>((resolve) => {
          server.on("listening", resolve);
        });
        console.log(`Listening to the port ${port}`);
        return { port, server };
      })();

      // The renderer process will send a message asking
      // for the server port and the name of the file.
      newWindow.webContents.on("ipc-message", async (event, channel) => {
        if (channel === "init") {
          try {
            await simulatorStart;
          } catch (error) {
            console.error(error);
            dialog.showErrorBox(
              "Error starting the simulation",
              error instanceof Error ? error.message : "Unknown error",
            );
          }
          const { port } = await server;
          newWindow.webContents.send("init", { port, simfile });
        }
      });

      // Watch for changes in the simfile.
      const watcher = watch(simfile, {
        persistent: true,
        awaitWriteFinish: {
          stabilityThreshold: 2000,
          pollInterval: 100,
        },
      })
        .on("change", async () => {
          console.log(`File ${simfile} has been changed`);
          try {
            await simulator.reload();
          } catch (error) {
            console.error(error);
            dialog.showErrorBox(
              "Error reloading the simulation",
              error instanceof Error ? error.message : "Unknown error",
            );
          }
          console.log("Reloaded");
          newWindow.webContents.send("reload");
        })
        .on("unlink", async () => {
          console.log(`File ${simfile} has been removed`);
          await simulator.stop();
          // TODO: handle file deletion
        });

      newWindow.on("closed", async () => {
        windows.delete(simfile);
        try {
          await Promise.all([
            watcher.close(),
            server.then(({ server }) => server.close()),
            simulator.stop(),
          ]);
        } catch (error) {
          console.error(error);
        }
      });

      return newWindow;
    },
    async showOpenFileDialog() {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Wing Local File", extensions: ["wx"] }],
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

const windowManager = createWindowManager();

async function main() {
  if (!app.requestSingleInstanceLock()) {
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
    console.log("open-url", { url, filename });
    void windowManager.open(filename);
  });

  app.on("open-file", (event, filename) => {
    shouldShowGetStarted = false;

    console.log("open-file", { filename });
    void windowManager.open(filename);
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin" || import.meta.env.DEV) {
      app.quit();
    }
  });

  await app.whenReady();

  if (process.platform === "darwin") {
    // The default menu from Electron come with very useful items. We're going to reuse everything
    // except for the File menu, which is the second entry on the list.
    // TODO: Test it in different environments, since `Menu.getApplicationMenu()` may return null.
    const defaultMenuItems = Menu.getApplicationMenu()?.items!;
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        defaultMenuItems[0]!,
        {
          label: "File",
          submenu: [
            {
              label: "Open",
              accelerator: "Command+O",
              async click() {
                const { canceled, filePaths } = await dialog.showOpenDialog({
                  properties: ["openFile"],
                  filters: [{ name: "Wing Local File", extensions: ["wx"] }],
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

    await windowManager.open(`${__dirname}/../../../../electron/main/demo.wx`);
  } else {
    new AppUpdater();

    if (shouldShowGetStarted && BrowserWindow.getAllWindows().length === 0) {
      await windowManager.showOpenFileDialog();
    }
  }
}

void main();
