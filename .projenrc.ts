import { TypeScriptProject } from "@monadahq/mona-projen";
import { JobPermission } from "projen/lib/github/workflows-model";

const project = new TypeScriptProject({
  name: "wing-console",
  description: "The Wing Console",
  deps: [
    "chokidar",
    "electron-log",
    "@monadahq/wing-local-schema",
    "express",
    "@types/express",
    "cors",
    "@types/cors",
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
    "electron-notarize",
    "postcss",
    "react",
    "react-dom",
    "sass",
    "tailwindcss",
    "@tailwindcss/forms",
    "@headlessui/react",
    "typescript",
    "vite",
    "vite-plugin-electron",
    "@heroicons/react",
    "classnames",
    "react-query",
    "@trpc/react",
    "react-draggable",
    "pretty-bytes",
    "@trpc/client",
    "@trpc/server",
    "@trpc/react",
    "@tanstack/react-query",
    "zod",
    "get-port",
    // Peer deps:
    "webpack",
    "require-from-string",
  ],
});
project.addTask("dev").exec("vite");
project.compileTask.exec("vite build");
project.addTask("storybook").exec("start-storybook -p 6006");
project.addTask("build-storybook").exec("build-storybook");
project.tasks.tryFind("package")?.reset();

project
  .tryFindObjectFile(".github/workflows/release.yml")
  ?.addDeletionOverride("jobs.release_github");
project.release?.addJobs({
  release_electron_builder: {
    name: "Publish using electron-builder",
    needs: ["release"],
    runsOn: ["macos-latest"],
    permissions: {
      contents: JobPermission.WRITE,
    },
    if: "needs.release.outputs.latest_commit == github.sha",
    steps: [
      {
        uses: "actions/setup-node@v3",
        with: { "node-version": "16.x" },
      },
      {
        name: "Checkout",
        uses: "actions/checkout@v3",
        with: { "fetch-depth": 0 },
      },
      {
        name: "Download build artifacts",
        uses: "actions/download-artifact@v3",
        with: { name: "build-artifact", path: "dist" },
      },
      {
        name: "Login to private npm registry",
        run: "npm config set @monadahq:registry https://npm.pkg.github.com && npm set //npm.pkg.github.com/:_authToken $PROJEN_GITHUB_TOKEN",
        env: {
          PROJEN_GITHUB_TOKEN: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
        },
      },
      {
        name: "Install dependencies",
        run: "npm ci",
      },
      {
        name: "Add certificate to the keychain",
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
        name: "Build Electron Application",
        run: "npx tsx scripts/builderElectronApp.mts",
        env: {
          APPLE_ID: "${{ secrets.APPLE_ID }}",
          APPLE_ID_PASSWORD: "${{ secrets.APPLE_ID_PASSWORD }}",
          GH_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
        },
      },
      {
        name: "Release",
        run: 'errout=$(mktemp); gh release create $(cat dist/releasetag.txt) -R $GITHUB_REPOSITORY -F dist/changelog.md -t $(cat dist/releasetag.txt) --target $GITHUB_REF release/wing-console-* release/latest-mac.yml 2> $errout && true; exitcode=$?; if [ $exitcode -ne 0 ] && ! grep -q "Release.tag_name already exists" $errout; then cat $errout; exit $exitcode; fi',
        env: {
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
          GITHUB_REPOSITORY: "${{ github.repository }}",
          GITHUB_REF: "${{ github.ref }}",
        },
      },
    ],
  },
});

project.package.addField("main", "dist/vite/electron/main/index.js");
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
      "scripts/**/*",
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
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
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

  // Disable extraneous dependencies, since we bundle them.
  project.eslint.addRules({
    "import/no-extraneous-dependencies": "off",
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
