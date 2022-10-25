import path, { join } from "node:path";

import { app, BrowserWindow, shell, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
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
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | undefined;
const url = `http://${process.env.VITE_DEV_SERVER_HOSTNAME}:${process.env.VITE_DEV_SERVER_PORT}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  await installExtension(REACT_DEVELOPER_TOOLS.id);

  win = new BrowserWindow({
    title: "Wing Console",
    icon: join(ROOT_PATH.public, "icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, "../preload/preload.js")
        : path.join(__dirname, "../../../../electron/main/preload/preload.js"),
      contextIsolation: true,
    },
  });

  if (app.isPackaged) {
    void win.loadFile(indexHtml);
  } else {
    void win.loadURL(`${url}`);
    win.webContents.openDevTools();
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
  // TODO [sa] remove comment
  // const cloudFileArg = process.argv.slice(2).find(arg => arg.startsWith('--cloudFile='));
  // if(!cloudFileArg) {
  //   throw new Error(`no cloud application file was provided`);
  // }
  // return cloudFileArg.replace('--cloudFile=', '');
  return join(__dirname, "../../../../test/demo.wx");
};

void app.whenReady().then(async () => {
  const wxFilePath = getWXFilePath();
  const sim = await createSimulator(wxFilePath);
  const router = mergeRouters(sim);
  createIPCHandler({ ipcMain, router });
  await createWindow();
});
