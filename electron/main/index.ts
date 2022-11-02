import path from "node:path";

import { app, BrowserWindow, shell, ipcMain, dialog } from "electron";
import log from "electron-log";
import { createIPCHandler } from "electron-trpc";
import { autoUpdater } from "electron-updater";

import { initWXFileWatcher } from "./appWatcher.js";
import { WING_PROTOCOL_SCHEME } from "./protocol.js";
import { mergeRouters } from "./router/index.js";
import { createSimulator, Simulator } from "./wingsdk.js";

export default class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    void autoUpdater.checkForUpdatesAndNotify();
  }
}

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0);
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

export const ROOT_PATH = {
  dist: path.join(__dirname, "../.."),
  public: path.join(__dirname, "../.."),
};

let win: BrowserWindow | undefined;
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = path.join(ROOT_PATH.dist, "index.html");

async function createWindow(wxFilePath: string) {
  if (win) {
    return;
  }

  const sim = initWXFileWatcher({
    appPath: wxFilePath,
    onAppChange: () => {
      if (!win) {
        log.warn("No window to reload");
        return;
      }
      log.info("sending a message to reload after file change");
      win.webContents.send("cloud-app-changed");
    },
  });

  const router = mergeRouters(sim);
  createIPCHandler({ ipcMain, router });

  win = new BrowserWindow({
    title: "Wing Console",
    icon: path.join(ROOT_PATH.public, "icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
    },
  });

  if (url) {
    void win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    void win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) {
      void shell.openExternal(url);
    }
    return { action: "deny" };
  });

  return win;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();

    dialog.showErrorBox(
      "Can't open multiple windows",
      "Wing Console doesn't support multiple windows yet",
    );
  }
});

let wxPathFromDeeplinkProtocol: string | undefined;
app.on("open-url", (event, url) => {
  wxPathFromDeeplinkProtocol = url.slice(`${WING_PROTOCOL_SCHEME}://`.length);
});
app.on("open-file", (event, path) => {
  wxPathFromDeeplinkProtocol = path;
});

void app.whenReady().then(async () => {
  if (import.meta.env.PROD) {
    new AppUpdater();
  }
  if (import.meta.env.DEV) {
    const installExtension = await import("electron-devtools-installer");
    await installExtension.default(installExtension.REACT_DEVELOPER_TOOLS.id);
  }
  // Use the demo.wx file in dev.
  if (import.meta.env.DEV) {
    await createWindow(`${process.cwd()}/electron/main/demo.wx`);
  } else {
    const path = wxPathFromDeeplinkProtocol ?? process.argv[1];
    if (!path) {
      dialog.showErrorBox(
        "Expected a .wx file as an argument",
        "Usage: wing-console file.wx",
      );
      app.quit();
      return;
    }
    await createWindow(path);
  }
});
