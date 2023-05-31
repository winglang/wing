import path from "node:path";

import { createConsoleServer } from "@wingconsole/server";
import { config } from "dotenv";
import { app, BrowserWindow, dialog, screen, nativeTheme } from "electron";
import log from "electron-log";
import fixPath from "fix-path";

import { initApplicationMenu, setApplicationMenu } from "./appMenu.js";
import { AppConfig, ThemeMode } from "./config.js";
import { HostUtils } from "./hostUtils.js";
import { WING_PROTOCOL_SCHEME } from "./protocol.js";
import { SegmentAnalytics } from "./segmentAnalytics.js";
import { ThemeStore } from "./themStore.js";
import { updater } from "./updater.js";

config();
fixPath();

// Usually, `process.argv[0]` points to the electron binary, but the @winglang/sdk package assumes that it's pointing to the node binary.
// Revisit this hack once the issue moves forward.
// @see https://github.com/winglang/wing/issues/2647
process.argv[0] = "node";

const appConfig = new AppConfig();
const themeStore = new ThemeStore();
// set initial theme mode
appConfig.set("themeMode", themeStore.getThemeMode());

log.info("Application entrypoint");

log.transports.console.bind(process.stdout);

if (
  process.env.SEGMENT_WRITE_KEY &&
  !process.env.CI &&
  !process.env.PLAYWRIGHT_TEST
) {
  const segment = new SegmentAnalytics(process.env.SEGMENT_WRITE_KEY);
  segment.analytics.track({
    anonymousId: segment.anonymousId,
    event: "Console Application started",
  });
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
    width: Math.round(screen.getPrimaryDisplay().workAreaSize.width * 0.9),
    height: Math.round(screen.getPrimaryDisplay().workAreaSize.height * 0.9),
    webPreferences: {
      devTools: import.meta.env.DEV,
    },
    titleBarStyle: process.platform === "darwin" ? "hidden" : "default",
  });

  if (import.meta.env.DEV) {
    log.info("creating window in DEV mode");
    log.info(
      "window.loadURL",
      `${import.meta.env.BASE_URL}?port=${options.port}`,
    );
    void window
      .loadURL(
        `${import.meta.env.BASE_URL}?port=${options.port}&title=${
          options.title ?? "Wing Console"
        }`,
      )
      .then(() => {
        if (
          !process.env.PLAYWRIGHT_TEST &&
          !process.env.CI &&
          process.env.OPEN_DEVTOOLS !== "0"
        ) {
          window.webContents.openDevTools();
        }
      });
  } else {
    log.info("creating window in PROD mode");
    log.info("window.loadFile", path.join(ROOT_PATH.dist, "index.html"));
    void window.loadFile(path.join(ROOT_PATH.dist, "index.html"), {
      query: {
        port: options.port.toString(),
        title: options.title ?? "Wing Console",
      },
    });
  }

  return window;
}

/**
 * Creates a window manager, which reuses windows if the file is already open.
 */
function createWindowManager() {
  log.info("createWindowManager");

  const windows = new Map<string, BrowserWindow>();

  const onFileInputClose = () => {
    if (windows.size === 0) {
      log.info(
        "file input dialog was closed, since there are no more application windows open, quit app",
      );
      app.quit();
    }
  };

  return {
    async open(wingfile: string) {
      wingfile = path.resolve(process.cwd(), wingfile);
      log.info("window manager open()", { wingfile });
      const window = windows.get(wingfile);
      if (window) {
        log.info("window already exists, focusing");
        if (window.isMinimized()) {
          window.restore();
        }
        window.focus();
        return window;
      }

      let newWindow: BrowserWindow | undefined;

      const server = await createConsoleServer({
        wingfile,
        log,
        updater,
        config: appConfig,
        hostUtils: new HostUtils(),
      });

      newWindow = await createWindow({
        title: path.basename(wingfile),
        port: server.port,
      });

      // When running Playwright tests, hide the window so it acts as a headless runner.
      // See https://github.com/microsoft/playwright/issues/13288#issuecomment-1324357472.
      // TODO: Use a CLI argument rather than an environment variable.
      if (process.env.PLAYWRIGHT_TEST && !process.env.CI) {
        newWindow.hide();
      }

      newWindow.setRepresentedFilename(wingfile);
      windows.set(wingfile, newWindow);

      newWindow.on("closed", async () => {
        log.info("window closed", wingfile);
        windows.delete(wingfile);
        await server.close();
      });

      return newWindow;
    },

    async showOpenFileDialog() {
      log.info("window manager showOpenFileDialog()");
      await app.whenReady();
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Wing File", extensions: ["w"] }],
      });
      if (canceled) {
        onFileInputClose();
        return;
      }

      const [wingfile] = filePaths;
      if (!wingfile) {
        return;
      }

      return this.open(wingfile);
    },
  };
}

const windowManager = createWindowManager();

