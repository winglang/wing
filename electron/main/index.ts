import path, { join } from "node:path";

import { app, BrowserWindow, shell, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { log } from "electron-log";
import { createIPCHandler } from "electron-trpc";

import { mergeRouters } from "./router/index.js";
import { createSimulator } from "./simulator/simulator.js";

// TODO [sa] add auto-updater

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

async function createWindow() {
  await installExtension(REACT_DEVELOPER_TOOLS.id);

  win = new BrowserWindow({
    title: "Wing Console",
    icon: join(ROOT_PATH.public, "icon.ico"),
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
    await createWindow();
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
  log(process.argv);
  const cloudFileArg = process.argv
    .slice(1)
    .find((arg) => arg.startsWith("--cloudFile="));
  if (!cloudFileArg) {
    log("loading application in demo mode");
    return join(ROOT_PATH.public, "demo.wx");
  }
  return cloudFileArg.replace("--cloudFile=", "");
};

void app.whenReady().then(async () => {
  const wxFilePath = getWXFilePath();
  const sim = await createSimulator(wxFilePath);
  const router = mergeRouters(sim);
  createIPCHandler({ ipcMain, router });
  await createWindow();
});
