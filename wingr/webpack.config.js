module.exports = (_env) => {
  const config = {
    mode: "production",
    entry: {
      setup: "./src/setup.js",
      entry: "./src/entry.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: __dirname + "/build",
    },
    devtool: false,
    externalsPresets: {
      node: true,
    },
  };

  return config;
};
