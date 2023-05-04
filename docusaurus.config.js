module.exports = {
  title: 'Winglang',
  tagline: 'The Wing programming language',
  url: 'https://docs.winglang.io/',
  baseUrl: '/',
  organizationName: 'winglang/wing',
  projectName: 'wing',
  themeConfig: {
    // ...
  },
  configureWebpack: (config, isServer, utils) => {
    const { getCacheLoader } = utils;
    return {
      module: {
        rules: [
          {
            test: /\.(w|js|ts|tf)$/,
            use: 'file-loader',
          },
        ],
      },
      optimization: {
        ...config.optimization,
        minimize: false, // Disables JavaScript minification
      },
    };
  },
};
