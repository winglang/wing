import { TypeScriptProject } from "@monadahq/mona-projen";

const project = new TypeScriptProject({
  name: "wing-console",
  description: "The Wing Console",
  devDeps: [
    "@monadahq/mona-projen",
    "@babel/core",
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    "@storybook/builder-vite",
    "@storybook/react",
    "@storybook/testing-library",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "autoprefixer",
    "babel-loader",
    "electron",
    "electron-builder",
    "electron-devtools-installer",
    "postcss",
    "react",
    "react-dom",
    "sass",
    "tailwindcss",
    "typescript",
    "vite",
    "vite-plugin-electron",
  ],
});

project.addTask("dev").exec("vite");
project.compileTask.exec("vite build");
project.compileTask.exec("electron-builder --publish=never");
project.addTask("storybook").exec("start-storybook -p 6006");
project.addTask("build-storybook").exec("build-storybook");

project.package.addField("main", "dist/electron/main/index.js");
project.package.addField("env", {
  VITE_DEV_SERVER_HOST: "127.0.0.1",
  VITE_DEV_SERVER_PORT: 7777,
});

const tsconfigFiles = [
  project.tryFindObjectFile("tsconfig.json"),
  project.tryFindObjectFile("tsconfig.dev.json"),
];
for (const tsconfig of tsconfigFiles) {
  if (tsconfig) {
    tsconfig.addOverride("compilerOptions", {
      baseUrl: ".",
      rootDir: ".",
      target: "ESNext",
      useDefineForClassFields: true,
      lib: ["DOM", "DOM.Iterable", "ESNext"],
      paths: {
        "@/*": ["src/*"],
      },
      allowJs: false,
      skipLibCheck: true,
      esModuleInterop: false,
      allowSyntheticDefaultImports: true,
      strict: true,
      noUncheckedIndexedAccess: true,
      forceConsistentCasingInFileNames: true,
      module: "ESNext",
      moduleResolution: "Node",
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",

      noImplicitReturns: false,
      noUnusedLocals: false,
      noUnusedParameters: false,

      declaration: false,
    });
    tsconfig.addOverride("include", [
      "src/**/*",
      "electron/**/*",
      "test/**/*",
      ".storybook/**/*",
      ".projenrc.ts",
      "vite.config.ts",
    ]);
  }
}

project.tryFindObjectFile(".eslintrc.json")?.addOverride("overrides", [
  {
    files: [".projenrc.ts", "test/**/*", "src/**/*", ".storybook/**/*"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "import/no-extraneous-dependencies": "off",
    },
  },
]);

project.addGitIgnore("*.env");
project.addGitIgnore("/release");

project.synth();
