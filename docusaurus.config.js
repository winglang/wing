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
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(w|js|ts|tf)$/,
          use: 'file-loader',
        },
      ],
    },
  },
};
