import { TypeScriptProject } from "@monadahq/mona-projen";

const project = new TypeScriptProject({
  name: "wing-console",
  description: "The Wing Console",
  deps: [
    "chokidar",
    "electron-log",
    "@monadahq/wing-local-schema",
    "@monadahq/wing-local-server",
    "@monadahq/wing-local-client",
    "@monadahq/wing-local-schema",
  ],
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
    "@tailwindcss/forms",
    "typescript",
    "vite",
    "vite-plugin-electron",
    "@heroicons/react",
    "classnames",
    "react-query",
    "@trpc/react",
    "react-draggable",
  ],
  // @ts-ignore
  workflowRunsOn: ["macos-latest"],
  // @ts-ignore
  workflowGitIdentity: {
    name: "monabot",
    email: "monabot@monada.co",
  },
  workflowBootstrapSteps: [
    ...TypeScriptProject.setupSteps(),
    {
      name: "Codesign executable",
      run:
        "echo $CSC_LINK | base64 --decode > $HOME/certificate.p12 \n" +
        "security create-keychain -p $CSC_KEY_PASSWORD build.keychain \n" +
        "security default-keychain -s build.keychain \n" +
        "security unlock-keychain -p $CSC_KEY_PASSWORD build.keychain \n" +
        "security import $HOME/certificate.p12 -k build.keychain -P $CSC_KEY_PASSWORD -T /usr/bin/codesign \n" +
        "security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k $CSC_KEY_PASSWORD build.keychain",
      env: {
        CSC_LINK: "${{ secrets.CSC_LINK }}",
        CSC_KEY_PASSWORD: "${{ secrets.CSC_KEY_PASSWORD }}",
      },
    },
    {
      name: "set GH_TOKEN",
      run: "echo 'GH_TOKEN=${{ secrets.PROJEN_GITHUB_TOKEN }}' >> $GITHUB_ENV",
      env: {
        GH_TOKEN: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
      },
    },
  ],
});
project.addTask("dev").exec("vite");
project.compileTask.exec("vite build");
// TODO: track https://github.com/electron-userland/electron-builder/issues/6411
project.compileTask.exec(
  "npm exec electron-builder --publish=never --config=electron-builder.json5",
);
project.addTask("storybook").exec("start-storybook -p 6006");
project.addTask("build-storybook").exec("build-storybook");
project.tasks.tryFind("package")?.reset();

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
      "tailwind.config.cjs",
      "postcss.config.cjs",
    ]);
  }
}

project.addGitIgnore("*.env");
project.addGitIgnore("/release");
project.addGitIgnore("/storybook-static");

if (project.eslint) {
  project.eslint.addOverride({
    files: ["test/**/*", "src/**/*", ".storybook/**/*"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "import/no-extraneous-dependencies": "off",
    },
  });
  project.addDevDeps("eslint-plugin-unicorn");
  project.eslint.addExtends("plugin:unicorn/recommended");
  project.eslint.addRules({
    "unicorn/prefer-module": "off",
    "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
    "unicorn/prefer-top-level-await": "off",
    "unicorn/consistent-function-scoping": "warn",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          pascalCase: true,
          camelCase: true,
        },
      },
    ],
    "unicorn/prevent-abbreviations": "off",
  });

  // Do not error on shadow
  project.eslint.addRules({
    "@typescript-eslint/no-shadow": "warn",
  });

  // Enforce import order.
  project.eslint.addRules({
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        warnOnUnassignedImports: true,
      },
    ],
  });

  // Tell eslint that imports that begin with "@/" are internal to this repository.
  project.eslint.config.settings = {
    ...project.eslint.config.settings,
    "import/internal-regex": "^@/",
  };
}

// Fix installation problems due to Projen adding some package overrides.
project.tryFindObjectFile("package.json")?.addOverride("overrides", {});

project.synth();