async function main() {
  log.info("Application start: main()");

  // If the application started by opening it directly, we should allow the user to choose a file to open.
  // Otherwise, the application was open using a file and we should start the application without the file input dialog
  let shouldShowGetStarted = true;

  let deeplinkingUrl;

  // set deeplinking urls
  log.info("setting up deeplinks urls");
  if (process.platform === "win32") {
    log.info("setting protocl for win32");
    // set protocol link on windows
    app.setAsDefaultProtocolClient(WING_PROTOCOL_SCHEME, process.execPath, [
      path.resolve(process.argv[2] ?? ""),
    ]);
  } else {
    log.info("setting protocol for mac");
    // set protocol link on mac
    app.setAsDefaultProtocolClient(WING_PROTOCOL_SCHEME);
  }

  if (process.platform === "win32") {
    deeplinkingUrl = process.argv.find((argument) =>
      argument.startsWith(`${WING_PROTOCOL_SCHEME}://`),
    );
    log.info("runnig in win32. check for deeplink argument", deeplinkingUrl);
  }

  // Force single application instance
  const singleInstanceLock = app.requestSingleInstanceLock();
  log.info("singleInstanceLock", singleInstanceLock);
  if (singleInstanceLock) {
    log.info("this is the main instance, setting second instance listener");
    app.on("second-instance", async (_event, argv) => {
      log.info("second instance args", argv);
      if (process.platform !== "darwin") {
        log.info("second instance is not darwin");
        // Find the arg that is our custom protocol url and store it
        deeplinkingUrl = argv.find((argument) =>
          argument.startsWith(`${WING_PROTOCOL_SCHEME}://`),
        );
        log.info("deeplinkingUrl (second instance)", deeplinkingUrl);
        if (deeplinkingUrl) {
          shouldShowGetStarted = false;
          const filename = deeplinkingUrl.slice(
            `${WING_PROTOCOL_SCHEME}://`.length,
          );
          log.info("open file from deeplink (second instance):", filename);
          await windowManager.open(filename);
        }
      }
    });

    if (deeplinkingUrl) {
      shouldShowGetStarted = false;
      const filename = deeplinkingUrl.slice(
        `${WING_PROTOCOL_SCHEME}://`.length,
      );
      log.info("open file from deeplink:", process.platform, filename);
      await windowManager.open(filename);
    }
  } else {
    log.info("another instance is running, quiting this one");
    app.quit();
    return;
  }

  app.on("open-url", (event, url) => {
    shouldShowGetStarted = false;
    const filename = url.slice(`${WING_PROTOCOL_SCHEME}://`.length);
    log.info("open-url", { url, filename });
    void windowManager.open(filename);
  });

  app.on("activate", (event, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
      void windowManager.showOpenFileDialog();
    }
  });

  app.on("open-file", (event, filename) => {
    shouldShowGetStarted = false;

    log.info("open-file", { filename });
    void windowManager.open(filename);
  });

  app.on("window-all-closed", () => {
    log.info("window-all-closed event");
    if (process.platform !== "darwin" || import.meta.env.DEV) {
      log.info("calling app.quit()");
      app.quit();
    }
  });

  log.info("waiting for app to be ready...");
  await app.whenReady();
  log.info("app is ready");

  const getThemeMode = (): ThemeMode => {
    return appConfig.get<ThemeMode>("themeMode");
  };

  const setThemeMode = (themeMode: ThemeMode) => {
    themeStore.setThemeMode(themeMode);
    appConfig.set("themeMode", themeMode);
  };

  const getApplicationMenuOptions = () => ({
    themeMode: getThemeMode(),
    onFileOpen: (wingfile: string) => {
      void windowManager.open(wingfile);
    },
    updater,
    onThemeModeChange: (themeMode: ThemeMode) => {
      setThemeMode(themeMode);
    },
    publicPath: ROOT_PATH.public,
  });

  initApplicationMenu();
  setApplicationMenu(getApplicationMenuOptions());

  // update check for updates menu item enabled state
  updater.addEventListener("status-change", () => {
    setApplicationMenu(getApplicationMenuOptions());
  });

  appConfig.addEventListener("config-change", () => {
    setApplicationMenu(getApplicationMenuOptions());
  });

  nativeTheme.on("updated", () => {
    setApplicationMenu(getApplicationMenuOptions());
  });

  if (import.meta.env.DEV || process.env.PLAYWRIGHT_TEST || process.env.CI) {
    log.info("Running in dev mode, skipping file input window");
    if (!process.env.PLAYWRIGHT_TEST && !process.env.CI) {
      const installExtension = await import("electron-devtools-installer");
      await installExtension.default(installExtension.REACT_DEVELOPER_TOOLS.id);
    }
    const demoWingFile = process.env.PLAYWRIGHT_TEST ? "sanity.w" : "index.w";
    // Open the demo Wing file (includes compiling).
    await windowManager.open(`${__dirname}/../../../../demo/${demoWingFile}`);
  } else {
    if (shouldShowGetStarted && BrowserWindow.getAllWindows().length === 0) {
      await windowManager.showOpenFileDialog();
    }
  }
}

void main();
