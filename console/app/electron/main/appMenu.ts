import { Updater } from "@wingconsole/server";
import {
  BrowserWindow,
  dialog,
  Menu,
  nativeImage,
  shell,
  MenuItem,
} from "electron";

import { ThemeMode } from "./config.js";

let defaultMenuItems: MenuItem[];

export const initApplicationMenu = () => {
  // The default menu from Electron come with very useful items.
  // File menu, which is the second entry on the list and Help menu (which is the last) are being modified
  defaultMenuItems = Menu.getApplicationMenu()?.items!;
  // remove default Help menu
  defaultMenuItems?.pop();
};

export const setApplicationMenu = (options: {
  publicPath: string;
  onFileOpen: (file: string) => void;
  onThemeModeChange: (themeMode: ThemeMode) => void;
  updater: Updater;
  themeMode: ThemeMode;
}) => {
  const menuTemplateArray = [
    {
      ...defaultMenuItems[0]!,
      submenu: defaultMenuItems[0]!.submenu!.items.map((item) => ({
        ...item,
        label: item.label.replace("@wingconsole/app", "Wing Console"),
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
              filters: [{ name: "Wing File", extensions: ["w"] }],
            });
            if (canceled) {
              return;
            }

            const [wingfile] = filePaths;
            if (wingfile) {
              options.onFileOpen(wingfile);
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
    {
      ...defaultMenuItems[2]!,
    },
    {
      ...defaultMenuItems[3]!,
      submenu: [
        ...defaultMenuItems[3]!.submenu!.items.filter(
          (item) => item.label !== "Toggle Developer Tools",
        ),
        { type: "separator" },
        {
          type: "submenu",
          label: "Theme",
          submenu: [
            {
              label: "Light Theme",
              type: "checkbox",
              checked: options.themeMode === "light",
              accelerator:
                process.platform === "darwin" ? "Alt+Cmd+L" : "Alt+Shift+L",
              click: async () => {
                options.onThemeModeChange("light");
              },
            },
            {
              label: "Dark Theme",
              type: "checkbox",
              checked: options.themeMode === "dark",
              accelerator:
                process.platform === "darwin" ? "Alt+Cmd+D" : "Alt+Shift+D",
              click: async () => {
                options.onThemeModeChange("dark");
              },
            },
            {
              label: "System Appearance",
              type: "checkbox",
              checked: options.themeMode === "auto",
              accelerator:
                process.platform === "darwin" ? "Alt+Cmd+A" : "Alt+Shift+A",
              click: async () => {
                options.onThemeModeChange("auto");
              },
            },
          ],
        },
      ],
    },
    ...defaultMenuItems.slice(4),
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await shell.openExternal("https://winglang.io");
          },
        },
        {
          label: "Documentation",
          click: async () => {
            await shell.openExternal("https://docs.winglang.io");
          },
        },
        {
          label: "Open an Issue",
          click: async () => {
            await shell.openExternal(
              "https://github.com/winglang/wing/issues/new/choose",
            );
          },
        },
        {
          label: "Check for Updates",
          enabled: ["initial", "update-not-available", "error"].includes(
            options.updater.status().status,
          ),
          click: async () => {
            await options.updater.checkForUpdates();
          },
        },
      ],
    },
  ];

  if (process.platform !== "darwin") {
    // remove the first menu item on windows and linux
    menuTemplateArray.shift();
  }

  const appMenu = Menu.buildFromTemplate(menuTemplateArray as any);
  Menu.setApplicationMenu(appMenu);
};
