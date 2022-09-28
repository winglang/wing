# Wing Console

## 🐞 Debug

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/public/electron-vite-react-debug.gif?raw=true)

## 📂 Directory structure

Familiar React application structure, just with `electron` folder on the top :wink:  
_Files in this folder will be separated from your React application and built into `dist/electron`_

```tree
├── electron                  Electron-related code
│   ├── main                  Main-process source code
│   ├── preload               Preload-scripts source code
│   └── resources             Resources for the production build
│       ├── icon.icns             Icon for the application on macOS
│       ├── icon.ico              Icon for the application
│       ├── installerIcon.ico     Icon for the application installer
│       └── uninstallerIcon.ico   Icon for the application uninstaller
│
├── release                   Generated after production build, contains executables
│   └── {version}
│       ├── {os}-unpacked     Contains unpacked application executable
│       └── Setup.{ext}       Installer for the application
│
├── public                    Static assets
└── src                       Renderer source code, your React application
```

## 🚨 Be aware

This template integrates Node.js API to the renderer process by default. If you want to follow **Electron Security Concerns** you might want to disable this feature. You will have to expose needed API by yourself.

To get started, remove the option as shown below. This will [modify the Vite configuration and disable this feature](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

electron({
- renderer: {}
})
```

## ❔ FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#dependencies-vs-devdependencies)
- [Using C/C++ native addons in renderer](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#load-nodejs-cc-native-modules)
- [Node.js ESM packages](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#nodejs-esm-packages) (e.g. `execa` `node-fetch`)

## Vercel Deployment

Deploying a Vercel static page for Wing Console Storybook.
