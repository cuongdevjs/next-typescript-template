/* eslint-disable import/no-extraneous-dependencies */
// const path = require('path');
// const fs = require('fs');
// const withOffline = require('next-offline');
// const lessToJS = require('less-vars-to-js');
// const withImage = require('next-images');
// const withReactSvg = require('next-react-svg');
const withPlugins = require('next-compose-plugins');
// const TerserPlugin = require('terser-webpack-plugin');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: false,
// });
// const withSourceMaps = require('@zeit/next-source-maps');
// const withLess = require('@zeit/next-less');
// const withCSS = require('@zeit/next-css');
// const withSASS = require('@zeit/next-sass');
// const withFont = require('next-fonts');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const withAntdLess = require('next-plugin-antd-less');
// const webpack = require('webpack');

const i18n = require('./next-i18next.config.json');

// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './assets/custom_antd.less'), 'utf8'),
// );

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: '',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

const nextConfig = {
  i18n,
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_PREFIX_NEXT_STATIC : '',
  useFileSystemPublicRoutes: true,
  webpack5: true,
  trailingSlash: false,
  swcMinify: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  compiler: {
    removeConsole: true,
  },

  // exportPathMap: async () => {
  //   return {
  //     '/index.html': {
  //       page: '/export-frontend',
  //     },
  //   };
  // },
  // images: {
  //   domains: ['assets.panoee.com', 'dev-assets.panoee.com'],
  // },
  env: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      // const antStyles = /antd\/.*?\/style.*?/;
      // const origExternals = [...config.externals];
      // config.externals = [
      //   (context, request, callback) => {
      //     if (request.match(antStyles)) return callback();
      //     if (typeof origExternals[0] === 'function') {
      //       origExternals[0](context, request, callback);
      //     } else {
      //       callback();
      //     }
      //   },
      //   ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      // ];
      // config.module.rules.push({
      //   test: /\.md$/,
      //   use: 'frontmatter-markdown-loader',
      // });
      // config.plugins.push(
      //   new webpack.EnvironmentPlugin({
      //     ...process.env,
      //     THEME: { ...themeVariables },
      //   }),
      // );
      // config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
      // config.module.rules.unshift({
      //   test: antStyles,
      //   use: 'null-loader',
      // });
      // config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    // config.plugins.push(
    //   new TerserPlugin({
    //     parallel: true,
    //     // extractComments: (node, comment) => {
    //     //   console.log('comment', String(comment).search(/@(?:license)/i));
    //     //   return String(comment).search(/@(?:license)/i) !== -1;
    //     // },
    //     extractComments: process.env.NODE_ENV === 'development',
    //     terserOptions: {
    //       format: {
    //         comments: process.env.NODE_ENV === 'development',
    //       },
    //     },
    //   }),
    // );
    // config.module.rules.push({
    //   test: /.css$/,
    //   use: ['style-loader', 'css-loader'],
    // });
    // config.module.rules.push({
    //   test: /.svg$/,
    //   use: ['file-loader'],
    // });
    // if (
    //   config.optimization.splitChunks &&
    //   config.optimization.splitChunks.cacheGroups.shared
    // ) {
    //   config.optimization.splitChunks.cacheGroups.shared.enforce = true;
    // }
    return config;
  },
};

module.exports = withPlugins(
  [
    // [withOffline],
    // [withBundleAnalyzer],
    // [withSourceMaps],
    // [
    //   withAntdLess,
    //   {
    //     lessVarsFilePath: path.resolve(__dirname, './assets/custom_antd.less'),
    //     lessVarsFilePathAppendToEndOfContent: true,
    //     // optional https://github.com/webpack-contrib/css-loader#object
    //     cssLoaderOptions: {
    //       modules: {
    //         localIdentName:
    //           process.env.MODE !== 'production'
    //             ? '[folder]__[local]__[hash:4]'
    //             : '[hash:8]',
    //       },
    //     },
    //   },
    // ],
    // [
    //   withLess,
    //   {
    //     lessLoaderOptions: {
    //       javascriptEnabled: true,
    //       modifyVars: themeVariables, // make your antd custom effective
    //     },
    //   },
    // ],
    // [withImage],
    // [
    //   withFont,
    //   {
    //     inlineFontLimit: 16384,
    //     enableSvg: true,
    //   },
    // ],
    // [withSASS],
    // [
    //   withCSS,
    //   {
    //     cssModules: true,
    //     webpack: config => {
    //       config.module.rules.push({
    //         test: /.css$/,
    //         use: ['style-loader', 'css-loader'],
    //       });
    //       config.module.rules.push({
    //         test: /.svg$/,
    //         use: ['file-loader'],
    //       });
    //       return config;
    //     },
    //   },
    // ],
    // [
    //   withReactSvg,
    //   {
    //     include: path.resolve(__dirname, 'src/assets/svg'),
    //   },
    // ],
  ],
  nextConfig,
);
