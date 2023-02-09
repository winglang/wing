import { TypeScriptProject } from "@winglang/projen";
import { JobPermission } from "projen/lib/github/workflows-model.js";

const project = new TypeScriptProject({
  name: "wing-console",
  description: "The Wing Console",
  deps: ["chokidar"],
  devDeps: [
    "express",
    "@types/express",
    "cors",
    "@types/cors",
    "get-port",
    "electron-log",
    "@winglang/sdk",
    "@winglang/polycons",
    "constructs",
    "@winglang/projen",
    "@babel/core",
    "@types/react",
    "@types/react-dom",
    "@types/analytics-node",
    "@vitejs/plugin-react",
    "autoprefixer",
    "electron",
    "electron-builder",
    "electron-updater",
    "electron-devtools-installer",
    "@electron/notarize",
    "postcss",
    "react",
    "react-dom",
    "sass",
    "tailwindcss",
    "@tailwindcss/forms",
    "@headlessui/react",
    "typescript",
    "vite",
    "vite-node",
    "@heroicons/react",
    "classnames",
    "react-query",
    "react-draggable",
    "pretty-bytes",
    "@trpc/client@^10",
    "@trpc/server@^10",
    "@trpc/react-query",
    "electron-trpc",
    "@tanstack/react-query",
    "zod",
    "@aws-sdk/client-s3",
    "tsx",
    "fix-path",
    "react-lottie-player",
    "lodash.throttle",
    "@types/lodash.throttle",
    "react-popper",
    "@popperjs/core",
    "vite-plugin-webfont-dl",
    "esbuild",
    "ws",
    "@types/ws",
    "nanoid",
    "dotenv",
    "electron-store",
    "analytics-node",
    "xstate",
    "@playwright/test",
    "playwright",
    "playwright-core",
    "xvfb-maybe",
  ],
  // @ts-ignore
  minNodeVersion: "18.0.0",
  workflowNodeVersion: "18.x",
});

project.addTask("dev").exec("tsx scripts/dev.mts");

project
  .tryFindObjectFile(".github/workflows/release.yml")
  ?.addOverride(
    "jobs.release.env.SEGMENT_WRITE_KEY",
    "${{ secrets.SEGMENT_WRITE_KEY }}",
  );

project
  .tryFindObjectFile(".github/workflows/build.yml")
  ?.project.tryFindObjectFile(".github/workflows/build.yml")
  ?.addOverride(
    "jobs.build.env.SEGMENT_WRITE_KEY",
    "${{ secrets.SEGMENT_WRITE_KEY }}",
  );

project.buildWorkflow?.addPostBuildSteps({
  name: "upload playwright report",
  if: "${{ always() }}",
  uses: "actions/upload-artifact@v2",
  with: {
    name: "playwright-report",
    path: "playwright-report/",
  },
});

project.compileTask.exec("tsx scripts/build.mts");

project.tasks.tryFind("package")?.reset();

project.tasks.tryFind("test")?.exec("rm ~/.npmrc");
project.tasks.tryFind("test")?.exec("npm cache clean --force");
project.tasks
  .tryFind("test")
  ?.exec("npm config set registry http://registry.npmjs.org");
project.tasks.tryFind("test")?.exec("npm i -g winglang");

project.tasks
  .tryFind("test")
  ?.exec(
    'export PLAYWRIGHT_TEST=true && xvfb-maybe --auto-servernum --server-args="-screen 0 3440x1440x24" -- npx playwright test',
  );

project.package.addField("main", "dist/vite/electron/main/index.js");

project
  .tryFindObjectFile(".github/workflows/release.yml")
  ?.addDeletionOverride("jobs.release_github");

