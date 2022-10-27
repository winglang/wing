import { join } from "node:path";

import { app, BrowserWindow, shell, ipcMain } from "electron";
import log from "electron-log";
import { createIPCHandler } from "electron-trpc";
import { autoUpdater } from "electron-updater";

import { mergeRouters } from "./router/index.js";
import { createSimulator } from "./wingsdk.js";

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

export const ROOT_PATH = {
  dist: join(__dirname, "../.."),
  public: join(__dirname, app.isPackaged ? "../.." : "../.."),
};

let win: BrowserWindow | undefined;
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(ROOT_PATH.dist, "index.html");

function createWindow() {
  win = new BrowserWindow({
    title: "Wing Console",
    icon: join(ROOT_PATH.public, "icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../preload/index.js"),
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
  win = undefined;
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
  }
});

app.on("activate", async () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length > 0) {
    allWindows[0]?.focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow();

  if (app.isPackaged) {
    void childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    void childWindow.loadURL(`${url}/#${arg}`);
  }
});

const getWXFilePath = (): string => {
  // Use the demo.wx file in dev.
  if (import.meta.env.DEV) {
    return `${process.cwd()}/electron/main/demo.wx`;
  }

  const path = process.argv
    .slice(1)
    .find((arg) => arg.startsWith("--cloudFile="))
    ?.replace("--cloudFile=", "");

  if (!path) {
    throw new Error("Usage: wing-console --cloudFile=file.wx");
  }

  return path;
};

void app.whenReady().then(async () => {
  if (import.meta.env.PROD) {
    new AppUpdater();
  }

  if (import.meta.env.DEV) {
    const installExtension = await import("electron-devtools-installer");
    await installExtension.default(installExtension.REACT_DEVELOPER_TOOLS.id);
  }

  const wxFilePath = getWXFilePath();
  const sim = createSimulator({ appPath: wxFilePath });
  await sim.start();
  const router = mergeRouters(sim);
  createIPCHandler({ ipcMain, router });
  const window = createWindow();
});
