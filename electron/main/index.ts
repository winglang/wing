import { release } from "node:os";
import { join } from "node:path";
// import fetch from "node-fetch";

// console.log(fetch);

// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow, shell, ipcMain } from "electron";
// eslint-disable-next-line import/no-extraneous-dependencies
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import log from "electron-log";

import { createCloudServer } from "./cloudServer";

// TODO [sa] add auto-updater

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0);
}

// process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let win: BrowserWindow | undefined;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env.VITE_DEV_SERVER_HOSTNAME}:${process.env.VITE_DEV_SERVER_PORT}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  await installExtension(REACT_DEVELOPER_TOOLS.id);

  win = new BrowserWindow({
    title: "Wing Console",
    icon: join(ROOT_PATH.public, "favicon.svg"),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    void win.loadFile(indexHtml);
  } else {
    void win.loadURL(url);
    win.webContents.openDevTools();
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  // eslint-disable-next-line @typescript-eslint/no-shadow
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) {
      void shell.openExternal(url);
    }
    return { action: "deny" };
  });
}

const getCloudFile = (): string => {
  // TODO [sa] remove comment
  // const cloudFileArg = process.argv.slice(2).find(arg => arg.startsWith('--cloudFile='));
  // if(!cloudFileArg) {
  //   throw new Error(`no cloud application file was provided`);
  // }
  // return cloudFileArg.replace('--cloudFile=', '');
  return join(__dirname, "../../../../test/demo.wx");
};

void app
  .whenReady()
  .then(async () => {
    const cloudFile = getCloudFile();
    if (!cloudFile) {
      log.error("no cloud application file was provided");
    }

    log.info(`calling cloud server create function with file ${cloudFile}`);
    const server = await createCloudServer({
      filename: cloudFile,
    });

    ipcMain.handle("getLocalServerPort", () => server.port);

    log.info(`cloud server started on port ${server.port}`);
    app.on("will-quit", server.closeServer);
  })
  .then(createWindow);

app.on("window-all-closed", () => {
  win = undefined;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length > 0) {
    allWindows[0]?.focus();
  } else {
    void createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    void childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    void childWindow.loadURL(`${url}/#${arg}`);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});

ipcMain.handle("ha", () => "ho");