project.release?.addJobs({
  release_electron_builder: {
    name: "Publish using electron-builder",
    needs: ["release"],
    runsOn: ["ghcr.io/cirruslabs/macos-ventura-xcode:latest"],
    permissions: {
      contents: JobPermission.WRITE,
    },
    if: "needs.release.outputs.latest_commit == github.sha",
    env: {
      CI: "true",
    },
    steps: [
      {
        uses: "actions/setup-node@v3",
        with: { "node-version": "18.x" },
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
        run: [
          "npm config set @winglang:registry https://npm.pkg.github.com && npm set //npm.pkg.github.com/:_authToken $PROJEN_GITHUB_TOKEN",
        ].join("\n"),
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
        run: "npm exec vite-node scripts/bundle.mts",
        env: {
          APPLE_ID: "${{ secrets.APPLE_ID }}",
          APPLE_ID_PASSWORD: "${{ secrets.APPLE_ID_PASSWORD }}",
          GH_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
          AWS_ACCESS_KEY_ID: "${{ secrets.AWS_ACCESS_KEY_ID }}",
          AWS_SECRET_ACCESS_KEY: "${{ secrets.AWS_SECRET_ACCESS_KEY }}",
        },
      },
      {
        name: "install gh on M1 image",
        run: "brew install gh",
      },
      {
        name: "Release to GitHub",
        run: 'errout=$(mktemp); gh release create $(cat dist/releasetag.txt) -R $GITHUB_REPOSITORY -F dist/changelog.md -t $(cat dist/releasetag.txt) --target $GITHUB_REF release/Wing\\ Console-* release/latest-mac.yml 2> $errout && true; exitcode=$?; if [ $exitcode -ne 0 ] && ! grep -q "Release.tag_name already exists" $errout; then cat $errout; exit $exitcode; fi',
        env: {
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
          GITHUB_REPOSITORY: "${{ github.repository }}",
          GITHUB_REF: "${{ github.ref }}",
        },
      },
      {
        name: "Release to S3",
        run: "npm exec tsx scripts/releaseToS3.mts",
        env: {
          AWS_ACCESS_KEY_ID: "${{ secrets.RELEASE_AWS_ACCESS_KEY_ID }}",
          AWS_SECRET_ACCESS_KEY: "${{ secrets.RELEASE_AWS_SECRET_ACCESS_KEY }}",
        },
      },
    ],
  },
});

const tsconfigFiles = [
  project.tryFindObjectFile("tsconfig.json"),
  project.tryFindObjectFile("tsconfig.dev.json"),
];
for (const tsconfig of tsconfigFiles) {
  if (tsconfig) {
    tsconfig.addOverride("compilerOptions", {
      rootDir: undefined,
      outDir: undefined,
      target: "ESNext",
      useDefineForClassFields: true,
      lib: ["DOM", "DOM.Iterable", "ESNext"],
      allowJs: false,
      skipLibCheck: true,
      esModuleInterop: false,
      allowSyntheticDefaultImports: true,
      strict: true,
      noUncheckedIndexedAccess: true,
      forceConsistentCasingInFileNames: true,
      module: "ESNext",
      moduleResolution: "Node",
      // moduleResolution: "NodeNext",
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",

      noImplicitReturns: false,
      noUnusedLocals: false,
      noUnusedParameters: false,

      declaration: false,
    });

    const include = ["./src/**/*", "./electron/**/*"];
    if (tsconfig.path.endsWith("tsconfig.dev.json")) {
      include.push(
        "./scripts/**/*",
        "./test/**/*",
        "./e2e/**/*",
        "./vite.config.ts",
        "./vitest.config.ts",
        "./.projenrc.ts",
        "./tailwind.config.cjs",
        "./postcss.config.cjs",
        "./playwright.config.ts",
      );
    }
    tsconfig.addOverride("include", include);
  }
}

project.addGitIgnore("*.env");
project.addGitIgnore("/release");
project.addGitIgnore("/test-results");
project.addGitIgnore("/playwright-report");

if (project.eslint) {
  project.tasks
    .tryFind("eslint")
    ?.reset(
      "eslint --ext .ts,.mts,.cts,.tsx --fix --no-error-on-unmatched-pattern . .storybook",
    );
  project.eslint.addIgnorePattern("dist/");
  project.eslint.addIgnorePattern("release/");

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

  // Do not error on shadow.
  project.eslint.addRules({
    "@typescript-eslint/no-shadow": "off",
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

  project.addDevDeps("@cloudy-ts/eslint-plugin");
  project.eslint.addExtends("plugin:@cloudy-ts/recommended");
}

// Fix installation problems due to Projen adding some package overrides.
project.tryFindObjectFile("package.json")?.addOverride("overrides", {});

project.synth();
