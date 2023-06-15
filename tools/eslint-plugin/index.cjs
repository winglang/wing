const base = {
  env: { es2022: true },
  plugins: ["@typescript-eslint", "import", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:unicorn/recommended",
    "plugin:@cloudy-ts/recommended",
  ],

  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "unicorn/prevent-abbreviations": [
      "error",
      {
        ignore: [/props?/i, /dir/i, /dev/i, /env/i, /ref/i],
      },
    ],
    "unicorn/prefer-module": ["off"],
    "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
    "unicorn/filename-case": ["off"],
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
    "react/display-name": ["off"],
  },
};

module.exports = {
  configs: {
    "node-cjs": {
      ...base,
      env: { ...base.env, node: true },
      rules: {
        ...base.rules,
        "unicorn/prefer-top-level-await": ["off"],
      },
    },
    "node-esm": {
      ...base,
      env: { ...base.env, node: true },
    },
    browser: {
      ...base,
      env: { ...base.env, browser: true },
      extends: [
        ...base.extends,
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      rules: {
        ...base.rules,
        "react/prop-types": ["off"],
      },
    },
  },
};
